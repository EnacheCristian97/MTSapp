namespace API.DTOs
{
    public class CommentDto
    {
        public string PostId { get; set; }
        public int MainCommentId { get; set; }
        public string Message { get; set; }
    }
}