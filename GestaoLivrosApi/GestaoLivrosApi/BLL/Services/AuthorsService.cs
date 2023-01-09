using System;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using static GestaoLivrosApi.Models.Authors.CreateAuthorDTO;
using Azure;


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

        public async Task<MessagingHelper> Create(CreateAuthorDTO createAuthor)
        {
            MessagingHelper response = new MessagingHelper();

            try
            {
                CreateAuthorDTOValidator validator = new();
                var responseValidate = await validator.ValidateAsync(createAuthor);

                if (responseValidate == null || responseValidate.IsValid == false)
                {
                    if (responseValidate == null)
                    {
                        response.Message = "Erro ao validar a informação do autor.";
                        return response;
                    }

                    response.Message = responseValidate.Errors.FirstOrDefault()!.ErrorMessage;
                    return response;
                }

                var newAuthor = createAuthor.ToEntity();
                var author = await _authorRepository.Create(newAuthor);

                if(author == null)
                {
                    response.Success = false;
                    response.Message = "Erro ao criar autor";
                    return response;
                }
                response.Success = true;
                response.Message = "Autor criado com sucesso";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Erro interno ao criar um autor.";
            }
            return response;
        }

    }
}

