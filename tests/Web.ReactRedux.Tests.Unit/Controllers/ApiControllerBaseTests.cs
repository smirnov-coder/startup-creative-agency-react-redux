using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Moq;
using StartupCreativeAgency.Domain.Abstractions.Exceptions;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Controllers.Api;
using StartupCreativeAgency.Web.ReactRedux.Models;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Unit.Controllers
{
    public class ApiControllerBaseTests
    {
        private Mock<IUserService> _mockUserService = new Mock<IUserService>();
        private ApiControllerBaseUnderTest _target;

        public ApiControllerBaseTests()
        {
            _target = new ApiControllerBaseUnderTest(_mockUserService.Object);
        }

        [Fact]
        public async Task ListAsync_Good()
        {
            var result = await _target.ListAsync();

            Assert.IsAssignableFrom<IEnumerable<BaseEntity<int>>>(result);
            Assert.Equal(3, result.Count());
            Assert.Equal(101, result.First().Id);
            Assert.Equal(103, result.Last().Id);
        }

        [Fact]
        public async Task GetAsync_Good()
        {
            _target.IsFound = true;

            var actionResult = await _target.GetAsync(101);

            Assert.IsAssignableFrom<ActionResult<BaseEntity<int>>>(actionResult);
            Assert.Equal(101, actionResult.Value.Id);
        }

        [Fact]
        public async Task GetAsync_Bad_NotFound()
        {
            _target.IsFound = false;

            var actionResult = await _target.GetAsync(101);

            Assert.IsAssignableFrom<ActionResult<BaseEntity<int>>>(actionResult);
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            var result = actionResult.Result as NotFoundObjectResult;
            Assert.Equal(404, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal($"The entity of type '{typeof(BaseEntity<int>)}' with key value '101' " +
                $"for 'Id' not found.", details.Message);
        }

        [Fact]
        public async Task AddAsync_Good()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(default(DomainUser));

            var actionResult = await _target.AddAsync(new TestViewModel(101));

            Assert.IsAssignableFrom<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"The entity of type '{typeof(BaseEntity<int>)}' with key value '101' for " +
                $"'Id' saved successfully.", details.Message);
        }

        [Fact]
        public async Task UpdateAsync_Good()
        {
            _mockUserService.Setup(x => x.GetUserAsync(It.IsAny<string>())).ReturnsAsync(default(DomainUser));
            _target.IsFound = true;

            var actionResult = await _target.UpdateAsync(new TestViewModel(101));

            Assert.IsAssignableFrom<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"The entity of type '{typeof(BaseEntity<int>)}' with key value '101' for " +
                $"'Id' updated successfully.", details.Message);
        }

        [Fact]
        public async Task DeleteAsync_Good()
        {
            _target.IsFound = true;

            var actionResult = await _target.DeleteAsync(101);

            Assert.IsAssignableFrom<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"The entity of type '{typeof(BaseEntity<int>)}' with key value '101' for " +
                $"'Id' deleted successfully.", details.Message);
        }
    }

    class ApiControllerBaseUnderTest : ApiControllerBase<TestViewModel, BaseEntity<int>, int>
    {
        public bool IsFound { get; set; }

        public ApiControllerBaseUnderTest(IUserService userService) : base(userService) { }

        protected override Task<BaseEntity<int>> CreateEntityFromModelAsync(TestViewModel model, DomainUser creator)
        {
            return Task.FromResult(new BaseEntity<int>(model.Id));
        }

        protected override Task<BaseEntity<int>> PerformAddAsync(BaseEntity<int> entity)
        {
            return Task.FromResult(entity);
        }

        protected override Task PerformDeleteAsync(int entityId)
        {
            if (!IsFound)
                throw new EntityNotFoundException("test");
            return Task.CompletedTask;
        }

        protected override Task<BaseEntity<int>> PerformGetAsync(int id)
        {
            return Task.FromResult(IsFound ? new BaseEntity<int>(101) : null);
        }

        protected override Task<IEnumerable<BaseEntity<int>>> PerformGetManyAsync()
        {
            return Task.FromResult<IEnumerable<BaseEntity<int>>>(new List<BaseEntity<int>>
            {
                new BaseEntity<int>(101),
                new BaseEntity<int>(102),
                new BaseEntity<int>(103),
            });
        }

        protected override Task PerformUpdateAsync(BaseEntity<int> entity)
        {
            if (!IsFound)
                throw new EntityNotFoundException("test");
            return Task.CompletedTask;
        }
    }

    class TestViewModel
    {
        public int Id { get; set; }

        public TestViewModel() { }

        public TestViewModel(int id) => Id = id;
    }
}
