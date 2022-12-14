using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoLivrosApi.Services;
using GestaoLivrosApi.Models;
using Microsoft.AspNetCore.Mvc;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestaoLivrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : Controller
    {
        private IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }


        // GET: api/values
        [HttpGet]
       public async Task<ActionResult<IAsyncEnumerable<Book>>> GetBooks()
        {
            try
            {
                var books = await _bookService.GetBooks();
                return Ok(books);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao obter alunos");

            }
        }

        [HttpGet("GetBooksByIsbn")]
        public async Task<ActionResult<IAsyncEnumerable<Book>>> GetBooksByIsbn([FromQuery] string isbn)
        {
            try
            {
                var books = await _bookService.GetBooksByIsbn(isbn);
                if (books?.Any() != true)
                    return NotFound($"Não existe o livro com isbn: {isbn} neste catálogo");
                return Ok(books);
            }
            catch 
            {
                return BadRequest("Request inválido");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Insert(Book book)
        {
            try
            {
                var hasIsbn = await _bookService.GetBooksByIsbn(book.Isbn.ToString());

                if (hasIsbn.Any() != true && book.Price>0)
                {
                    await _bookService.InsertBook(book);
                    return Ok(book);
                }
                else if (hasIsbn.Any() == true)
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, $"O ISBN {book.Isbn} já existe no catálogo");
                }
                else 
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Impossivel adicionar um livro com preço negativo");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }

    }
} 

