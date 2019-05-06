using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional.Controllers
{
    [Collection("Factories")]
    public class AuthControllerTests
    {
        private readonly CustomWebAppFactories _factoryCollection;

        public AuthControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetAccessToken()
        {
            using (var httpClient = _factoryCollection.ForRead.CreateClient())
            {
                var testCredentials = new UserCredentials
                {
                    UserName = "user1",
                    Password = "User123"
                };
                string json = JsonConvert.SerializeObject(testCredentials);
                var requestContent = new StringContent(json, Encoding.UTF8, "application/json");
                using (var response = await httpClient.PostAsync("/api/auth/token", requestContent))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("text/plain", response.Content.Headers.ContentType.MediaType);
                    var result = await response.Content.ReadAsStringAsync();
                    Assert.False(string.IsNullOrWhiteSpace(result));
                    Assert.True(JwtHelper.IsValid(result));
                }
            }
        }
    }
}
