using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional.Controllers
{
    [Collection("Factories")]
    public class UsersControllerTests
    {
        private const string BASE_URL = "/api/users";
        private const string USER_NAME = "user1";
        private const string ADMIN_USER_NAME = "admin";
        private readonly CustomWebAppFactories _factoryCollection;

        public UsersControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetUsers()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync(BASE_URL))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<List<DomainUser>>(resultJson);
                    Assert.Equal(5, result.Count);
                    Assert.Equal("user1", result.First().Identity.UserName);
                    Assert.Equal("FirstName #1", result.First().Profile.FirstName);
                    Assert.Equal("LastName #1", result.First().Profile.LastName);
                    Assert.Equal("Job #1", result.First().Profile.JobPosition);
                    Assert.Equal("Path #1", result.First().Profile.PhotoFilePath);
                    Assert.True(result.First().Profile.IsReadyForDisplay);
                    Assert.True(result.First().Profile.DisplayAsTeamMember);
                    Assert.Equal(4, result.First().Profile.SocialLinks.Count);
                    Assert.Equal("Facebook", result.First().Profile.SocialLinks.First().NetworkName);
                    Assert.Equal("Link #1", result.First().Profile.SocialLinks.First().Url);
                    Assert.Equal("Linkedin", result.First().Profile.SocialLinks.Last().NetworkName);
                    Assert.Equal("Link #4", result.First().Profile.SocialLinks.Last().Url);
                    Assert.Equal("user5", result.Last().Identity.UserName);
                    Assert.Equal("FirstName #5", result.Last().Profile.FirstName);
                    Assert.Equal("LastName #5", result.Last().Profile.LastName);
                    Assert.Equal("Job #5", result.Last().Profile.JobPosition);
                    Assert.Equal("Path #5", result.Last().Profile.PhotoFilePath);
                    Assert.True(result.Last().Profile.IsReadyForDisplay);
                    Assert.True(result.Last().Profile.DisplayAsTeamMember);
                    Assert.Equal(4, result.Last().Profile.SocialLinks.Count);
                    Assert.Equal("Facebook", result.Last().Profile.SocialLinks.First().NetworkName);
                    Assert.Equal("Link #1", result.Last().Profile.SocialLinks.First().Url);
                    Assert.Equal("Linkedin", result.Last().Profile.SocialLinks.Last().NetworkName);
                    Assert.Equal("Link #4", result.Last().Profile.SocialLinks.Last().Url);
                }
            }
        }

        [Fact]
        public async Task CanGetUser()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync($"{BASE_URL}/user2"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<DomainUser>(resultJson);
                    Assert.Equal("user2", result.Identity.UserName);
                    Assert.Equal("FirstName #2", result.Profile.FirstName);
                    Assert.Equal("LastName #2", result.Profile.LastName);
                    Assert.Equal("Job #2", result.Profile.JobPosition);
                    Assert.Equal("Path #2", result.Profile.PhotoFilePath);
                    Assert.True(result.Profile.IsReadyForDisplay);
                    Assert.True(result.Profile.DisplayAsTeamMember);
                    Assert.Equal(4, result.Profile.SocialLinks.Count);
                    Assert.Equal("Facebook", result.Profile.SocialLinks.First().NetworkName);
                    Assert.Equal("Link #1", result.Profile.SocialLinks.First().Url);
                    Assert.Equal("Linkedin", result.Profile.SocialLinks.Last().NetworkName);
                    Assert.Equal("Link #4", result.Profile.SocialLinks.Last().Url);
                }
            }
        }

        [Fact]
        public async Task CanRegisterUser()
        {
            var factory = _factoryCollection.ForAdd;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(ADMIN_USER_NAME))
            {
                int expectedCount = 6;
                var model = new RegisterUserViewModel
                {
                    UserName = "test_user",
                    Password = "User123",
                    ConfirmPassword = "User123",
                    Email = "test@example.com",
                    Role = "User"
                };
                var json = JsonConvert.SerializeObject(model);
                using (var response = await httpClient.PostAsync(BASE_URL, new StringContent(json, Encoding.UTF8, "application/json")))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    string message = await response.Content.ReadAsStringAsync();
                    Assert.Equal($"User '@test_user' has been registered successfully.", message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserIdentity>>();
                            Assert.Equal(expectedCount, userManager.Users.Count());
                            Assert.NotNull(await userManager.FindByNameAsync("test_user"));
                            Assert.Equal(expectedCount, db.DomainUsers.Count());
                            Assert.NotNull(await db.DomainUsers.FirstOrDefaultAsync(x => x.Identity.UserName == "test_user"));
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CanUpdateUserProfile()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var model = new Dictionary<string, string>
                {
                    ["PersonalInfo.FirstName"] = "New FirstName",
                    ["PersonalInfo.LastName"] = "New LastName",
                    ["PersonalInfo.JobPosition"] = "New Job",
                    ["SocialLinks[0].NetworkName"] = "Facebook",
                    ["SocialLinks[0].Url"] = "New Link #1",
                    ["SocialLinks[1].NetworkName"] = "Twitter",
                    ["SocialLinks[1].Url"] = "New Link #2",
                    ["SocialLinks[2].NetworkName"] = "GooglePlus",
                    ["SocialLinks[2].Url"] = "New Link #3",
                    ["SocialLinks[3].NetworkName"] = "Linkedin",
                    ["SocialLinks[3].Url"] = "New Link #4",
                };
                using (var requestContent = TestHelper.CreateTestMultipartFormDataContent(model, "PersonalInfo.Image", "test-user-photo.jpg"))
                {
                    using (var response = await httpClient.PutAsync($"{BASE_URL}/{USER_NAME}/profile", requestContent))
                    {
                        Assert.True(response.IsSuccessStatusCode);
                        string message = await response.Content.ReadAsStringAsync();
                        Assert.Equal("Your profile has been updated successfully.", message);
                        using (var scope = factory.Server.Host.Services.CreateScope())
                        {
                            using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                            {
                                var result = await db.DomainUsers.FirstOrDefaultAsync(x => x.Identity.UserName == USER_NAME);
                                Assert.NotNull(result);
                                Assert.Equal("New FirstName", result.Profile.FirstName);
                                Assert.Equal("New LastName", result.Profile.LastName);
                                Assert.Equal("New Job", result.Profile.JobPosition);
                                string fileName = Path.GetFileNameWithoutExtension(result.Profile.PhotoFilePath);
                                Assert.StartsWith("userphoto-", fileName);
                                Assert.Equal($"~/images/{fileName}.jpg", result.Profile.PhotoFilePath);
                                Assert.Equal("New Link #1", result.Profile.SocialLinks[0].Url);
                                Assert.Equal("New Link #2", result.Profile.SocialLinks[1].Url);
                                Assert.Equal("New Link #3", result.Profile.SocialLinks[2].Url);
                                Assert.Equal("New Link #4", result.Profile.SocialLinks[3].Url);
                            }
                        }
                    }
                }

                
            }
        }

        [Fact]
        public async Task CanUpdateUserDisplayStatus()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(ADMIN_USER_NAME))
            {
                string requestUrl = $"{BASE_URL}/{USER_NAME}/displayStatus";
                using (var response = await httpClient.PutAsync(requestUrl, new StringContent("false")))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    string message = await response.Content.ReadAsStringAsync();
                    Assert.Equal("Display status for user '@user1' has been updated successfully.", message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserIdentity>>();
                        var modifiedUser = await db.DomainUsers.FirstOrDefaultAsync(x => x.Identity.UserName == USER_NAME);
                        Assert.NotNull(modifiedUser);
                        Assert.False(modifiedUser.Profile.DisplayAsTeamMember);
                    }
                }
            }
        }

        [Fact]
        public async Task CanDeleteUser()
        {
            var factory = _factoryCollection.ForDelete;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(ADMIN_USER_NAME))
            {
                int expectedCount = 4;
                var request = new HttpRequestMessage(HttpMethod.Delete, $"{BASE_URL}/{USER_NAME}");
                using (var response = await httpClient.SendAsync(request))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    string message = await response.Content.ReadAsStringAsync();
                    Assert.Equal($"The entity of type '{typeof(DomainUser)}' with value 'user1' for 'UserName' " +
                        $"deleted successfully.", message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            using (var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserIdentity>>())
                            {
                                Assert.Equal(expectedCount, userManager.Users.Count());
                                Assert.Equal(expectedCount, db.DomainUsers.Count());
                                Assert.DoesNotContain(userManager.Users, x => x.UserName == USER_NAME);
                            }
                        }
                    }
                }
            }
        }
    }
}
