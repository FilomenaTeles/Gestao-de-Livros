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

       

        public PagedList<Book> GetBooks(BookParameters bookParameters)
        {
            try
            {

                return PagedList<Book>.ToPagedList(FindAll().OrderBy(b=>b.Name),bookParameters.PageNumber, bookParameters.PageSize);
            }
            catch
            {
                throw;
            }
        }

        public IQueryable<Book> FindAll()
        {
            return this._context.Set<Book>();
        }

        public async Task<IEnumerable<Book>> GetBooksByIsbn(string isbn)
        {
            // cira enumeravel de livros
            IEnumerable<Book> books;

            if (!string.IsNullOrEmpty(isbn))
            {
                books = await _context.Books.Where(b => (b.Isbn.ToString()).Equals(isbn)).ToListAsync();
            }
            else
            {
                //books = await GetBooks();
                books = await _context.Books.Where(b => (b.Isbn.ToString()).Equals(isbn)).ToListAsync();
            }
            return books;
        }

        public async Task<Book> GetBookById(int id)
        {
            var books = await _context.Books.FindAsync(id);
            
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

        public async Task DeleteBook(Book book)
        {
            _context.Entry(book).CurrentValues["isDeleted"] = true;
            await _context.SaveChangesAsync();
        }

    }

  
}

