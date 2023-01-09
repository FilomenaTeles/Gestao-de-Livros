using System;
using GestaoLivrosApi.Helpers;
using System.Reflection.Metadata;
using GestaoLivrosApi.Models;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Data;
using X.PagedList;
using System.Linq;
using System.Text;

namespace GestaoLivrosApi.DAL.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<Book>> GetAllAsync(string? searchBy, string? orderBy, int currentPage , int pageSize)
        {
            PaginatedList<Book> response = new PaginatedList<Book>();

            var query = _context.Books.Include(a => a.Author).AsQueryable();
            
            if(searchBy!= null)
            {
                searchBy = searchBy.ToLower().Trim();
                var search = query.Where(b => b.Name.Contains(searchBy) /*|| b.Author.Name.Contains(searchBy*/
                                        || b.Isbn.ToString().Contains(searchBy) || b.Price.ToString().Contains(searchBy));
                if( search == null)
                {
                    response.Success = false;
                    response.Message = "Pesquisa sem resultados";
                    return response;
                }
                query = search;
            } 

            response.TotalRecords = query.Count();

            var numberOfItemsToSkip = pageSize * (currentPage - 1);

            if (orderBy != null)
            {
                switch (orderBy)
                {

                    case "name-desc":
                        {
                            query = query.OrderByDescending(b => b.Name);
                            break;
                        }
                    case "price-asc":
                        {
                            query = query.OrderBy(b => b.Price);
                            break;
                        }
                    case "price-desc":
                        {
                            query = query.OrderByDescending(b => b.Price);
                            break;
                        }
                    default:
                        {
                            query = query.OrderBy(b => b.Name);
                            break;
                        }
                }
            }
            else
            {
                query = query.OrderBy(b => b.Name);
                
            }

            query = query.Skip(numberOfItemsToSkip);
            query = query.Take(pageSize);

            var list = await query.ToListAsync();

            response.Items = list;
            response.CurrentPage = currentPage;
            response.PageSize = pageSize;
            response.Success = true;
            response.Message = null;


            return response;
        }

        public async Task<bool> ExistIsbn(long isbn)
        {
            return await _context.Books.AnyAsync(b => b.Isbn == isbn);
        }

        public async Task<Book> Create(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return book;
        }

        public async Task<Book?> GetById(int id)
        {
            return await _context.Books
                .Where(b => b.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Book> Update(Book book)
        {
            _context.Entry<Book>(book).CurrentValues.SetValues(book);
            await _context.SaveChangesAsync();
            return book;
        }
    }

}