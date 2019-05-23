using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Controllers.Api;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class ContactsControllerTests
    {
        private Mock<IContactsService> _mockContactsService = new Mock<IContactsService>();
        private ContactsController _target;

        public ContactsControllerTests()
        {
            _target = new ContactsController(_mockContactsService.Object);
        }

        [Fact]
        public async Task GetAsync_Good()
        {
            _mockContactsService.Setup(x => x.GetContactsAsync()).ReturnsAsync(GetTestContactCollection());
            _mockContactsService.Setup(x => x.GetSocialLinksAsync()).ReturnsAsync(GetTestSocialLinkCollection());

            var result = await _target.GetAsync();

            Assert.IsType<ContactsViewModel>(result);
            var contacts = result.Contacts;
            Assert.Equal(3, contacts.Count);
            Assert.Equal("Name #1", contacts.First().Name);
            Assert.Equal("Caption #1", contacts.First().Caption);
            Assert.Equal(3, contacts.First().Values.Count);
            Assert.Equal("Value #1", contacts.First().Values.First().Value);
            Assert.Equal("Value #3", contacts.First().Values.Last().Value);
            Assert.Equal("Name #3", contacts.Last().Name);
            Assert.Equal("Caption #3", contacts.Last().Caption);
            Assert.Equal(2, contacts.Last().Values.Count);
            Assert.Equal("Value #1", contacts.Last().Values.First().Value);
            Assert.Equal("Value #2", contacts.Last().Values.Last().Value);
            var socialLinks = result.SocialLinks;
            Assert.Equal(3, socialLinks.Count);
            Assert.Equal("Name #1", socialLinks.First().NetworkName);
            Assert.Equal("Url #1", socialLinks.First().Url);
            Assert.Equal("Name #3", socialLinks.Last().NetworkName);
            Assert.Equal("Url #3", socialLinks.Last().Url);
        }

        [Fact]
        public async Task SaveAsync_Good()
        {
            var actionResult = await _target.SaveAsync(GetTestContactsViewModel());

            _mockContactsService.Verify(service => service.SaveContactsAsync(It.Is<IEnumerable<ContactInfo>>(x => 
                x.Count() == 3 &&
                x.First().Name == "Name #1" &&
                x.Last().Name == "Name #3")), Times.Once());

            _mockContactsService.Verify(service => service.SaveSocialLinksAsync(It.Is<IDictionary<string, string>>(x => 
                x.Count == 3 &&
                x["Name #1"] == "Url #1" &&
                x["Name #3"] == "Url #3")), Times.Once());

            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal("Company contacts saved successfully.", details.Message);
        }

        private ContactsViewModel GetTestContactsViewModel()
        {
            return new ContactsViewModel
            {
                Contacts = new List<ContactInfoViewModel>
                {
                    new ContactInfoViewModel
                    {
                        Name = "Name #1",
                        Caption = "Caption #1",
                        Values = new ContactValue[]
                        {
                            new ContactValue { Value = "Value #1" },
                            new ContactValue { Value = "Value #2" },
                            new ContactValue { Value = "Value #3" }
                        }
                    },
                    new ContactInfoViewModel
                    {
                        Name = "Name #2",
                        Caption = "Caption #2",
                        Values = new ContactValue[]
                        {
                            new ContactValue { Value = "Value #1" },
                            new ContactValue { Value = "Value #2" },
                            new ContactValue { Value = "Value #3" }
                        }
                    },
                    new ContactInfoViewModel
                    {
                        Name = "Name #3",
                        Caption = "Caption #3",
                        Values = new ContactValue[]
                        {
                            new ContactValue { Value = "Value #1" },
                            new ContactValue { Value = "Value #2" }
                        }
                    }
                },
                SocialLinks = new List<SocialLinkViewModel>
                {
                    new SocialLinkViewModel { NetworkName = "Name #1", Url = "Url #1" },
                    new SocialLinkViewModel { NetworkName = "Name #2", Url = "Url #2" },
                    new SocialLinkViewModel { NetworkName = "Name #3", Url = "Url #3" }
                }
            };
        }

        private IList<ContactInfo> GetTestContactCollection()
        {
            return new List<ContactInfo>
            {
                new ContactInfo("Name #1")
                {
                    Caption = "Caption #1",
                    Values = new string[] { "Value #1", "Value #2", "Value #3", }
                },
                new ContactInfo("Name #2")
                {
                    Caption = "Caption #2",
                    Values = new string[] { "Value #1", "Value #2", "Value #3", }
                },
                new ContactInfo("Name #3")
                {
                    Caption = "Caption #3",
                    Values = new string[] { "Value #1", "Value #2" }
                }
            };
        }

        private IDictionary<string, string> GetTestSocialLinkCollection()
        {
            return new Dictionary<string, string>
            {
                ["Name #1"] = "Url #1",
                ["Name #2"] = "Url #2",
                ["Name #3"] = "Url #3"
            };
        }
    }
}
