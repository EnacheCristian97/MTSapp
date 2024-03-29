using API.Entities;
using API.Entities.Comments;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser,
     AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
     IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<UserLike> Follows { get; set; }
        public DbSet <Message> Messages { get; set; }
        public DbSet<Group> Groups {get; set;}
        public DbSet<Connection> Connections { get; set; }
        public DbSet<MainComment> MainComments { get; set;}
        public DbSet<ReplyComment> ReplyComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                     .HasMany(ur => ur.UserRoles)
                     .WithOne(u => u.User)
                     .HasForeignKey(ur => ur.UserId)
                     .IsRequired();

            builder.Entity<AppRole>()
                     .HasMany(ur => ur.UserRoles)
                     .WithOne(u => u.Role)
                     .HasForeignKey(ur => ur.RoleId)
                     .IsRequired();


            builder.Entity<UserLike>()
                   .HasKey(k => new {k.SourceUserId, k.LikedUserId});

            builder.Entity<UserLike>()
                   .HasOne(s => s.SourceUser)
                   .WithMany(l => l.Following)
                   .HasForeignKey(s => s.SourceUserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                   .HasOne(s => s.LikedUser)
                   .WithMany(l => l.Followers)
                   .HasForeignKey(s => s.LikedUserId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Message>()
                   .HasOne(u => u.Recipient)
                   .WithMany(m => m.MessagesRecived)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                   .HasOne(u => u.Sender)
                   .WithMany(m => m.MessagesSent)
                   .OnDelete(DeleteBehavior.Restrict);
        }
        
    }
}