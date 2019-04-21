using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    public class BlogController : ApiControllerBase<BlogPostViewModel, BlogPost, int>
    {
        private readonly IBlogService _blogService;
        private readonly IFileService _fileService;

        public BlogController(IBlogService blogService, IFileService fileService, IUserService userService) 
            : base(userService)
        {
            _blogService = blogService;
            _fileService = fileService;
        }

        protected override async Task<BlogPost> CreateEntityFromModelAsync(BlogPostViewModel model, DomainUser creator)
        {
            var blogPost = new BlogPost(model.Id, creator)
            {
                Title = model.Title,
                Category = model.Category,
                Content = model.Content,
                ImagePath = model.ImagePath
            };
            if (model.Image != null)
            {
                using (var stream = new MemoryStream())
                {
                    await model.Image.CopyToAsync(stream);
                    string extension = Path.GetExtension(model.Image.FileName);
                    string fileName = _fileService.GenerateUniqueFileName(extension, "blogpost-");
                    blogPost.ImagePath = await _fileService.SaveImageAsync(fileName, stream);
                }
            }
            return blogPost;
        }

        protected override async Task<BlogPost> PerformAddAsync(BlogPost entity)
        {
            return await _blogService.AddBlogPostAsync(entity);
        }

        protected override async Task PerformDeleteAsync(int entityId)
        {
            await _blogService.DeleteBlogPostAsync(entityId);
        }

        protected override async Task<BlogPost> PerformGetAsync(int id)
        {
            return await _blogService.GetBlogPostAsync(id);
        }

        protected override async Task<IEnumerable<BlogPost>> PerformGetManyAsync()
        {
            return await _blogService.GetBlogPostsAsync();
        }

        protected override async Task PerformUpdateAsync(BlogPost entity)
        {
            await _blogService.UpdateBlogPostAsync(entity);
        }

        protected override void PrepareEntityForReturn(BlogPost entity)
        {
            entity.ImagePath = Url.Content(entity.ImagePath);
        }
    }
}
