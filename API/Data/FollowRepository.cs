using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class FollowRepository : IFollowRepository
    {
        private readonly DataContext _context;
        public FollowRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<UserLike> GetUserFollow(int sourceUserId, int likedUserId)
        {
            return await _context.Follows.FindAsync(sourceUserId, likedUserId);
        }

        public async Task<IEnumerable<FollowDto>> GetUserFollows(string predicate, int userId)
        {
            var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var follows = _context.Follows.AsQueryable();

            if (predicate == "following")
            {
                follows = follows.Where(follow => follow.SourceUserId == userId);
                users = follows.Select(follow => follow.LikedUser);
            }

            if (predicate == "followers")
            {
                follows = follows.Where(follow => follow.LikedUserId == userId);
                users = follows.Select(follow => follow.SourceUser);
            }

            return await users.Select(user => new FollowDto
            {
                Username = user.UserName,
                KnownAs = user.KnownAs,
                PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain).Url,
                City = user.City,
                Country = user.Country,
                Id = user.Id
            }).ToListAsync();
        }

        public async Task<AppUser> GetUserWithFollowers(int userId)
        {
            return await _context.Users
                        .Include(x => x.Following)
                        .FirstOrDefaultAsync(x => x.Id == userId); 
        }
    }
}