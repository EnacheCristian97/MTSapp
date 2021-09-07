namespace API.Helpers
{
    public class PhotoParams
    {
        private const int MaxPageSize = 15;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public int CurrentIdUser { get; set; }

    }
    
}