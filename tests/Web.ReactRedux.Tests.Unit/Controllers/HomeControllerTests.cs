using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Controllers;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class HomeControllerTests
    {
        private Mock<IServiceInfoService> _mockServiceInfoService = new Mock<IServiceInfoService>();
        private Mock<IUserService> _mockUserService = new Mock<IUserService>();
        private Mock<IWorkExampleService> _mockWorkExampleService = new Mock<IWorkExampleService>();
        private Mock<IBlogService> _mockBlogService = new Mock<IBlogService>();
        private Mock<IBrandService> _mockBrandService = new Mock<IBrandService>();
        private Mock<ITestimonialService> _mockTestimonialService = new Mock<ITestimonialService>();
        private Mock<IContactsService> _mockContactsService = new Mock<IContactsService>();
        private Mock<IMessageService> _mockMessageService = new Mock<IMessageService>();
        private Mock<HttpContext> _mockHttpContext = new Mock<HttpContext>();
        private Mock<ClaimsPrincipal> _mockClaimsPrincipal = new Mock<ClaimsPrincipal>();
        private Mock<IIdentity> _mockIdentity = new Mock<IIdentity>();
        private Mock<IUrlHelper> _mockUrlHelper = new Mock<IUrlHelper>();
        private Mock<DomainUser> _mockDomainUser = new Mock<DomainUser>();
        private Mock<IUserIdentity> _mockUserIdentity = new Mock<IUserIdentity>();
        private Mock<UserProfile> _mockUserProfile = new Mock<UserProfile>();
        private Mock<IQueryableRoleStore<IdentityRole>> _mockRoleStore = new Mock<IQueryableRoleStore<IdentityRole>>();
        private Mock<RoleManager<IdentityRole>> _mockRoleManager;
        private HomeController _target;

        public HomeControllerTests()
        {
            _mockRoleManager = new Mock<RoleManager<IdentityRole>>(_mockRoleStore.Object, null, null, null, null);
            _target = new HomeController(
                _mockServiceInfoService.Object,
                _mockUserService.Object,
                _mockWorkExampleService.Object,
                _mockBlogService.Object,
                _mockBrandService.Object,
                _mockTestimonialService.Object,
                _mockContactsService.Object,
                _mockMessageService.Object,
                _mockRoleManager.Object)
            {
                // Из-за невозможности "замокать" ControllerContext (свойство HttpContext не является виртуальным) 
                // приходится использовать реальный объект, что превращает тесты из модульных в интеграционные. :(
                ControllerContext = new ControllerContext()
                {
                    HttpContext = _mockHttpContext.Object
                },
                Url = _mockUrlHelper.Object
            };
        }

        [Fact]
        public async Task AppStateAsync_Good_AdminUser()
        {
            string testUserName = "Test UserName";
            string testPath = "Test Path";

            _mockIdentity.Setup(x => x.IsAuthenticated).Returns(true);
            _mockIdentity.Setup(x => x.Name).Returns(testUserName);
            _mockClaimsPrincipal.Setup(x => x.Identity).Returns(_mockIdentity.Object);
            _mockClaimsPrincipal.Setup(x => x.IsInRole("Administrator")).Returns(true);
            _mockUrlHelper.Setup(x => x.Content(It.IsAny<string>())).Returns(testPath);
            _mockHttpContext.Setup(x => x.User).Returns(_mockClaimsPrincipal.Object);

            _mockUserIdentity.Setup(x => x.UserName).Returns(testUserName);
            _mockUserProfile.Setup(x => x.PhotoFilePath).Returns(testPath);
            _mockDomainUser.Setup(x => x.Identity).Returns(_mockUserIdentity.Object);
            _mockDomainUser.Setup(x => x.Profile).Returns(_mockUserProfile.Object);

            _mockUserService.Setup(x => x.GetUserAsync(testUserName)).ReturnsAsync(_mockDomainUser.Object);
            _mockMessageService.Setup(x => x.GetMessagesAsync()).ReturnsAsync(new Message[] 
            {
                new Message() { IsRead = false },
                new Message() { IsRead = true },
                new Message() { IsRead = false }
            });

            var testRoles = new List<IdentityRole> {
                new IdentityRole("Role1"),
                new IdentityRole("Role2")
            }.AsQueryable();
            var mockSet = new Mock<DbSet<IdentityRole>>();
            mockSet.As<IQueryable<IdentityRole>>().Setup(m => m.Provider).Returns(testRoles.Provider);
            mockSet.As<IQueryable<IdentityRole>>().Setup(m => m.Expression).Returns(testRoles.Expression);
            mockSet.As<IQueryable<IdentityRole>>().Setup(m => m.GetEnumerator()).Returns(testRoles.GetEnumerator());
            _mockRoleManager.Setup(x => x.Roles).Returns(mockSet.Object);

            var result = await _target.AppStateAsync();

            Assert.Equal(testUserName, result.UserName);
            Assert.Equal(testPath, result.Photo);
            Assert.True(result.IsAuthenticated);
            Assert.True(result.IsAdmin);
            Assert.Equal(2, result.NewMessagesCount);
            Assert.Equal(2, result.Roles.Count());
            Assert.Equal("Role1", result.Roles.First());
            Assert.Equal("Role2", result.Roles.Last());
        }

        [Fact]
        public async Task AppStateAsync_Good_RegularUser()
        {
            string testUserName = "Test UserName";
            string testPath = "Test Path";

            _mockIdentity.Setup(x => x.IsAuthenticated).Returns(true);
            _mockIdentity.Setup(x => x.Name).Returns(testUserName);
            _mockClaimsPrincipal.Setup(x => x.Identity).Returns(_mockIdentity.Object);
            _mockClaimsPrincipal.Setup(x => x.IsInRole("Administrator")).Returns(false);
            _mockUrlHelper.Setup(x => x.Content(It.IsAny<string>())).Returns(testPath);
            _mockHttpContext.Setup(x => x.User).Returns(_mockClaimsPrincipal.Object);

            _mockUserIdentity.Setup(x => x.UserName).Returns(testUserName);
            _mockUserProfile.Setup(x => x.PhotoFilePath).Returns(testPath);
            _mockDomainUser.Setup(x => x.Identity).Returns(_mockUserIdentity.Object);
            _mockDomainUser.Setup(x => x.Profile).Returns(_mockUserProfile.Object);

            _mockUserService.Setup(x => x.GetUserAsync(testUserName)).ReturnsAsync(_mockDomainUser.Object);

            var result = await _target.AppStateAsync();

            Assert.Equal(testUserName, result.UserName);
            Assert.Equal(testPath, result.Photo);
            Assert.True(result.IsAuthenticated);
            Assert.False(result.IsAdmin);
            Assert.Equal(0, result.NewMessagesCount);
            Assert.Null(result.Roles);
        }

        [Fact]
        public async Task AppStateAsync_Good_AnonymousUser()
        {
            _mockHttpContext.Setup(x => x.User).Returns(default(ClaimsPrincipal));

            var result = await _target.AppStateAsync();

            Assert.True(string.IsNullOrWhiteSpace(result.UserName));
            Assert.True(string.IsNullOrWhiteSpace(result.Photo));
            Assert.False(result.IsAuthenticated);
            Assert.False(result.IsAdmin);
            Assert.Equal(0, result.NewMessagesCount);
            Assert.Null(result.Roles);
        }
    }
}
