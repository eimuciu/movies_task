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

                // Saves data to local database
                await _context.Movies.AddRangeAsync(content.Search);
                await _context.SaveChangesAsync();
                var updatedMovies = _context.Movies.Where(s => s.Title.ToLower().Contains(searchterm.ToLower()));

                return Ok(updatedMovies);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Something went wrong");
            }
        }
        return Ok(moviesFromDb);
    }
}
