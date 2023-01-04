using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models.Books;
using static GestaoLivrosApi.Models.Books.CreateBookDTO;

namespace GestaoLivrosApi.Services
{
    public class BooksService : IBookService
    {
        private readonly AppDbContext _context;
        private readonly IBookRepository _bookRepository;

        public BooksService(AppDbContext context, IBookRepository bookRepository)
        {
            _context = context;
            _bookRepository = bookRepository;
        }

       
        
        /*public PagedList<Book> GetBooks(BookParameters bookParameters, string? orderValue)
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
        
        public async Task<PaginatedList<ListBook>> GetBooks(SearchDTO search)
        {
            PaginatedList<ListBook> result = new PaginatedList<ListBook>();

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

                var responseRepository = await _bookRepository.GetAllAsync(search.SearchParameter, search.SortingParameter, search.CurrentPage, search.PageSize);

                if (responseRepository.Success != true)
                {
                    result.Success = false;
                    result.Message = "Erro ao obter a informação das urdissagens";
                    return result;
                }
                result.Items = responseRepository.Items.Select(t => new ListBook(t)).ToList();
                result.PageSize = responseRepository.PageSize;
                result.CurrentPage = responseRepository.CurrentPage;
                result.TotalRecords = responseRepository.TotalRecords;
                result.Success = true;

                
            }
            catch 
            {
                result.Success = false;
                result.Message = "Ocorreu um erro inesperado ao obter os livros.";
              
            }
            return result;
        }

        /*
          public PagedList<Book> GetBooksBy(BookParameters bookParameters, string searchValue)
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
        }
         */

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

        /* public async Task InsertBook(Book book)
         {

             _context.Books.Add(book);
             await _context.SaveChangesAsync();

         }*/

        public async Task<MessagingHelper> Create(CreateBookDTO createBook)
        {
            MessagingHelper response = new MessagingHelper();

            try
            {
                CreateBookDTOValidator validator = new();
                var responseValidate = await validator.ValidateAsync(createBook);
                if (responseValidate == null || responseValidate.IsValid == false)
                {
                    if (responseValidate == null)
                    {
                        response.Message = "Erro ao validar a informação do livro.";
                        return response;
                    }

                    response.Message = responseValidate.Errors.FirstOrDefault()!.ErrorMessage;
                    return response;
                }

                var isbnExist = await _bookRepository.ExistIsbn(createBook.Isbn);
                if (isbnExist == true)
                {
                    response.Success = false;
                    response.Message = "Este ISBN já existe";
                    return response;
                }

                var newBook = createBook.ToEntity();
                var book = await _bookRepository.Create(newBook);
                if(book == null)
                {
                    response.Success = false;
                    response.Message = "Erro ao criar livro";
                    return response;
                }

                response.Success = true;
                response.Message = "Livro criado com sucesso";
            }

            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "Erro interno ao criar um livro.";
            }

            return response;
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

