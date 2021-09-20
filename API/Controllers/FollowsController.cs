using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class FollowsController : BaseApiCpntroller
    {
        private readonly IUserRepository _userRepository;
        private readonly IFollowRepository _followRepository;
        public FollowsController(IUserRepository userRepository, IFollowRepository followRepository)
        {
            _followRepository = followRepository;
            _userRepository = userRepository;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddFollow(string username)
        {
            var sourceUserId = User.GetUserId();
            var followedUser = await _userRepository.GetUserByUsernameAsync(username);
            var sourceUser = await _followRepository.GetUserWithFollowers(sourceUserId);

            if (followedUser == null) return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You cannot follow your self!");

            var userFollow = await _followRepository.GetUserFollow(sourceUserId, followedUser.Id);

            if (userFollow != null) return BadRequest("You already follow this user!");

            userFollow = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = followedUser.Id
            };

            sourceUser.Following.Add(userFollow);

            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to follow user!");

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FollowDto>>> GetFollowingUsers(string predicate)
        {
            var users = await _followRepository.GetUserFollows(predicate, User.GetUserId());

            return Ok(users);
            
        }
    }
}