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
                TeamMembers = (await userService.GetDisplayedTeamMembersAsync()).Select(user => 
                {
                    var profile = user.Profile;
                    profile.UpdatePersonalInfo(profile.FirstName, profile.LastName, profile.JobPosition, Url.Content(profile.PhotoFilePath));
                    return user;
                }),
                Works = (await workExampleService.GetWorkExamplesAsync()).Select(workExample =>
                {
                    workExample.ImagePath = Url.Content(workExample.ImagePath);
                    return workExample;
                }),
                BlogPosts = (await blogService.GetBlogPostsAsync(skip: 0, take: 2)).Select(blogPost =>
                {
                    blogPost.ImagePath = Url.Content(blogPost.ImagePath);
                    return blogPost;
                }),
                Brands = (await brandService.GetBrandsAsync()).Select(brand =>
                {
                    brand.ImagePath = Url.Content(brand.ImagePath);
                    return brand;
                }),
                Testimonials = await testimonialService.GetTestimonialsAsync(),
                Contacts = await contactsService.GetContactsAsync(),
                SocialLinks = (await contactsService.GetSocialLinksAsync()).Select(x =>
                    new SocialLink(x.Key, x.Value))
            };
        }
    }
}
