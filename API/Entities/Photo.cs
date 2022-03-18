using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using API.Entities.Comments;

namespace API.Entities
{
    [Table("Photos")]
    public class Photo
    {
        public int Id { get; set; }
        public string PublicId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public bool IsMain { get; set; }
        public bool IsCover { get; set; }
        public DateTime Created { get; set; } = DateTime.Now;
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
        public List<MainComment> MainComments { get; set; }
    }
}