using System.Reflection.Metadata;

public abstract class QueryStringParameters
{
   /* const int maxPageSize = 50;
    public int PageNumber { get; set; } = 1;

    private int _pageSize = 10;
    public int PageSize
    {
        get
        {
            return _pageSize;
        }
        set
        {
            _pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
    }*/

    public int CurrentPage { get; set; }
    public int PageSize { get; set; }
    //public List<Parameter>? SearchParameters { get; set; }
    //public List<Parameter>? SortingParameters { get; set; }

    public void Validate()
    {
        if (PageSize > 100)
        {
            PageSize = 100;
        }

        if (PageSize <= 0)
        {
            PageSize = 1;
        }

        if (CurrentPage <= 0)
        {
            CurrentPage = 1;
        }
    }
}