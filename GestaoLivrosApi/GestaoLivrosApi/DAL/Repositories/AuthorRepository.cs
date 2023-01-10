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

        public async Task<PaginatedList<Author>> GetAllAsync(string? SearchBy, string? orderBy, int currentPage = 1, int pageSize = 6)
        {
            PaginatedList<Author> response = new PaginatedList<Author>();
            var query = _context.Authors.AsQueryable();

            response.TotalRecords = query.Count();

            var numberOfItemsToSkip = pageSize * (currentPage - 1);


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

