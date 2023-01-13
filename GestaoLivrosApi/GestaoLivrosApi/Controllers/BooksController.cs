using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoLivros.Infrastructure.Interfaces.Services;
using GestaoLivros.Infrastructure.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using GestaoLivros.Infrastructure.Helpers;
using GestaoLivros.Infrastructure.Models.Books;



// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestaoLivrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
        }

        // GET: api/values
        [HttpPost ("getBooks")]
        public async Task<PaginatedList<ListBook>> GetBooks(SearchDTO search)
        {
            return await _bookService.GetBooks(search);
        }

        [HttpPost("create")]
        
        public async Task<MessagingHelper> Create(CreateBookDTO createBook)
        {
            return await _bookService.Create(createBook);
        }
      
        [HttpGet("{id}")]
        public async Task<MessagingHelper<BookDTO>> GetById(int id)
        {
            return await _bookService.GetById(id);
        }

        [HttpPost("update")]
        public async Task<MessagingHelper<BookDTO>> Update(EditBookDTO editBook)
        {
            return await _bookService.Update(editBook);
        }
        /*
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var book = await _bookService.GetBookById(id);
                if (book != null)
                {
                    await _bookService.DeleteBook(book);
                    return Ok($"Livro de id={id} eliminado com sucesso");
                }
                else
                {
                    return NotFound($"Livro de id={id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }*/

        [HttpPost("delete")]
        public async Task<MessagingHelper> Delete(DeleteBookDTO deleteBook)
        {
            return await _bookService.Delete(deleteBook);
        }

    }
} 

