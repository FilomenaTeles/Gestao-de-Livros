using System;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Interfaces.Services;

namespace GestaoLivrosApi.BLL.Services
{
	public class AuthorsService : IAuthorService
	{
        private readonly AppDbContext _context;
        public AuthorsService(AppDbContext context)
		{
            _context = context;
        }
	}
}

