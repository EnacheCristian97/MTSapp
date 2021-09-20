using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IFollowRepository
    {
         Task<UserLike> GetUserFollow(int sourceUserId, int likedUserId);
         Task<AppUser> GetUserWithFollowers(int userId);
         Task<IEnumerable<FollowDto>> GetUserFollows(string predicate, int userId);
    }
}