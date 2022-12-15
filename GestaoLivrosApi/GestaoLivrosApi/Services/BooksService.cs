using System;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Data;
using X.PagedList;

namespace GestaoLivrosApi.Services
{
    public class BooksService : IBookService
    {
        private readonly AppDbContext _context;

        public BooksService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            try
            {

                return await _context.Books.OrderBy(b => b.Name).ToListAsync();
            }
            catch
            {
                throw;
            }
        }

        public async Task<IEnumerable<Book>> GetBooksByIsbn(string isbn)
        {
            // cira enumeravel de livros
            IEnumerable<Book> books;

            if (!string.IsNullOrEmpty(isbn))
            {
                books = await _context.Books.Where(b => (b.Isbn.ToString()).Contains(isbn)).ToListAsync();
            }
            else
            {
                books = await GetBooks();
            }
            return books;
        }

        public async Task InsertBook(Book book)
        {

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

        }

        public async Task UpdateBook(Book book)
        {
            _context.Entry(book).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
    
    }
}

