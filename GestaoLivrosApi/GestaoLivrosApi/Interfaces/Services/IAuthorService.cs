using System;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using GestaoLivrosApi.Models.Books;

namespace GestaoLivrosApi.Interfaces.Services
{
	public interface IAuthorService
	{
        Task<PaginatedList<ListAuthor>> GetAll(SearchDTO search);

        Task<MessagingHelper> Create(CreateAuthorDTO createAuthor);

        Task<MessagingHelper<AuthorDTO>> GetById(int id);

        Task<MessagingHelper<AuthorDTO>> Edit (EditAuthorDTO editAuthor);
    }
}

