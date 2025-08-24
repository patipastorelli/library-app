namespace Library.Api.Models;

public class Book
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Author { get; set; }
    public string isbn { get; set; }
    public DateTime PublishedDate { get; set; }
    public string Owner { get; set; } = string.Empty;
    public bool Availability { get; set; } = true;
}