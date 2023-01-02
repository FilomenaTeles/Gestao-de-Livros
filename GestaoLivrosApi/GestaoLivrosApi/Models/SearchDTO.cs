using System;
using System.Reflection.Metadata;

namespace GestaoLivrosApi.Models
{
	public class SearchDTO
	{
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public List<Parameter>? SearchParameters { get; set; }
        public string? SortingParameters { get; set; }
    }
}

