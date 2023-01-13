using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoLivros.Infrastructure.Helpers;
using GestaoLivros.Infrastructure.Interfaces.Services;
using GestaoLivros.Infrastructure.Models;
using GestaoLivros.Infrastructure.Models.Authors;
using GestaoLivros.BLL.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GestaoLivrosApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorsController : ControllerBase
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

        [HttpPost("create")]
        public async Task<MessagingHelper> Create(CreateAuthorDTO createAuthor)
        {
            return await _authorService.Create(createAuthor);
        }


        [HttpGet("{id}")]
        public async Task<MessagingHelper<AuthorDTO>> GetById(int id)
         {
            return await _authorService.GetById(id);
         }

        [HttpPost("edit")]
        public async  Task<MessagingHelper<AuthorDTO>> Edit(EditAuthorDTO editAuthor)
        {
            return await _authorService.Edit(editAuthor);
        }
/*
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var author = await _authorService.GetAuthorById(id);
                if (author != null)
                {
                    await _authorService.Delete(author);
                    return Ok($"Autor de id={id} eliminado com sucesso");
                }
                else
                {
                    return NotFound($"Autor de id={id} não encontrado");
                }
            }
            catch
            {
                return BadRequest("Request inválido");
            }
        }*/

    }
}

