using System;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using GestaoLivrosApi.Models.Books;

namespace GestaoLivrosApi.BLL.Services
{
	public class AuthorsService : IAuthorService
	{
        private readonly AppDbContext _context;
        private readonly IAuthorRepository _authorRepository;
        public AuthorsService(AppDbContext context, IAuthorRepository authorRepository)
		{
            _context = context;
            _authorRepository = authorRepository;
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
               
                var responseRepository = await _authorRepository.GetAllAsync(search.SearchParameter, search.SortingParameter, search.CurrentPage, search.PageSize);
                if (responseRepository.Success != true)
                {
                    result.Success = false;
                    result.Message = "Erro ao obter a informação dos autores";
                    return result;
                }

                result.Items = responseRepository.Items.Select(a => new ListAuthor(a)).ToList();
                result.PageSize = responseRepository.PageSize;
                result.CurrentPage = responseRepository.CurrentPage;
                result.TotalRecords = responseRepository.TotalRecords;
                result.Success = true;

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro inesperado ao obter os livros.:\n" + ex;
            }
            return result;
        }

    }
}

