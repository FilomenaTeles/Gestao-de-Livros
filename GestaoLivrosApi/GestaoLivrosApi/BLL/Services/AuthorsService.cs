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
using static GestaoLivrosApi.Models.Authors.EditAuthorDTO;

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

        public async Task<MessagingHelper<AuthorDTO>> GetById(int id)
        {
            MessagingHelper<AuthorDTO> result = new();

            try
            {
                var responseRepository = await _authorRepository.GetById(id);

                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Não foi possivel encontrar este autor";
                    return result;
                }

                var authorRepository = new AuthorDTO(responseRepository);
                result.Obj = authorRepository;
                result.Success = true;

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro ao ir buscar o autor";
            }

            return result;

        }

        public async Task<MessagingHelper<AuthorDTO>> Edit(EditAuthorDTO editAuthor)
        {
            MessagingHelper<AuthorDTO> result = new();

            try
            {
                EditAuthorDTOValidator validator = new();
                var responseValidator = validator.Validate(editAuthor);

                if (responseValidator.IsValid == false)
                {
                    result.Success = false;
                    result.Message = responseValidator.Errors.FirstOrDefault().ErrorMessage;
                    return result;
                }

                var author = await _authorRepository.GetById(editAuthor.Id);
                if(author == null)
                {
                    result.Message = "Este autor não existe";
                    return result;
                }

                author.Name = editAuthor.Name;
                author.Country = editAuthor.Country;
                author.Image = editAuthor.Image;

                author = await _authorRepository.Edit(author);

                result.Success = true;
                result.Obj = new AuthorDTO(author);

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Erro ao editar o autor ";
            }

            return result;
        }
    }
}

