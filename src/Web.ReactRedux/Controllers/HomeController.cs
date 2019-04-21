using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using StartupCreativeAgency.Domain.Entities;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();

        [HttpGet("viewModel")]
        public async Task<IndexViewModel> ViewModelAsync(
            [FromServices]IServiceInfoService serviceInfoService,
            [FromServices]IUserService userService,
            [FromServices]IWorkExampleService workExampleService,
            [FromServices]IBlogService blogService,
            [FromServices]IBrandService brandService,
            [FromServices]ITestimonialService testimonialService,
            [FromServices]IContactsService contactsService)
        {
            return new IndexViewModel
            {
                Services = await serviceInfoService.GetServiceInfosAsync(),
                TeamMembers = await userService.GetDisplayedTeamMembersAsync(),
                Works = await workExampleService.GetWorkExamplesAsync(),
                BlogPosts = await blogService.GetBlogPostsAsync(skip: 0, take: 2),
                Brands = await brandService.GetBrandsAsync(),
                Testimonials = await testimonialService.GetTestimonialsAsync(),
                Contacts = await contactsService.GetContactsAsync(),
                SocialLinks = (await contactsService.GetSocialLinksAsync()).Select(x =>
                    new SocialLink(x.Key, x.Value))
            };
        }
    }
}
