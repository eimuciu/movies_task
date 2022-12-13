using movies_task.Entities;

namespace movies_task.DTOs
{
    public class MoviesResponseDto
    {
        public List<Movies> Search { get; set; }
        public string TotalResults {get;set;}
        public string Response {get;set;}
    }
}