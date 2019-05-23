using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
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
    public class MessagesControllerTests
    {
        private const string BASE_URL = "/api/messages";
        private const string USER_NAME = "admin";
        private readonly CustomWebAppFactories _factoryCollection;

        public MessagesControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetMessages()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync(BASE_URL))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<List<Message>>(resultJson);
                    Assert.Equal(3, result.Count);
                    Assert.Equal("Name #1", result.First().Name);
                    Assert.Equal("Email #1", result.First().Email);
                    Assert.Equal("Company #1", result.First().Company);
                    Assert.Equal("Subject #1", result.First().Subject);
                    Assert.Equal("Text #1", result.First().Text);
                    Assert.Equal("127.0.0.1", result.First().IPAddress);
                    Assert.True(result.First().IsRead);
                    Assert.Equal("Name #3", result.Last().Name);
                    Assert.Equal("Email #3", result.Last().Email);
                    Assert.Equal("Company #3", result.Last().Company);
                    Assert.Equal("Subject #3", result.Last().Subject);
                    Assert.Equal("Text #3", result.Last().Text);
                    Assert.Equal("127.0.0.1", result.Last().IPAddress);
                    Assert.False(result.Last().IsRead);
                }
            }
        }

        [Fact]
        public async Task CanGetMessage()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync($"{BASE_URL}/1"))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<Message>(resultJson);
                    Assert.Equal("Name #1", result.Name);
                    Assert.Equal("Email #1", result.Email);
                    Assert.Equal("Company #1", result.Company);
                    Assert.Equal("Subject #1", result.Subject);
                    Assert.Equal("Text #1", result.Text);
                    Assert.Equal("127.0.0.1", result.IPAddress);
                    Assert.True(result.IsRead);
                }
            }
        }

        [Fact]
        public async Task CannotGetNotExistingMessage()
        {
            using (var httpClient = await _factoryCollection.ForRead.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                using (var response = await httpClient.GetAsync($"{BASE_URL}/101"))
                {
                    Assert.False(response.IsSuccessStatusCode);
                    Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.True(details.IsError);
                    Assert.Equal($"The entity of type '{typeof(Message)}' with key value '101' for 'Id' not found.", details.Message);
                }
            }
        }

        [Fact]
        public async Task CanSaveMessage()
        {
            var factory = _factoryCollection.ForAdd;
            using (var httpClient = factory.CreateClient())
            {
                int expectedCount = 4;
                var model = new MessageViewModel
                {
                    Name = "Test Name",
                    Email = "test@example.com",
                    Company = "Test Company",
                    Subject = "Test Subject",
                    Text = "Test Text"
                };
                var json = JsonConvert.SerializeObject(model);
                using (var response = await httpClient.PostAsync(BASE_URL, new StringContent(json, Encoding.UTF8, "application/json")))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.False(details.IsError);
                    Assert.Equal("Thank you for your message!", details.Message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            Assert.Equal(expectedCount, db.Messages.Count());
                            var addedMessage = await db.Messages.LastOrDefaultAsync();
                            Assert.NotNull(addedMessage);
                            Assert.Equal("Test Name", addedMessage.Name);
                            Assert.Equal("test@example.com", addedMessage.Email);
                            Assert.Equal("Test Company", addedMessage.Company);
                            Assert.Equal("Test Subject", addedMessage.Subject);
                            Assert.Equal("Test Text", addedMessage.Text);
                            //Assert.False(string.IsNullOrWhiteSpace(addedMessage.IPAddress));
                            Assert.False(addedMessage.IsRead);
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CanUpdateMessagesReadStatus()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                int expectedCount = 3;
                var model = new Dictionary<string, string>
                {
                    ["ids[0]"] = "1",
                    ["ids[1]"] = "2",
                    ["isRead"] = "false"
                };
                using (var response = await httpClient.PutAsync(BASE_URL, new FormUrlEncodedContent(model)))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.False(details.IsError);
                    Assert.Equal($"A set of entities of type '{typeof(Message)}' has been updated successfully.", details.Message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            Assert.Equal(expectedCount, db.Messages.Where(x => x.IsRead == false).Count());
                        }
                    }
                }
            }
        }

        [Fact]
        public async Task CanDeleteMessages()
        {
            var factory = _factoryCollection.ForDelete;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var messageIdsToDelete = new int[] { 1, 2 };
                var json = JsonConvert.SerializeObject(messageIdsToDelete);
                var request = new HttpRequestMessage(HttpMethod.Delete, BASE_URL)
                {
                    Content = new StringContent(json, Encoding.UTF8, "application/json")
                };
                using (var response = await httpClient.SendAsync(request))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.False(details.IsError);
                    Assert.Equal($"A set of entities of type '{typeof(Message)}' has been deleted successfully.", details.Message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        using (var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
                        {
                            Assert.Single(db.Messages);
                        }
                    }
                }
            }
        }
    }
}
