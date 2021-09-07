using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class PhotosController : BaseApiCpntroller
    {
        private readonly IPhotoRepository _photoRepository;
        public PhotosController(IPhotoRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }

        [HttpGet("id", Name = "GetPhoto")]
        public async Task<ActionResult<PhotoDto>> GetPhoto(int id)
        {
            return await _photoRepository.GetPhotoAsync(id);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> GetPhotos([FromQuery]PhotoParams photoParams)
        {
            // var photo = await _photoRepository.GetPhotoAsync();
            // photoParams.CurrentIdUser = photo.AppUserId;
            var photos = await _photoRepository.GetPhotosAsync(photoParams);

            Response.AddPaginationHeader(photos.CurrentPage, photos.PageSize, photos.TotalCount, photos.TotalPages);

            return Ok(photos);

        }

    }
}