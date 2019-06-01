using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional.Controllers
{
    //
    // С помощью BlogController'a протестируем общую логику для следующих API-контроллеров:
    //  - BlogController
    //  - BrandsController
    //  - ServicesController
    //  - TestimonialsController
    //  - WorksController
    //
    [Collection("Factories")]
    public class BlogControllerTests
    {
        private const string BASE_URL = "/api/blog";
        private const string USER_NAME = "user1";
        private readonly CustomWebAppFactories _factoryCollection;

        public BlogControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetBlogPost()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync($"{BASE_URL}/1"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var blogPost = JsonConvert.DeserializeObject<BlogPost>(resultJson);
                    Assert.NotNull(blogPost);
                    Assert.Equal(1, blogPost.Id);
                    Assert.Equal("Title #1", blogPost.Title);
                    Assert.Equal("Path #1", blogPost.ImagePath);
                    Assert.Equal("Category #1", blogPost.Category);
                    Assert.Equal("Content #1", blogPost.Content);
                }
            }
        }

        [Fact]
        public async Task CanGetPublicBlogPosts()
        {
            using (var httpClient = _factoryCollection.ForRead.CreateClient())
            {
                using (var response = await httpClient.GetAsync($"{BASE_URL}/public?skip=1&take=3"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<List<BlogPost>>(resultJson);
                    Assert.Equal(3, result.Count);
                    // Блог посты отсортированы по убыванию даты добавления.
                    Assert.Equal(3, result.First().Id);
                    Assert.Equal("Title #3", result.First().Title);
                    Assert.Equal("Path #3", result.First().ImagePath);
                    Assert.Equal("Category #3", result.First().Category);
                    Assert.Equal("Content #3", result.First().Content);
                    Assert.Equal(1, result.Last().Id);
                    Assert.Equal("Title #1", result.Last().Title);
                    Assert.Equal("Path #1", result.Last().ImagePath);
                    Assert.Equal("Category #1", result.Last().Category);
                    Assert.Equal("Content #1", result.Last().Content);
                }
            }
        }

        [Fact]
        public async Task CanAddBlogPost()
        {
            var factory = _factoryCollection.ForAdd;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                int expectedCount = 5;
                var model = new Dictionary<string, string>
                {
                    ["Id"] = "0",
                    ["Title"] = "Test Title",
                    ["Category"] = "Test Category",
                    ["Content"] = "Test Content",
                    ["ImagePath"] = string.Empty
                };
                using (var requestContent = TestHelper.CreateTestMultipartFormDataContent(model, "Image", "test-blog-item.jpg"))
                {
                    using (var response = await httpClient.PostAsync(BASE_URL, requestContent))
                    {
                        Assert.True(response.IsSuccessStatusCode);
                        using (var scope = factory.Server.Host.Services.CreateScope())
                        {
                            using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                            {
                                Assert.Equal(expectedCount, db.BlogPosts.Count());
                                var blogPost = await db.BlogPosts.LastOrDefaultAsync();
                                Assert.NotNull(blogPost);
                                Assert.NotEqual(0, blogPost.Id);
                                Assert.Equal("Test Title", blogPost.Title);
                                Assert.Equal("Test Category", blogPost.Category);
                                Assert.Equal("Test Content", blogPost.Content);
                                string fileName = Path.GetFileNameWithoutExtension(blogPost.ImagePath);
                                Assert.StartsWith("blogpost-", fileName);
                                Assert.Equal($"~/images/{fileName}.jpg", blogPost.ImagePath);
                            }
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CanUpdateBlogPost()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                int expectedCount = 4,
                    id = 1;
                var model = new Dictionary<string, string>
                {
                    ["Id"] = id.ToString(),
                    ["Title"] = "New Title",
                    ["Category"] = "New Category",
                    ["Content"] = "New Content",
                    ["ImagePath"] = "Old Path"
                };
                using (var response = await httpClient.PutAsync(BASE_URL, new FormUrlEncodedContent(model)))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            Assert.Equal(expectedCount, db.BlogPosts.Count());
                            var blogPost = await db.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
                            Assert.NotNull(blogPost);
                            Assert.Equal("New Title", blogPost.Title);
                            Assert.Equal("New Category", blogPost.Category);
                            Assert.Equal("New Content", blogPost.Content);
                            Assert.Equal("Old Path", blogPost.ImagePath);
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CanDeleteBlogPost()
        {
            var factory = _factoryCollection.ForDelete;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                int expectedCount = 3,
                    id = 1;
                using (var response = await httpClient.DeleteAsync($"{BASE_URL}/{id}"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            Assert.Equal(expectedCount, db.BlogPosts.Count());
                            var blogPost = await db.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
                            Assert.Null(blogPost);
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CannotAddBlogPostWithDuplicateId()
        {
            var factory = _factoryCollection.ForAdd;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var model = new Dictionary<string, string>
                {
                    ["Id"] = "1",
                    ["Title"] = "Test Title",
                    ["Category"] = "Test Category",
                    ["Content"] = "Test Content",
                    ["ImagePath"] = string.Empty
                };
                using (var requestContent = TestHelper.CreateTestMultipartFormDataContent(model, "Image", "test-blog-item.jpg"))
                {
                    using (var response = await httpClient.PostAsync(BASE_URL, requestContent))
                    {
                        Assert.False(response.IsSuccessStatusCode);
                        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                        Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                        string responseJson = await response.Content.ReadAsStringAsync();
                        var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                        Assert.True(details.IsError);
                        Assert.Equal($"The entity of type '{typeof(BlogPost)}' with key value '1' for 'Id' is already exists. " +
                            $"If you want to update it, use 'Update' method", details.Message);
                    }
                }
            }
        }

        [Fact]
        public async Task CannotUpdateNotExistingBlogPost()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var model = new Dictionary<string, string>
                {
                    ["Id"] = "101",
                    ["Title"] = "New Title",
                    ["Category"] = "New Category",
                    ["Content"] = "New Content",
                    ["ImagePath"] = "Old Path"
                };
                using (var response = await httpClient.PutAsync(BASE_URL, new FormUrlEncodedContent(model)))
                {
                    Assert.False(response.IsSuccessStatusCode);
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.True(details.IsError);
                    Assert.Equal($"The entity of type '{typeof(BlogPost)}' with key value '101' for 'Id' " +
                        $"that you trying to update doesn't exist. To add new entity, use 'Add' method.", details.Message);
                }
            }
        }

        [Fact]
        public async Task CannotDeleteNotExistingBlogPost()
        {
            var factory = _factoryCollection.ForDelete;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                int id = 101;
                using (var response = await httpClient.DeleteAsync($"{BASE_URL}/{id}"))
                {
                    Assert.False(response.IsSuccessStatusCode);
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.True(details.IsError);
                    Assert.Equal($"The entity type '{typeof(BlogPost)}' with key value '101' for 'Id' not found.", 
                        details.Message);
                }
            }
        }

        [Fact]
        public async Task CannotAddBlogPostWithInvalidData()
        {
            var factory = _factoryCollection.ForAdd;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var model = new Dictionary<string, string>
                {
                    ["Id"] = "0",
                    ["Title"] = string.Empty,
                    ["Category"] = null,
                    ["Content"] = "Test Content",
                    ["ImagePath"] = string.Empty
                };
                using (var requestContent = TestHelper.CreateTestMultipartFormDataContent(model, "Image", "test-blog-item.jpg"))
                {
                    using (var response = await httpClient.PostAsync(BASE_URL, requestContent))
                    {
                        Assert.False(response.IsSuccessStatusCode);
                        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
                        var resultJson = await response.Content.ReadAsStringAsync();
                        var result = JsonConvert.DeserializeObject<ValidationProblemDetails>(resultJson);
                        Assert.Equal("One or more validation errors occurred.", result.Title);
                        Assert.Equal(2, result.Errors.Count);
                        Assert.Equal("The Title field is required.", result.Errors["Title"].First());
                        Assert.Equal("The Category field is required.", result.Errors["Category"].First());
                        Assert.False(string.IsNullOrWhiteSpace(result.Extensions["traceId"].ToString()));
                    }
                }
            }
        }
    }
}
