namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 15;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 15;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string CurrentUsername { get; set; }

    }
}