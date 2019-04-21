using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Moq;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Controllers.Api;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class AuthControllerTests
    {
        private Mock<IUserService> _mockUserService = new Mock<IUserService>();
        private Mock<UserManager<UserIdentity>> _mockUserManager = new Mock<UserManager<UserIdentity>>(
            Mock.Of<IUserStore<UserIdentity>>(), null, null, null, null, null, null, null, null);
        private Mock<SignInManager<UserIdentity>> _mockSignInManager;
        private AuthController _target;

        public AuthControllerTests()
        {
            _mockSignInManager = new Mock<SignInManager<UserIdentity>>(_mockUserManager.Object,
                Mock.Of<IHttpContextAccessor>(), 
                Mock.Of<IUserClaimsPrincipalFactory<UserIdentity>>(), null, null, null);
            _target = new AuthController(_mockUserService.Object, _mockSignInManager.Object);
            //SignInManager<UserIdentity> test = new SignInManager<UserIdentity>();
            //UserManager<UserIdentity> um = new UserManager<UserIdentity>();
        }

        /// TODO: Доделать тест. Нужна Microsoft.IdentityModel.Tokens 5.3.0.0
        [Fact]
        public async Task AccessTokenAsync_Good()
        {
            var testUser = new DomainUser(new UserIdentity("Test UserName", "Test Email"));
            _mockUserService.Setup(x => x.GetUserAsync("Test UserName")).ReturnsAsync(testUser);
            _mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(testUser.Identity as UserIdentity, "Test Password", false))
                .ReturnsAsync(SignInResult.Success);
            _mockUserManager.Setup(x => x.GetRolesAsync(It.IsAny<UserIdentity>())).ReturnsAsync(new string[] { "TestRole" });
            var testCredentials = new UserCredentials
            {
                UserName = "Test UserName",
                Password = "Test Password"
            };

            var actionResult = await _target.AccessTokenAsync(testCredentials);

            Assert.Null(actionResult.Result);
            Assert.IsType<string>(actionResult.Value);
            Assert.False(string.IsNullOrWhiteSpace(actionResult.Value as string));
        }

    }
}
