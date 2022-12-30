using System;
using GestaoLivrosApi.Helpers;
using System.Reflection.Metadata;
using GestaoLivrosApi.Models;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Data;

namespace GestaoLivrosApi.DAL.Repositories
{
    public class BookRepositorie : IBookRepositorie
    {
        private readonly AppDbContext _context;

        public BookRepositorie(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedList<Book>> GetAllAsync(List<Parameter>? SearchBy, List<Parameter>? OrderBy, int currentPage = 1, int pageSize = 5)
        {
            PaginatedList<Book> response = new PaginatedList<Book>();

            var query = _context.Books.AsQueryable();
            //result.Items = resultSendRequest;
            //var sendRequest = await Request.SendRequest

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
    }

}