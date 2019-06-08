using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    /// <summary>
    /// Контроллер для работы с сообщениями от пользователей.
    /// </summary>
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
        /// <summary>
        /// Асинхронно извлекает из коллекции сообщений пользователей все сообщения.
        /// </summary>
        [HttpGet]
        public async Task<IEnumerable<Message>> GetMessagesAsync() => await _messageService.GetMessagesAsync();

        //
        // GET api/messages/5
        //
        /// <summary>
        /// Асинхронно извлекает из коллекции сообщений пользователей сообщение с заданным значением идентификатора.
        /// </summary>
        /// <param name="id">Значение идентификатора сообщения от пользователя.</param>
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessageAsync(int id)
        {
            var message = await _messageService.GetMessageAsync(id);
            if (message == null)
            {
                return NotFound(OperationDetails.Error($"The entity of type '{typeof(Message)}' with key value '{id}' " +
                    $"for '{nameof(Message.Id)}' not found."));
            }
            return message;
        }

        //
        // POST api/messages
        //
        /// <summary>
        /// Асинхронно создаёт новое сообщения от пользователя на основании данных модели привязки и сохраняёт его 
        /// в коллекции сообщений.
        /// </summary>
        /// <param name="message">Данные модели привязки сообщения от пользователя.</param>
        [HttpPost, AllowAnonymous]
        public async Task<IActionResult> SaveAsync(MessageBindingModel message)
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
                return Ok(OperationDetails.Success("Thank you for your message!"));
            }
            catch
            {
                return BadRequest(OperationDetails.Error("Oops! We are sorry. Something went wrong on the server side. Try again later."));
            }
        }

        //
        // PUT api/messages
        //
        /// <summary>
        /// Асинхронно обновляет статус (прочтено, непрочтено) группы сообщений на основании данных модели привязки.
        /// </summary>
        /// <param name="model">Данные модели привязки, содержащие значения идентификаторов обновляемых сообщений и новое
        /// значение статуса.</param>
        [HttpPut]
        public async Task<IActionResult> UpdateReadStatusAsync(MessageReadStatusBindingModel model)
        {
            return await PerformActionAsync(model.MessageIds, async messageId =>
                await _messageService.UpdateMessageReadStatusAsync(messageId, model.IsRead), "updated");
        }

        //
        // DELETE api/messages
        //
        /// <summary>
        /// Асинхронно удаляет из коллекции сообщениё от пользователей сообщения с заданными значениями идентификаторов.
        /// </summary>
        /// <param name="ids">Коллекция значений идентификаторов удаляемых сообщений.</param>
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
            return Task.FromResult<IActionResult>(Ok(OperationDetails.Success($"A set of entities of type '{typeof(Message)}' has been " +
                $"{messagePart} successfully.")));
        }
    }
}
