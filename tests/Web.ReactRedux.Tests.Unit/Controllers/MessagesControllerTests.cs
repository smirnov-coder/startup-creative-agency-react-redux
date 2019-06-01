using System;
using System.Collections.Generic;
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
    public class MessagesControllerTests
    {
        private Mock<IMessageService> _mockMessageService = new Mock<IMessageService>();
        private MessagesController _target;

        public MessagesControllerTests()
        {
            _target = new MessagesController(_mockMessageService.Object);
        }

        [Fact]
        public async Task GetMessageAsync_Good()
        {
            _mockMessageService.Setup(x => x.GetMessageAsync(101)).ReturnsAsync(new Message());

            var actionResult = await _target.GetMessageAsync(101);

            Assert.IsType<ActionResult<Message>>(actionResult);
            Assert.Null(actionResult.Result);
            Assert.NotNull(actionResult.Value);
        }

        [Fact]
        public async Task GetMessageAsync_Bad_NotFound()
        {
            _mockMessageService.Setup(x => x.GetMessageAsync(101)).ReturnsAsync(default(Message));

            var actionResult = await _target.GetMessageAsync(101);

            Assert.IsType<ActionResult<Message>>(actionResult);
            Assert.NotNull(actionResult.Result);
            Assert.IsType<NotFoundObjectResult>(actionResult.Result);
            Assert.Null(actionResult.Value);
            var result = actionResult.Result as NotFoundObjectResult;
            Assert.Equal(404, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal($"The entity of type '{typeof(Message)}' with key value '101' " +
                $"for 'Id' not found.", details.Message);
        }

        [Fact]
        public async Task SaveAsync_Good()
        {
            var testMessageModel = GetTestMessageModel();

            var actionResult = await _target.SaveAsync(testMessageModel);

            _mockMessageService.Verify(service => service.SaveMessageAsync(It.Is<Message>(x =>
                x.Id == 0 && 
                x.Name == testMessageModel.Name &&
                x.Company == testMessageModel.Company &&
                x.Email == testMessageModel.Email &&
                x.Subject == testMessageModel.Subject &&
                x.Text == testMessageModel.Text)));

            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal("Thank you for your message!", details.Message);
        }

        [Fact]
        public async Task SaveAsync_Bad_BadRequest()
        {
            _mockMessageService.Setup(x => x.SaveMessageAsync(It.IsAny<Message>())).ThrowsAsync(new Exception());
            var testMessageModel = GetTestMessageModel();

            var actionResult = await _target.SaveAsync(testMessageModel);
            
            Assert.IsType<BadRequestObjectResult>(actionResult);
            var result = actionResult as BadRequestObjectResult;
            Assert.Equal(400, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.True(details.IsError);
            Assert.Equal("Oops! We are sorry. Something went wrong on the server side. Try again later.", details.Message);
        }

        [Fact]
        public async Task UpdateReadStatusAsync_Good()
        {
            var testModel = new MessageReadStatusBindingModel
            {
                MessageIds = new int[3],
                IsRead = false
            };

            var actionResult = await _target.UpdateReadStatusAsync(testModel);

            _mockMessageService.Verify(x => x.UpdateMessageReadStatusAsync(It.IsAny<int>(), false), Times.Exactly(3));
            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"A set of entities of type '{typeof(Message)}' has been updated successfully.", 
                details.Message);
        }

        [Fact]
        public async Task DeleteAsync_Good()
        {
            var actionResult = await _target.DeleteAsync(new int[3]);

            _mockMessageService.Verify(x => x.DeleteMessageAsync(It.IsAny<int>()), Times.Exactly(3));
            Assert.IsType<OkObjectResult>(actionResult);
            var result = actionResult as OkObjectResult;
            Assert.Equal(200, result.StatusCode);
            Assert.IsType<OperationDetails>(result.Value);
            var details = result.Value as OperationDetails;
            Assert.False(details.IsError);
            Assert.Equal($"A set of entities of type '{typeof(Message)}' has been deleted successfully.",
                details.Message);
        }

        private MessageViewModel GetTestMessageModel() =>
            new MessageViewModel
            {
                Name = "Test Name",
                Company = "Test Company",
                Email = "Test Email",
                Subject = "Test Subject",
                Text = "Test Text"
            };
    }
}
