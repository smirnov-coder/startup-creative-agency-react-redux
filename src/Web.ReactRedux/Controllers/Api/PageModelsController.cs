using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Exceptions;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class PageModelsController : ControllerBase
    {
        private IServiceInfoService _serviceInfoService;
        private IUserService _userService;
        private IWorkExampleService _workExampleService;
        private IBlogService _blogService;
        private IBrandService _brandService;
        private ITestimonialService _testimonialService;
        private IContactsService _contactsService;
        private IMessageService _messageService;

        public PageModelsController(
            IServiceInfoService serviceInfoService,
            IUserService userService,
            IWorkExampleService workExampleService,
            IBlogService blogService,
            IBrandService brandService,
            ITestimonialService testimonialService,
            IContactsService contactsService,
            IMessageService messageService)
        {
            _serviceInfoService = serviceInfoService;
            _userService = userService;
            _workExampleService = workExampleService;
            _blogService = blogService;
            _brandService = brandService;
            _testimonialService = testimonialService;
            _contactsService = contactsService;
            _messageService = messageService;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<HomePageModel> HomeAsync()
        {
            const int BLOG_POST_COUNT = 2;
            return new HomePageModel
            {
                Services = await _serviceInfoService.GetServiceInfosAsync(),
                TeamMembers = (await _userService.GetDisplayedTeamMembersAsync()).Select(user =>
                {
                    var profile = user.Profile;
                    profile.UpdatePersonalInfo(
                        profile.FirstName,
                        profile.LastName,
                        profile.JobPosition,
                        Url.Content(profile.PhotoFilePath));
                    return user;
                }),
                Works = (await _workExampleService.GetWorkExamplesAsync()).Select(workExample =>
                {
                    workExample.ImagePath = Url.Content(workExample.ImagePath);
                    return workExample;
                }),
                BlogPosts = (await _blogService.GetBlogPostsAsync(skip: 0, take: BLOG_POST_COUNT)).Select(blogPost =>
                {
                    blogPost.ImagePath = Url.Content(blogPost.ImagePath);
                    return blogPost;
                }),
                Brands = (await _brandService.GetBrandsAsync()).Select(brand =>
                {
                    brand.ImagePath = Url.Content(brand.ImagePath);
                    return brand;
                }),
                Testimonials = await _testimonialService.GetTestimonialsAsync(),
                Contacts = await _contactsService.GetContactsAsync(),
                SocialLinks = (await _contactsService.GetSocialLinksAsync()).Select(x => new SocialLink(x.Key, x.Value))
            };
        }

        [AllowAnonymous]
        public async Task<UserWidgetViewModel> LoginAsync() => await GetUserWidgetModelAsync();

        [AllowAnonymous]
        public async Task<UserWidgetViewModel> AccessDeniedAsync() => await GetUserWidgetModelAsync();

        [AllowAnonymous]
        public async Task<UserWidgetViewModel> NotFoundAsync() => await GetUserWidgetModelAsync();

        private async Task<UserWidgetViewModel> GetUserWidgetModelAsync(DomainUser user = null)
        {
            var result = new UserWidgetViewModel();
            if (User != null && User.Identity.IsAuthenticated)
            {
                user = user ?? await _userService.GetUserAsync(User.Identity.Name);
                result.UserName = user.Identity.UserName;
                result.Photo = Url.Content(user.Profile.PhotoFilePath);
            }
            return result;
        }

        public async Task<MyProfilePageModel> MyProfileAsync()
        {
            var user = await _userService.GetUserAsync(User?.Identity?.Name);
            return new MyProfilePageModel
            {
                UserWidget = await GetUserWidgetModelAsync(user),
                UserName = user.Identity.UserName,
                FirstName = user.Profile.FirstName,
                LastName = user.Profile.LastName,
                JobPosition = user.Profile.JobPosition,
                PhotoFilePath = Url.Content(user.Profile.PhotoFilePath),
                SocialLinks = user.Profile.SocialLinks.ToList(),
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        private bool IsCurrentUserAdmin() => User.IsInRole("Administrator");

        private async Task<int> GetNewMessagesCount()
        {
            return !IsCurrentUserAdmin() ? 0 : (await _messageService.GetMessagesAsync()).Where(x => !x.IsRead).Count();
        }

        public async Task<ListPageModel<ServiceInfo, int>> ServicesAsync() => new ListPageModel<ServiceInfo, int>
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Items = await _serviceInfoService.GetServiceInfosAsync(),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EditPageModel<ServiceInfo, int>>> EditServiceAsync(int id)
        {
            var serviceInfo = await _serviceInfoService.GetServiceInfoAsync(id);
            EnsureEntityNotNull(serviceInfo);
            return new EditPageModel<ServiceInfo, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = serviceInfo,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        private void EnsureEntityNotNull(object entity)
        {
            if (entity == null)
            {
                /// TODO: Надо писать сообщение???
                throw new EntityNotFoundException();
            }
        }

        public async Task<BasePageModel> AddServiceAsync() => await GetAddPageModelAsync();

        private async Task<BasePageModel> GetAddPageModelAsync() => new BasePageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        public async Task<UsersPageModel> UsersAsync() => new UsersPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Users = (await _userService.GetUsersAsync()).Select(user =>
            {
                var profile = user.Profile;
                profile.UpdatePersonalInfo(
                    profile.FirstName,
                    profile.LastName,
                    profile.JobPosition,
                    Url.Content(profile.PhotoFilePath));
                return user;
            }),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{userName}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<ActionResult<ManageUserPageModel>> ManageUserAsync(string userName)
        {
            var user = await _userService.GetUserAsync(userName);
            EnsureEntityNotNull(user);
            return new ManageUserPageModel
            {
                UserWidget = await GetUserWidgetModelAsync(),
                ManagedUser = user,
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        [Authorize(Policy = "AdminPolicy")]
        public async Task<RegisterUserPageModel> RegisterUserAsync() => new RegisterUserPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        public async Task<WorksPageModel> WorksAsync() => new WorksPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Works = (await _workExampleService.GetWorkExamplesAsync()).Select(workExample =>
            {
                workExample.ImagePath = Url.Content(workExample.ImagePath);
                return workExample;
            }),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EditPageModel<WorkExample, int>>> EditWorkExample(int id)
        {
            var workExample = await _workExampleService.GetWorkExampleAsync(id);
            EnsureEntityNotNull(workExample);
            workExample.ImagePath = Url.Content(workExample.ImagePath);
            return new EditPageModel<WorkExample, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = workExample,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        public async Task<BasePageModel> AddWorkExample() => await GetAddPageModelAsync();

        public async Task<BlogPageModel> BlogAsync() => new BlogPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            BlogPosts = (await _blogService.GetBlogPostsAsync()).Select(blogPost =>
            {
                blogPost.ImagePath = Url.Content(blogPost.ImagePath);
                return blogPost;
            }),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EditPageModel<BlogPost, int>>> EditBlogPostAsync(int id)
        {
            var blogPost = await _blogService.GetBlogPostAsync(id);
            EnsureEntityNotNull(blogPost);
            blogPost.ImagePath = Url.Content(blogPost.ImagePath);
            return new EditPageModel<BlogPost, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = blogPost,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        public async Task<BasePageModel> AddBlogPostAsync() => await GetAddPageModelAsync();

        public async Task<BrandsPageModel> BrandsAsync() => new BrandsPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Brands = (await _brandService.GetBrandsAsync()).Select(brand =>
            {
                brand.ImagePath = Url.Content(brand.ImagePath);
                return brand;
            }),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EditPageModel<Brand, int>>> EditBrandAsync(int id)
        {
            var brand = await _brandService.GetBrandAsync(id);
            EnsureEntityNotNull(brand);
            brand.ImagePath = Url.Content(brand.ImagePath);
            return new EditPageModel<Brand, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = brand,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        public async Task<BasePageModel> AddBrandAsync() => await GetAddPageModelAsync();

        public async Task<TestimonialsPageModel> TestimonialsAsync() => new TestimonialsPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Testimonials = await _testimonialService.GetTestimonialsAsync(),
            IsAdmin = IsCurrentUserAdmin(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        public async Task<ActionResult<EditPageModel<Testimonial, int>>> EditTestimonialAsync(int id)
        {
            var testimonial = await _testimonialService.GetTestimonialAsync(id);
            EnsureEntityNotNull(testimonial);
            return new EditPageModel<Testimonial, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = testimonial,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

        [Authorize(Policy = "AdminPolicy")]
        public async Task<ContactsPageModel> ContactsAsync() => new ContactsPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Contacts = await _contactsService.GetContactsAsync(),
            SocialLinks = (await _contactsService.GetSocialLinksAsync()).Select(x => new SocialLink(x.Key, x.Value)),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [Authorize(Policy = "AdminPolicy")]
        public async Task<MessagesPageModel> MessagesAsync() => new MessagesPageModel
        {
            UserWidget = await GetUserWidgetModelAsync(),
            Messages = await _messageService.GetMessagesAsync(),
            NewMessagesCount = await GetNewMessagesCount()
        };

        [HttpGet("{id:int}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<EditPageModel<Message, int>> MessageAsync(int id)
        {
            var message = await _messageService.GetMessageAsync(id);
            EnsureEntityNotNull(message);
            return new EditPageModel<Message, int>
            {
                UserWidget = await GetUserWidgetModelAsync(),
                Item = message,
                IsAdmin = IsCurrentUserAdmin(),
                NewMessagesCount = await GetNewMessagesCount()
            };
        }

    }
}