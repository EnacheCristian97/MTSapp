using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PhotoRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<PhotoDto> GetPhotoAsync(string publicId)
        {
            return await _context.Photos
            .Where(p => p.PublicId == publicId)
            .ProjectTo<PhotoDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();     
        }

        public async Task<PagedList<PhotoDto>> GetPhotosAsync(PhotoParams photoParams)
        {
            var query = _context.Photos.AsQueryable();

            query = query.Where(p => p.AppUserId != photoParams.CurrentIdUser);

            query = photoParams.OrderBy switch
            {
                "created" => query.OrderByDescending(p => p.Created),
                _ => query.OrderByDescending(p => p.Created)
            };

            return await PagedList<PhotoDto>.CreateAsync(query.ProjectTo<PhotoDto>(_mapper.ConfigurationProvider).AsNoTracking(),
            photoParams.PageNumber, photoParams.PageSize);
        }

           public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

            public void Update(Photo photo)
        {
            _context.Entry(photo).State = EntityState.Modified;
        }
    }
}