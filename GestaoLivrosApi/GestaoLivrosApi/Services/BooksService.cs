using System;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Data;
using X.PagedList;
using GestaoLivrosApi.Helpers;

namespace GestaoLivrosApi.Services
{
    public class BooksService : IBookService
    {
        private readonly AppDbContext _context;

        public BooksService(AppDbContext context)
        {
            _context = context;
        }

       
        /*
        public PagedList<Book> GetBooks(BookParameters bookParameters, string? orderValue)
        {
            
            try
            {
                if (orderValue!=null)
                {
                    switch (orderValue)
                    {
                       
                        case "name-desc":
                            {
                                return PagedList<Book>.ToPagedList(FindAll().OrderByDescending(b => b.Name), bookParameters.PageNumber, bookParameters.PageSize);
                              
                            }
                        case "price-asc":
                            {
                                return PagedList<Book>.ToPagedList(FindAll().OrderBy(b => b.Price), bookParameters.PageNumber, bookParameters.PageSize);

                            }
                        case "price-desc":
                            {
                                return PagedList<Book>.ToPagedList(FindAll().OrderByDescending(b => b.Price), bookParameters.PageNumber, bookParameters.PageSize);

                            }
                        default:
                            {
                                return PagedList<Book>.ToPagedList(FindAll().OrderBy(b => b.Name), bookParameters.PageNumber, bookParameters.PageSize);
                                
                            }
                    }
                }
                else
                {
                    return PagedList<Book>.ToPagedList(FindAll().OrderBy(b => b.Name), bookParameters.PageNumber, bookParameters.PageSize);

                }

            }
            catch
            {
                throw;
            }
        }*/

        public async Task<PagedList<Book>> GetBooks(BookParameters bookParameters)
        {
            PagedList<Book> result = new PagedList<Book>();
        }


        /*
         * public async Task<PaginatedList<AssistanceListDTO>> GetAll(SearchDTO search)
        {
            PaginatedList<AssistanceListDTO> result = new PaginatedList<AssistanceListDTO>();
            try
            {
                string endpointUrl = $"{_wintouchApiUrlBase}/Assistance/getAll";

                var httpClient = new HttpClient();

                var resultSendRequest = await Request.SendRequest<PaginatedList<AssistanceListDTO>, ErrorMessageDTO>(httpClient, search, endpointUrl, HttpMethod.Post);
                if (resultSendRequest.Success == false || resultSendRequest.Obj.Success == false)
                {
                    Logs.Write(LogTypes.Error, $"Sem sucesso ao obter as assistencias do wintouch: {resultSendRequest.ErrorMessage}", true);

                    result.Success = false;
                    result.Message = "Sem sucesso ao obter as assistencias do wintouch";
                    return result;
                }
                result = resultSendRequest.Obj;
            }
            catch (Exception ex)
            {
                Logs.Write(LogTypes.Error, $"Falhou o pedido para obter as assistencias do wintouch: {ex.GetBaseException()}", true);

                result.Success = false;
                result.Message = "Ocorreu um erro inesperado ao obter as assistencias do wintouch.";
            }
            return (result);
        }
         */

       /* public PagedList<Book> GetBooksBy(BookParameters bookParameters, string searchValue)
        {
            try
            {

                return PagedList<Book>.ToPagedList(FindAll().Where(b => b.Name.Contains( searchValue) || b.Author.Contains(searchValue)
                                        || b.Isbn.ToString().Contains(searchValue) || b.Price.ToString().Contains(searchValue)).
                                        OrderBy(b => b.Name), bookParameters.PageNumber, bookParameters.PageSize);
               
            }
            catch 
            {
                throw;
            }
        }*/

        public IQueryable<Book> FindAll()
        {
            return this._context.Set<Book>();
        }

        public async Task<IEnumerable<Book>> GetBooksByIsbn(string isbn)
        {
            // cira enumeravel de livros
            IEnumerable<Book> books;

            if (!string.IsNullOrEmpty(isbn))
            {
                books = await _context.Books.Where(b => (b.Isbn.ToString()).Equals(isbn)).ToListAsync();
            }
            else
            {
                //books = await GetBooks();
                books = await _context.Books.Where(b => (b.Isbn.ToString()).Equals(isbn)).ToListAsync();
            }
            return books;
        }

        public async Task<Book> GetBookById(int id)
        {
            var books = await _context.Books.FindAsync(id);
            
            return books;
        }

        public async Task InsertBook(Book book)
        {

            _context.Books.Add(book);
            await _context.SaveChangesAsync();

        }

        public async Task UpdateBook(Book book)
        {
            _context.Entry(book).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(Book book)
        {
            _context.Entry(book).CurrentValues["isDeleted"] = true;
            await _context.SaveChangesAsync();
        }

    }

  
}

