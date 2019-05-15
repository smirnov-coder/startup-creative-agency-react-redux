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
        }

        //[Fact]
        //public async Task AccessTokenAsync_Good()
        //{
        //    var testUser = new DomainUser(new UserIdentity("Test UserName", "Test Email"));
        //    _mockUserService.Setup(x => x.GetUserAsync("Test UserName")).ReturnsAsync(testUser);
        //    _mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(testUser.Identity as UserIdentity, "Test Password", false))
        //        .ReturnsAsync(SignInResult.Success);
        //    _mockUserManager.Setup(x => x.GetRolesAsync(It.IsAny<UserIdentity>())).ReturnsAsync(new string[] { "TestRole" });

        //    var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

        //    Assert.IsType<OkObjectResult>(actionResult);
        //    var result = (actionResult as OkObjectResult).Value;
        //    Assert.IsType<{ string accessToken; }>(result);
        //    var details = result as OperationDetails;
        //    Assert.False(details.IsError);
        //    Assert.False(string.IsNullOrWhiteSpace(result.Value));
        //    Assert.True(JwtHelper.IsValid(result.Value));
        //}

        //[Fact]
        //public async Task AccessTokenAsync_Bad_NotFound()
        //{
        //    _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(default(DomainUser));

        //    var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

        //    Assert.IsType<NotFoundObjectResult>(actionResult.Result);
        //    var result = actionResult.Result as NotFoundObjectResult;
        //    Assert.Equal($"The entity of type '{typeof(DomainUser)}' with value 'Test UserName' " +
        //        $"for 'UserName' not found.", result.Value as string);
        //    Assert.True(string.IsNullOrWhiteSpace(actionResult.Value));
        //}

        //[Fact]
        //public async Task AccessTokenAsync_Bad_BadRequest()
        //{
        //    var testUser = new DomainUser(new UserIdentity("Test UserName", "Test Email"));
        //    _mockUserService.Setup(x => x.GetUserAsync("Test UserName")).ReturnsAsync(testUser);
        //    _mockSignInManager.Setup(x => x.CheckPasswordSignInAsync(testUser.Identity as UserIdentity, "Test Password", false))
        //        .ReturnsAsync(SignInResult.Failed);

        //    var actionResult = await _target.AccessTokenAsync(GetTestUserCredentials());

        //    Assert.IsType<BadRequestObjectResult>(actionResult.Result);
        //    var result = actionResult.Result as BadRequestObjectResult;
        //    Assert.Equal($"Unable to authenticate user with value 'Test UserName' for 'UserName'.", result.Value as string);
        //    Assert.True(string.IsNullOrWhiteSpace(actionResult.Value));
        //}

        private UserCredentials GetTestUserCredentials() =>
            new UserCredentials
            {
                UserName = "Test UserName",
                Password = "Test Password"
            };
    }
}
