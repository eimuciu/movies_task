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
    public async Task<ActionResult<IEnumerable<Movies>>> GetMovies(string searchterm, int page, string genre, string actors, string year)
    {
        IQueryable<Movies> moviesFromDb;
        moviesFromDb = _context.Movies;

        if (!String.IsNullOrEmpty(searchterm))
        {
            moviesFromDb = moviesFromDb.Where(s => s.Title.ToLower().Contains(searchterm.ToLower()));

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
                    moviesFromDb = _context.Movies.Where(s => s.Title.ToLower().Contains(searchterm.ToLower()));
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return Ok("Movie not found");
                }
            }

        }
        if (!String.IsNullOrEmpty(genre))
        {
            moviesFromDb = moviesFromDb.Where(s => s.Genre.ToLower().Contains(genre.ToLower()));
        }
        if (!String.IsNullOrEmpty(actors))
        {
            moviesFromDb = moviesFromDb.Where(s => s.Actors.ToLower().Contains(actors.ToLower()));
        }
        if (!String.IsNullOrEmpty(year))
        {
            moviesFromDb = moviesFromDb.Where(s => s.Year.ToLower().Contains(year.ToLower()));
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