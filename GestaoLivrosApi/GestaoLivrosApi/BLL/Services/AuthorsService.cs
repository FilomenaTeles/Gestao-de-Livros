using System;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;

namespace GestaoLivrosApi.BLL.Services
{
	public class AuthorsService : IAuthorService
	{
        private readonly AppDbContext _context;
        public AuthorsService(AppDbContext context)
		{
            _context = context;
        }

        public async Task<PaginatedList<ListAuthor>> GetAll(SearchDTO search)
        {
            PaginatedList<ListAuthor> result = new PaginatedList<ListAuthor>();

            try
            {
                //lógica

                if (search.PageSize > 100)
                {
                    search.PageSize = 100;
                }

                if (search.PageSize <= 0)
                {
                    search.PageSize = 1;
                }

                if (search.CurrentPage <= 0)
                {
                    search.CurrentPage = 1;
                }

                //obter a informação - pedido a bd (repositorie)
                //var responseRepository = await _bookRepository.GetAllAsync(search.SearchParameter, search.SortingParameter, search.CurrentPage, search.PageSize);
            }
            catch (Exception ex)
            {

            }
            return result;
        }

    }
}

