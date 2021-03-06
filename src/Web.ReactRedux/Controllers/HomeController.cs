using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Web.ReactRedux.Models;
using StartupCreativeAgency.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers
{
    /// <summary>
    /// Котнроллер по умолчанию. Обслуживает главную страницу сайта.
    /// </summary>
    public class HomeController : Controller
    {
        private IServiceInfoService _serviceInfoService;
        private IUserService _userService;
        private IWorkExampleService _workExampleService;
        private IBlogService _blogService;
        private IBrandService _brandService;
        private ITestimonialService _testimonialService;
        private IContactsService _contactsService;
        private IMessageService _messageService;
        private RoleManager<IdentityRole> _roleManager;

        public HomeController(
            IServiceInfoService serviceInfoService,
            IUserService userService,
            IWorkExampleService workExampleService,
            IBlogService blogService,
            IBrandService brandService,
            ITestimonialService testimonialService,
            IContactsService contactsService,
            IMessageService messageService,
            RoleManager<IdentityRole> roleManager)
        {
            _serviceInfoService = serviceInfoService;
            _userService = userService;
            _workExampleService = workExampleService;
            _blogService = blogService;
            _brandService = brandService;
            _testimonialService = testimonialService;
            _contactsService = contactsService;
            _messageService = messageService;
            _roleManager = roleManager;
        }

        public IActionResult Index() => View();
        
        // Возвращает начальное состояние SPA.
        [HttpGet("/api/home/initial-state")]
        public async Task<InitialAppState> AppStateAsync()
        {
            var model = new InitialAppState();
            if (User != null && User.Identity.IsAuthenticated)
            {
                var user = await _userService.GetUserAsync(User.Identity.Name);
                model.IsAuthenticated = true;
                model.UserName = user.Identity.UserName;
                model.Photo = Url.Content(user.Profile.PhotoFilePath);
                model.IsAdmin = User.IsInRole("Administrator");
                model.NewMessagesCount = model.IsAdmin ? (await _messageService.GetMessagesAsync()).Where(x => !x.IsRead).Count() : 0;
                model.Roles = model.IsAdmin ? _roleManager.Roles.Select(x => x.Name) : null;
            }
            return model;
        }

        // Возвращает модель представления главной страницы сайта.
        [HttpGet("/api/home/model")]
        public async Task<HomePageModel> ModelAsync()
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
    }
}
