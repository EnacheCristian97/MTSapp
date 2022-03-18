using System.Collections.Generic;

namespace API.Entities.Comments
{
    public class MainComment : Comment
    {
     public List<ReplyComment> ReplyComments { get; set; }   
    }
}