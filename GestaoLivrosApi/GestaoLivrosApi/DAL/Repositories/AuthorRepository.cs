using System;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Interfaces.Repositories;

namespace GestaoLivrosApi.DAL.Repositories
{
	public class AuthorRepository : IAuthorRepository
	{
        private readonly AppDbContext _context;
        public AuthorRepository(AppDbContext context)
		{
            _context = context;
        }
	}
}

