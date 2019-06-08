using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Web.ReactRedux.Models;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional.Controllers
{
    [Collection("Factories")]
    public class ContactsControllerTests
    {
        private const string BASE_URL = "/api/contacts";
        private const string USER_NAME = "admin";
        private readonly CustomWebAppFactories _factoryCollection;

        public ContactsControllerTests(CustomWebAppFactories factoryCollection)
        {
            _factoryCollection = factoryCollection;
        }

        [Fact]
        public async Task CanGetContacts()
        {
            using (var httpClient = _factoryCollection.ForRead.CreateClient())
            {
                using (var response = await httpClient.GetAsync(BASE_URL))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    var resultJson = await response.Content.ReadAsStringAsync();
                    var result = JsonConvert.DeserializeObject<ContactsViewModel>(resultJson);
                    Assert.Equal(3, result.ContactInfos.Count());
                    Assert.Equal("Address", result.ContactInfos.First().Name);
                    Assert.Equal(3, result.ContactInfos.First().Values.Count);
                    Assert.Equal("Email", result.ContactInfos.Last().Name);
                    Assert.Equal(2, result.ContactInfos.Last().Values.Count);
                    Assert.Equal(4, result.SocialLinks.Count());
                    Assert.Equal("Facebook", result.SocialLinks.First().NetworkName);
                    Assert.Equal("Link #1", result.SocialLinks.First().Url);
                    Assert.Equal("Linkedin", result.SocialLinks.Last().NetworkName);
                    Assert.Equal("Link #4", result.SocialLinks.Last().Url);
                }
            }
        }

        [Fact]
        public async Task CanSaveContacts()
        {
            var factory = _factoryCollection.ForUpdate;
            using (var httpClient = await factory.CreateClientWithAccessTokenAsync(USER_NAME))
            {
                var model = new Dictionary<string, string>
                {
                    ["ContactInfos[0].Name"] = "New Name",
                    ["ContactInfos[0].Caption"] = "New Caption",
                    ["ContactInfos[0].Values[0].Value"] = "New Value",
                    ["SocialLinks[0].NetworkName"] = "New Network",
                    ["SocialLinks[0].Url"] = "New Url"
                };
                using (var response = await httpClient.PostAsync(BASE_URL, new FormUrlEncodedContent(model)))
                {
                    Assert.True(response.IsSuccessStatusCode);
                    Assert.Equal("application/json", response.Content.Headers.ContentType.MediaType);
                    string responseJson = await response.Content.ReadAsStringAsync();
                    var details = JsonConvert.DeserializeObject<OperationDetails>(responseJson);
                    Assert.False(details.IsError);
                    Assert.Equal("Company contacts saved successfully.", details.Message);
                    using (var scope = factory.Server.Host.Services.CreateScope())
                    {
                        var contactsService = scope.ServiceProvider.GetRequiredService<IContactsService>();
                        var contacts = await contactsService.GetContactsAsync();
                        Assert.Single(contacts);
                        Assert.Single(contacts.FirstOrDefault(x => x.Name == "New Name").Values);
                        Assert.Equal("New Value", contacts.FirstOrDefault(x => x.Name == "New Name").Values.First());
                        var socialLinks = await contactsService.GetSocialLinksAsync();
                        Assert.Single(socialLinks);
                        Assert.Equal("New Url", socialLinks["New Network"]);
                    }
                }
            }
        }
    }
}
