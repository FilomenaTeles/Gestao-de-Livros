/*public class PagedList<T> : List<T>
{
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int PageSize { get; private set; }
    public int TotalCount { get; private set; }
    public string Metadada { get; set; }

    public bool HasPrevious => CurrentPage > 1;
    public bool HasNext => CurrentPage < TotalPages;

    public List<T> Items { get; set; }

    public PagedList()
    {
        this.Items = new List<T>();
    }

    public PagedList(List<T> items, int count, int pageNumber, int pageSize)
    {
        TotalCount = count;
        PageSize = pageSize;
        CurrentPage = pageNumber;
        TotalPages = (int)Math.Ceiling(count / (double)pageSize);

        AddRange(items);
    }

    public static PagedList<T> ToPagedList(IQueryable<T> source, int pageNumber, int pageSize)
    {
        var count = source.Count();
        var items = source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
        
        return new PagedList<T>(items, count, pageNumber, pageSize);
    }
}*/

namespace GestaoLivrosApi.Helpers
{
    public class PaginatedList<T>
    {

        public PaginatedList()
        {
            this.Items = new List<T>();
        }

        public bool Success { get; set; }
        public string? Message { get; set; }

        /// <summary>
        /// Número de registos totais existentes na origem dos dados
        /// </summary>
        public int TotalRecords { get; set; } = 0;

        /// <summary>
        /// Número de registos que existem na listagem 
        /// </summary>
        public int Count
        {
            get => Items.Count;
        }

        /// <summary>
        /// Listagem com os dados
        /// </summary>
        public List<T> Items { get; set; }

        /// <summary>
        /// Tamanho de cada página
        /// </summary>
        public int PageSize { get; set; } = 6;

        /// <summary>
        /// Número de páginas existentes
        /// </summary>
        public int TotalPages
        {
            get
            {
                if (TotalRecords <= 0) return 0;
                return (int)Math.Ceiling((decimal)TotalRecords / PageSize);
            }
        }

        /// <summary>
        /// Página Atual
        /// </summary>
        public int CurrentPage { get; set; } = 0;

        /// <summary>
        /// Se tem uma próxima página
        /// </summary>
        public bool HasNextPage { get => TotalPages > CurrentPage; }

        //Se tem a página anterior
        public bool HasPreviousPage { get => CurrentPage > 1 && TotalPages >= CurrentPage; }
    }
}