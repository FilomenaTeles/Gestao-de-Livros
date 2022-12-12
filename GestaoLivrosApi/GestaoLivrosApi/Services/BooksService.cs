﻿using System;
using Microsoft.EntityFrameworkCore;
using GestaoLivrosApi.Models;
using GestaoLivrosApi.Data;

namespace GestaoLivrosApi.Services
{
    public class BooksService : IBookService
    {
        private readonly AppDbContext _context;

        public BooksService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            try
            {
                return await _context.Books.ToListAsync();
            }
            catch 
            {
                throw;
            }
        }
    }
}

