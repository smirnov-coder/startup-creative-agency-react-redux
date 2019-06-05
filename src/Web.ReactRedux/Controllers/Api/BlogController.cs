using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    public class BlogController : ApiControllerBase<BlogPostBindingModel, BlogPost, int>
    {
        private readonly IBlogService _blogService;
        private readonly IFileService _fileService;

        public BlogController(IBlogService blogService, IFileService fileService, IUserService userService)
            : base(userService)
        {
            _blogService = blogService;
            _fileService = fileService;
        }

        //
        // GET api/blog/public?skip=0&take=2
        //
        [HttpGet("public")]
        [AllowAnonymous]
        public async Task<IEnumerable<BlogPost>> PublicListAsync(int skip = 0, int take = 0)
        {
            return (await _blogService.GetBlogPostsAsync(skip, take)).Select(blogPost => PrepareEntityForReturn(blogPost));
        }

        //
        // GET api/blog
        //
        [Authorize]
        public async Task<IEnumerable<BlogPost>> PrivateListAsync() => await base.ListAsync();

        [NonAction]
        public override Task<IEnumerable<BlogPost>> ListAsync() => throw new NotSupportedException();

        protected override async Task<BlogPost> CreateEntityFromModelAsync(BlogPostBindingModel model, DomainUser creator)
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

        protected override BlogPost PrepareEntityForReturn(BlogPost entity)
        {
            entity.ImagePath = Url.Content(entity.ImagePath);
            return entity;
        }
    }
}
