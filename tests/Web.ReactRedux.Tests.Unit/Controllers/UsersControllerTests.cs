using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Controllers.Api;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class UsersControllerTests
    {
        private Mock<IUserService> _mockUserService = new Mock<IUserService>();
        private Mock<IFileService> _mockFileService = new Mock<IFileService>();
        private Mock<IUrlHelper> _mockUrlHelper = new Mock<IUrlHelper>();
        private UsersController _target;

        public UsersControllerTests()
        {
            _target = new UsersController(_mockUserService.Object, _mockFileService.Object)
            {
                Url = _mockUrlHelper.Object
            };
        }

        [Fact]
        public async Task GetUserAsync_Good()
        {
            var testUser = GetTestUserCollection().First();
            _mockUserService.Setup(x => x.GetUserAsync("UserName #1")).ReturnsAsync(testUser);
            _mockUrlHelper.Setup(x => x.Content(It.IsAny<string>())).Returns("Test Path");

            var actionResult = await _target.GetUserAsync("UserName #1");

            Assert.IsType<ActionResult<DomainUser>>(actionResult);
            Assert.Null(actionResult.Result);
            Assert.Same(testUser, actionResult.Value);
        }

        [Fact]
        public async Task GetUserAsync_Bad_NotFound()
        {
            _mockUserService.Setup(x => x.GetUserAsync("UserName #1")).ReturnsAsync(default(DomainUser));

            var actionResult = await _target.GetUserAsync("UserName #1");

            Assert.IsType<ActionResult<DomainUser>>(actionResult);
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.Null(actionResult.Value);
            var result = actionResult.Result as NotFoundObjectResult;
            Assert.Equal(404, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal($"The entity of type '{typeof(DomainUser)}' with value 'UserName #1' " +
                $"for 'UserName' not found.", details.Message);
        }

        [Fact]
        public async Task RegisterAsync_Good()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(default(DomainUser));

            var actionResult = await _target.RegisterAsync(GetTestRegisterModel());

            _mockUserService.Verify(service => service.CreateUserAsync("Test UserName", "Test Password",
                "Test Email", "Test Role", null));
            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal("User '@Test UserName' has been registered successfully.", details.Message);
        }

        [Fact]
        public async Task RegisterAsync_Bad_BadRequest()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(new DomainUser(new UserIdentity()));

            var actionResult = await _target.RegisterAsync(GetTestRegisterModel());

            Assert.IsType<BadRequestObjectResult>(actionResult);
            var result = actionResult as BadRequestObjectResult;
            Assert.Equal(400, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal("User '@Test UserName' already exists.", details.Message);
        }

        [Fact]
        public async Task UpdateProfileAsync_Good()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>()))
                .ReturnsAsync(new DomainUser(new UserIdentity("Test UserName", "Test Email")));

            var actionResult = await _target.UpdateProfileAsync(null, GetTestProfileModel());

            _mockUserService.Verify(x => x.UpdateUserPersonalInfoAsync("Test UserName", "Test FirstName",
                "Test LastName", "Test Job", "Test Path"), Times.Once());

            _mockUserService.Verify(service => service.UpdateUserSocialLinksAsync("Test UserName", It.Is<SocialLink[]>(x => 
                x.Count() == 3 && 
                x.First().NetworkName == "Name #1" && 
                x.Last().NetworkName == "Name #3")), Times.Once());

            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal("Your profile has been updated successfully.", details.Message);
        }

        [Fact]
        public async Task UpdateProfileAsync_Bad_BadRequest()
        {
            var actionResult = await _target.UpdateProfileAsync("Test UserName", GetTestProfileModel());

            Assert.IsType<BadRequestObjectResult>(actionResult);
            var result = actionResult as BadRequestObjectResult;
            Assert.Equal(400, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal("User name mismatch.", details.Message);
        }

        [Fact]
        public async Task UpdateDisplayStatusAsync_Good()
        {
            var actionResult = await _target.UpdateDisplayStatusAsync("Test UserName", true);

            _mockUserService.Verify(x => x.UpdateUserDisplayStatusAsync("Test UserName", true), Times.Once());
            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal("Display status for user '@Test UserName' has been updated successfully.", details.Message);
        }

        [Fact]
        public async Task DeleteAsync_Good()
        {
            var actionResult = await _target.DeleteAsync("Test UserName");

            _mockUserService.Verify(x => x.DeleteUserAsync("Test UserName"), Times.Once());
            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"The entity of type '{typeof(DomainUser)}' with value 'Test UserName' for " +
                $"'UserName' deleted successfully.", details.Message);
        }

        private MyProfileBindingModel GetTestProfileModel() =>
            new MyProfileBindingModel
            {
                PersonalInfo = new PersonalInfoViewModel
                {
                    FirstName = "Test FirstName",
                    LastName = "Test LastName",
                    JobPosition = "Test Job",
                    PhotoFilePath = "Test Path"
                },
                SocialLinks = new List<SocialLinkViewModel>
                {
                    new SocialLinkViewModel { NetworkName = "Name #1", Url = "Url #1" },
                    new SocialLinkViewModel { NetworkName = "Name #2", Url = "Url #2" },
                    new SocialLinkViewModel { NetworkName = "Name #3", Url = "Url #3" }
                }
            };

        private RegisterUserViewModel GetTestRegisterModel() =>
            new RegisterUserViewModel
            {
                UserName = "Test UserName",
                Email = "Test Email",
                Password = "Test Password",
                ConfirmPassword = "Test Password",
                Role = "Test Role"
            };

        private IList<DomainUser> GetTestUserCollection() =>
            new List<DomainUser>
            {
                new DomainUser(new UserIdentity("UserName #1", "Email #1"), new UserProfile("FirstName #1", "LastName #1",
                    "Job #1", "Path #1", new SocialLink("Name #1", "Url #1"))),
                new DomainUser(new UserIdentity("UserName #2", "Email #2"), new UserProfile("FirstName #2", "LastName #2",
                    "Job #2", "Path #2", new SocialLink("Name #1", "Url #1"))),
                new DomainUser(new UserIdentity("UserName #3", "Email #3"), new UserProfile("FirstName #3", "LastName #3",
                    "Job #3", "Path #3", new SocialLink("Name #1", "Url #1")))
            };
    }
}
