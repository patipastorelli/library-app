using Library.Api.Models;

namespace Library.Api.Data;

public interface IBookRepository
{
    Task<(IEnumerable<Book> Items, int Total)> QueryAsync(string? search, int page, int pageSize);
    Task<Book> AddAsync(Book book);
    Task<Book?> GetAsync(int id);
    Task<bool> DeleteAsync(int id);
    Task<bool> UpdateAsync(Book book);
}