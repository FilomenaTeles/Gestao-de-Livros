using System;
using GestaoLivrosApi.Helpers;
using System.Reflection.Metadata;
using GestaoLivrosApi.Models;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Data;
using X.PagedList;
using System.Linq;

namespace GestaoLivrosApi.DAL.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly AppDbContext _context;

        public BookRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<Book>> GetAllAsync(List<Parameter>? SearchBy, string? orderBy, int currentPage = 1, int pageSize = 5)
        {
            PaginatedList<Book> response = new PaginatedList<Book>();

            var query = _context.Books.AsQueryable();
            //result.Items = resultSendRequest;
            //var sendRequest = await Request.SendRequest

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
    }

}