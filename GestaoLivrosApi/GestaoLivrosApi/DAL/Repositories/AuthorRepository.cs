using System;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using Microsoft.EntityFrameworkCore;

namespace GestaoLivrosApi.DAL.Repositories
{
	public class AuthorRepository : IAuthorRepository
	{
        private readonly AppDbContext _context;
        public AuthorRepository(AppDbContext context)
		{
            _context = context;
        }

        public async Task<PaginatedList<Author>> GetAllAsync(string? searchBy, string? orderBy, int currentPage = 1, int pageSize = 6)
        {
            PaginatedList<Author> response = new PaginatedList<Author>();
            var query = _context.Authors.Include(b => b.Books).AsQueryable();

            if (searchBy != null)
            {
                searchBy = searchBy.ToLower().Trim();
                var search = query.Where(a => a.Name.Contains(searchBy) || a.Country.Contains(searchBy));
                if (search == null)
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
                            query = query.OrderByDescending(a => a.Name);
                            break;
                        }
                    case "country-asc":
                        {
                            query = query.OrderBy(a => a.Country);
                            break;
                        }
                    case "country-desc":
                        {
                            query = query.OrderByDescending(a => a.Country);
                            break;
                        }
                    default:
                        {
                            query = query.OrderBy(a => a.Name);
                            break;
                        }
                }
            }
            else
            {
                query = query.OrderBy(a => a.Name);

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

        public async Task<Author> Create(Author author)
        {
            _context.Authors.Add(author);
            await _context.SaveChangesAsync();
            return author;
        }

        public async Task<Author?> GetById(int id)
        {
            return await _context.Authors
                .Where(a => a.Id == id)
                .FirstOrDefaultAsync();
        }

        public async Task<Author> Edit(Author author)
        {
            _context.Entry<Author>(author).CurrentValues.SetValues(author);
            await _context.SaveChangesAsync();
            return author;
        }

    }
}

