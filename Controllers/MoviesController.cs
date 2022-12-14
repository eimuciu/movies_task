using Microsoft.AspNetCore.Mvc;
using movies_task.Data;
using movies_task.DTOs;
using movies_task.Entities;

namespace movies_task.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly DataContext _context;
    private readonly HttpClient _httpClient;

    public MoviesController(HttpClient httpClient, DataContext context)
    {
        _context = context;
        _httpClient = httpClient;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Movies>>> GetMovies(string searchterm, int page)
    {
        IQueryable<Movies> moviesFromDb = _context.Movies.Where(s => s.Title.ToLower().Contains(searchterm.ToLower()));
        int pageCount = page * 10;

        if (pageCount > moviesFromDb.Count())
        {
            try
            {   //Fetches external movies API
                var result = await _httpClient.GetAsync($"http://www.omdbapi.com/?s={searchterm}&page={page}&apikey=e310bcb8");
                result.EnsureSuccessStatusCode();
                var content = await result.Content.ReadFromJsonAsync<MoviesResponseDto>();
                if (content.Response == "False" && content.Search == null && content.TotalResults == null)
                {
                    return Ok(content);
                }

                // Saves data to local database
                await _context.Movies.AddRangeAsync(content.Search);
                await _context.SaveChangesAsync();
                var updatedMovies = _context.Movies.Where(s => s.Title.ToLower().Contains(searchterm.ToLower()));

                return Ok(updatedMovies);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Ok("Movie not found");
            }
        }
        return Ok(moviesFromDb);
    }

    [HttpPut]
    public async Task<ActionResult<IEnumerable<Movies>>> UpdateMovie(Movies movieObj)
    {

        Movies movie = _context.Movies.Where(s => s.Id == movieObj.Id).FirstOrDefault();
        if (movie == null) return BadRequest("Something went wrong");
        movie.Title = movieObj.Title;
        movie.Year = movieObj.Year;
        movie.Genre = movieObj.Genre;
        movie.Actors = movieObj.Actors;
        await _context.SaveChangesAsync();

        return Ok(movie);

    }
}