using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.Comments;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        void Update(Photo photo);
        void UpdateComment(PhotoDto photo);
        Task<bool> SaveAllAsync();
        Task<PhotoDto> GetPhotoAsync(string publicId);
        Task<PagedList<PhotoDto>> GetPhotosAsync(PhotoParams photoParams);

        void AddReplyComment(ReplyComment comment);

    }
}