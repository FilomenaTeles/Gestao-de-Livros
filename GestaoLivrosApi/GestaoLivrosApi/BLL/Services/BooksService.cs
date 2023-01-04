using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Data;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Repositories;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models.Books;
using static GestaoLivrosApi.Models.Books.CreateBookDTO;
using static GestaoLivrosApi.Models.Books.EditBookDTO;
using Azure;

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

        public async Task<MessagingHelper<BookDTO>> GetById(int id)
        {
            MessagingHelper<BookDTO> result = new();

            try
            {
                var responseRepository = await _bookRepository.GetById(id);

                if (responseRepository == null)
                {
                    result.Success = false;
                    result.Message = "Não foi possivel encontrar este livro";
                    return result;
                }
                

                var bookRepository = new  BookDTO(responseRepository);

                result.Obj = bookRepository;
                result.Success = true;
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Ocorreu um erro ao ir buscar o livro";
            }
            return result;
        }

        public async Task<MessagingHelper<BookDTO>> Update(EditBookDTO editBook)
        {
            MessagingHelper<BookDTO> result = new();

            try
            {
                EditBookDTOValidator validator = new();
                var responseValidator = validator.Validate(editBook);

                if (responseValidator.IsValid == false)
                {
                    result.Success = false;
                    result.Message = responseValidator.Errors.FirstOrDefault().ErrorMessage;
                    return result;
                }

                var book = await _bookRepository.GetById(editBook.Id);
                if (book == null)
                {
                    result.Message = "Este livro não existe";
                    return result;
                }

                if(book.Isbn != editBook.Isbn)
                {
                    //validar se novo isbn existe na bd
                    var isbnExist = await _bookRepository.ExistIsbn(editBook.Isbn);
                    if (isbnExist == true)
                    {
                        result.Success = false;
                        result.Message = "Este ISBN já existe";
                        return result;
                    }
                }

                book.Name = editBook.Name;
                book.Author = editBook.Author;
                book.Isbn = editBook.Isbn;
                book.Price = editBook.Price;

                book = await _bookRepository.Update(book);

                result.Success = true;
                result.Obj = new BookDTO(book);

            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = "Erro ao editar o livro ";
            }
            return result;
        }

        public async Task<Book> GetBookById(int id)
        {
            var books = await _context.Books.FindAsync(id);


            return books;
        }

        public async Task DeleteBook(Book book)
        {
            _context.Entry(book).CurrentValues["isDeleted"] = true;
            await _context.SaveChangesAsync();
        }

    }

  
}

