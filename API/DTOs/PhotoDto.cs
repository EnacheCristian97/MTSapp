using System;
using API.Entities;

namespace API.DTOs
{
    public class PhotoDto
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string Title { get; set; }
        public DateTime Created { get; set; }
        public MemberDto AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}