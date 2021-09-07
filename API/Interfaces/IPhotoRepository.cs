using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPhotoRepository
    {
        void Update(Photo photo);
        Task<bool> SaveAllAsync();
        Task<PhotoDto> GetPhotoAsync(int id);
        Task<PagedList<PhotoDto>> GetPhotosAsync(PhotoParams photoParams);

    }
}