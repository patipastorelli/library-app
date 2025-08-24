using Library.Api.Data;
using Library.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Library.Api.Controllers;


[ApiController]
[Route("api/[controller]")]
public class BookController(IBookRepository repo) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetBooks([FromQuery] string? search, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        page = Math.Max(page, 1); pageSize = Math.Clamp(pageSize, 1, 100);
        var (items, total) = await repo.QueryAsync(search, page, pageSize);
        return Ok(new { items, total, page, pageSize });
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Book req)
    {
        if (string.IsNullOrWhiteSpace(req.Title) || string.IsNullOrWhiteSpace(req.Author))
            return BadRequest("Title and Author are required");
        var created = await repo.AddAsync(new Book { Title = req.Title.Trim(), Author = req.Author.Trim(), isbn = req.isbn.Trim(), PublishedDate = req.PublishedDate });
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }


    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    => (await repo.GetAsync(id)) is { } b ? Ok(b) : NotFound();


    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    => await repo.DeleteAsync(id) ? NoContent() : NotFound();


    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] Book req)
    {
        var b = await repo.GetAsync(id);
        if (b is null) return NotFound();
        if (req.Availability)
            b.Owner = string.Empty;
        else
            b.Owner = "User 1"; // Just a test TODO: need to be discussed how to handle ownership
        b.Availability = req.Availability;
        await repo.UpdateAsync(b);
        return Ok(b);
    }
}
