using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "AdminPolicy")]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageService _messageService;

        public MessagesController(IMessageService messageService) => _messageService = messageService;

        //
        // GET api/messages
        //
        [HttpGet]
        public async Task<IEnumerable<Message>> GetMessagesAsync() => await _messageService.GetMessagesAsync();

        //
        // GET api/messages/5
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessageAsync(int id)
        {
            var message = await _messageService.GetMessageAsync(id);
            if (message == null)
            {
                return NotFound($"The entity of type '{typeof(Message)}' with key value '{id}' " +
                    $"for '{nameof(Message.Id)}' not found.");
            }
            return message;
        }

        //
        // POST api/messages
        //
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> SaveAsync(MessageViewModel message)
        {
            try
            {
                var entity = new Message()
                {
                    Name = message.Name,
                    Email = message.Email,
                    Company = message.Company,
                    Subject = message.Subject,
                    Text = message.Text,
                    IPAddress = Request?.HttpContext?.Connection?.RemoteIpAddress?.ToString()
                };
                await _messageService.SaveMessageAsync(entity);
                return Ok("Thank you for your message!");
            }
            catch
            {
                return BadRequest("Oops! We are sorry. Something went wrong on the server side. Try again later.");
            }
        }

        //
        // PUT api/messages
        //
        [HttpPut]
        public async Task<IActionResult> UpdateReadStatusAsync([FromForm]int[] ids, [FromForm]bool isRead)
        {
            return await PerformActionAsync(ids, async messageId =>
                await _messageService.UpdateMessageReadStatusAsync(messageId, isRead), "updated");
        }

        //
        // DELETE api/messages
        //
        [HttpDelete]
        public async Task<IActionResult> DeleteAsync(int[] ids)
        {
            return await PerformActionAsync(ids, async messageId =>
                await _messageService.DeleteMessageAsync(messageId), "deleted");
        }

        private Task<IActionResult> PerformActionAsync(int[] messageIds, Action<int> action, string messagePart)
        {
            foreach (var messageId in messageIds)
            {
                action.Invoke(messageId);
            }
            return Task.FromResult<IActionResult>(Ok($"A set of entities of type '{typeof(Message)}' has been " +
                $"{messagePart} successfully."));
        }
    }
}
