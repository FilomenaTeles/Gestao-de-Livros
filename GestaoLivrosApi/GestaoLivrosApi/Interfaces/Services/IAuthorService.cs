using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;

namespace GestaoLivrosApi.Interfaces.Services
{
	public interface IAuthorService
	{
        Task<PaginatedList<ListAuthor>> GetAll(SearchDTO search);

        Task<MessagingHelper> Create(CreateAuthorDTO createAuthor);

        Task<MessagingHelper<AuthorDTO>> GetById(int id);

        Task<MessagingHelper<AuthorDTO>> Edit (EditAuthorDTO editAuthor);

        Task<Author> GetAuthorById(int id);

        Task Delete(Author author);
    }
}

