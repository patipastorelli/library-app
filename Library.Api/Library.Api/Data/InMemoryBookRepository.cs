using Library.Api.Models;

namespace Library.Api.Data
{
    public class InMemoryBookRepository : IBookRepository
    {
        private readonly List<Book> _books = new();
        private int _nextId = 1;

        public InMemoryBookRepository()
        {
            // Seed with some sample data
            _books.AddRange(
            [
                new Book { Id = _nextId++, Title = "Clean Code", Author ="Author 1", isbn="abc", PublishedDate=new DateTime(2025,08,23), Owner = "Alice", Availability = true },
                new Book { Id = _nextId++, Title = "Domain-Driven Design", Author="Author 2",isbn="def",PublishedDate=new DateTime(2025,08,23), Owner = "Bob", Availability = false },
                new Book { Id = _nextId++, Title = "The Pragmatic Programmer", Author = "Author 3", isbn="ghj",PublishedDate=new DateTime(2025,08,23), Owner = "Charlie", Availability = true }
            ]);
        }

        public Task<(IEnumerable<Book> Items, int Total)> QueryAsync(string? search, int page, int pageSize)
        {
            var query = _books.AsQueryable();

            //if (!string.IsNullOrWhiteSpace(search))
            //{
            //    query = query.Where(b => b.Title.Contains(search, StringComparison.OrdinalIgnoreCase));
            //}

            var total = query.Count();
            var items = query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Task.FromResult((items.AsEnumerable(), total));
        }

        public Task<Book> AddAsync(Book book)
        {
            book.Id = _nextId++; // simulate auto-increment ID
            _books.Add(book);
            return Task.FromResult(book);
        }

        public Task<Book?> GetAsync(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            return Task.FromResult(book);
        }

        public Task<bool> DeleteAsync(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return Task.FromResult(false);
            _books.Remove(book);
            return Task.FromResult(true);
        }

        public Task<bool> UpdateAsync(Book book)
        {
            var existing = _books.FirstOrDefault(b => b.Id == book.Id);
            if (existing == null) return Task.FromResult(false);

            existing.Title = book.Title;
            existing.Owner = book.Owner;
            existing.Availability = book.Availability;

            return Task.FromResult(true);
        }
    }
}
