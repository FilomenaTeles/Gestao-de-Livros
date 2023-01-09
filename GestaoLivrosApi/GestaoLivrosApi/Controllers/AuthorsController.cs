using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoLivrosApi.Helpers;
using GestaoLivrosApi.Interfaces.Services;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Models.Authors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestaoLivrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : Controller
    {
        private IAuthorService _authorService;

        public AuthorsController(IAuthorService authorService)
        {
            _authorService = authorService;
        }


        [HttpPost("getAll")]
        public async Task<PaginatedList<ListAuthor>> GetAll(SearchDTO search)
        {
            return await _authorService.GetAll(search);
        }

        /*
         *  [HttpPost("create")]
        
        public async Task<MessagingHelper> Create(CreateBookDTO createBook)
        {
            return await _bookService.Create(createBook);
        }
         */
    }
}

