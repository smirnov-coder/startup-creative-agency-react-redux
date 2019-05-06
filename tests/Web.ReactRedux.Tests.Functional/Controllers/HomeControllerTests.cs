using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional.Controllers
{
    [Collection("Factories")]
    public class HomeControllerTests
    {
        private readonly CustomWebAppFactories _factoryCollection;

        public HomeControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetHomePageModel()
        {
            using (var httpClient = _factoryCollection.ForRead.CreateClient())
            {
                using (var response = await httpClient.GetAsync("/model"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var pageModel = JsonConvert.DeserializeObject<IndexViewModel>(resultJson);
                    Assert.Equal(3, pageModel.Services.Count());
                    Assert.Equal(4, pageModel.TeamMembers.Count());
                    Assert.Equal(4, pageModel.TeamMembers.First().Profile.SocialLinks.Count);
                    Assert.Equal(9, pageModel.Works.Count());
                    Assert.Equal(2, pageModel.BlogPosts.Count());
                    Assert.NotNull(pageModel.BlogPosts.First().CreatedBy.Profile);
                    Assert.Equal(5, pageModel.Brands.Count());
                    Assert.Equal(3, pageModel.Testimonials.Count());
                    Assert.Equal(3, pageModel.Contacts.Count());
                    Assert.Equal(4, pageModel.SocialLinks.Count());
                }
            }
        }
    }
}
