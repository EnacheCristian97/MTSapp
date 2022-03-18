using System;

namespace API.Entities.Comments
{
    public class Comment
    {
        public int Id { get; set; }
        public string Message { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public AppUser User { get; set; }
    }
}