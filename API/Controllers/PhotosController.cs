using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Entities.Comments;
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

        [Authorize]
        [HttpGet("{publicId}", Name = "GetPhoto")]
        public async Task<ActionResult<PhotoDto>> GetPhoto(string publicId)
        {
            return await _photoRepository.GetPhotoAsync(publicId);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhotoDto>>> GetPhotos([FromQuery]PhotoParams photoParams)
        {
            var photos = await _photoRepository.GetPhotosAsync(photoParams);

            Response.AddPaginationHeader(photos.CurrentPage, photos.PageSize, photos.TotalCount, photos.TotalPages);

            return Ok(photos);

        }

        [HttpPost("add-comment")]
        public async Task<IActionResult> Comment(CommentDto commentDto)
        {
            var photo = await _photoRepository.GetPhotoAsync(commentDto.PostId);

            if(commentDto.MainCommentId == 0)
            {
                photo.MainComments = photo.MainComments ?? new List<MainComment>();
            

            photo.MainComments.Add(new MainComment
            {
                Message = commentDto.Message,
                Created = DateTime.Now
            });
            
             _photoRepository.UpdateComment(photo);
            
            }
            else
            {
                var comment = new ReplyComment
                {
                    MainCommentId = commentDto.MainCommentId,
                    Message = commentDto.Message,
                    Created = DateTime.Now
                };
            }

            await _photoRepository.SaveAllAsync();

            return Ok(photo);
        }



    }
}