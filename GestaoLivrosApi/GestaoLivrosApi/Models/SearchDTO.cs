using System;
using System.Reflection.Metadata;

namespace GestaoLivrosApi.Models
{
	public class SearchDTO
	{
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string? SearchParameter { get; set; }
        public string? SortingParameter { get; set; }
    }
}

