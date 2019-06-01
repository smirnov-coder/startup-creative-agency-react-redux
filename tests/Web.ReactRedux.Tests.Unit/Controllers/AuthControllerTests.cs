using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Controllers.Api;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class AuthControllerTests
    {
        private Mock<IMessageService> _mockMessageService = new Mock<IMessageService>();
        private Mock<IUserService> _mockUserService = new Mock<IUserService>();
        private Mock<UserManager<UserIdentity>> _mockUserManager = new Mock<UserManager<UserIdentity>>(
            Mock.Of<IUserStore<UserIdentity>>(), null, null, null, null, null, null, null, null);
        private Mock<SignInManager<UserIdentity>> _mockSignInManager;
        private Mock<IUrlHelper> _mockUrlHelper = new Mock<IUrlHelper>();
        private Mock<RoleManager<IdentityRole>> _mockRoleManager = new Mock<RoleManager<IdentityRole>>(
            Mock.Of<IRoleStore<IdentityRole>>(), null, null, null, null);
        private AuthController _target;

        public AuthControllerTests()
        {
            _mockSignInManager = new Mock<SignInManager<UserIdentity>>(_mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(), 
                Mock.Of<IUserClaimsPrincipalFactory<UserIdentity>>(), null, null, null);
            _target = new AuthController(_mockUserService.Object, _mockSignInManager.Object, _mockMessageService.Object,
                _mockRoleManager.Object)
            {
                Url = _mockUrlHelper.Object
            };
        }

        [Fact]
        public async Task AccessTokenAsync_Good()
        {
            var testUser = new DomainUser(new UserIdentity("Test UserName", "Test Email"),
                new UserProfile(null, null, null, "Test Path"));

            _mockUserService.Setup(x => x.GetUserAsync("Test UserName")).ReturnsAsync(testUser);
            _mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(testUser.Identity as UserIdentity, "Test Password", false))
                .ReturnsAsync(SignInResult.Success);
            _mockUserManager.Setup(x => x.GetRolesAsync(It.IsAny<UserIdentity>())).ReturnsAsync(new string[] { "TestRole" });
            _mockUserManager.Setup(x => x.IsInRoleAsync(testUser.Identity as UserIdentity, "Administrator")).ReturnsAsync(false);
            _mockUrlHelper.Setup(x => x.Content("Test Path")).Returns("Test Path");

            var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

            Assert.IsType<ActionResult<AuthResult>>(actionResult);
            Assert.Null(actionResult.Result);
            var result = actionResult.Value;
            Assert.Equal("Test UserName", result.AppState.UserName);
            Assert.Equal("Test Path", result.AppState.Photo);
            Assert.True(result.AppState.IsAuthenticated);
            Assert.False(result.AppState.IsAdmin);
            Assert.Equal(0, result.AppState.NewMessagesCount);
            Assert.Null(result.AppState.Roles);
            Assert.True(JwtHelper.IsValid(result.AccessToken));
        }

        [Fact]
        public async Task AccessTokenAsync_Bad_NotFound()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(default(DomainUser));

            var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.Null(actionResult.Value);
            var result = actionResult.Result as NotFoundObjectResult;
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal($"The entity of type '{typeof(DomainUser)}' with value 'Test UserName' " +
                $"for 'UserName' not found.", details.Message);
        }

        [Fact]
        public async Task AccessTokenAsync_Bad_BadRequest()
        {
            var testUser = new DomainUser(new UserIdentity("Test UserName", "Test Email"));
            _mockUserService.Setup(x => x.GetUserAsync("Test UserName")).ReturnsAsync(testUser);
            _mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(testUser.Identity as UserIdentity, "Test Password", false))
                .ReturnsAsync(SignInResult.Failed);

            var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

            Assert.IsType<BadRequestObjectResult>(actionResult.Result);
            Assert.Null(actionResult.Value);
            var result = actionResult.Result as BadRequestObjectResult;
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal("Unable to authenticate user with value 'Test UserName' for 'UserName'.", details.Message);
        }

        private UserCredentials GetTestUserCredentials() =>
            new UserCredentials
            {
                UserName = "Test UserName",
                Password = "Test Password"
            };
    }
}
