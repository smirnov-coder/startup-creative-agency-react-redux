using System;
using System.Collections.Generic;
using System.IO;
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
    /// Контроллер для работы с пользователями доменной модели.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IFileService _fileService;

        public UsersController(IUserService userService, IFileService fileService)
        {
            _userService = userService;
            _fileService = fileService;
        }

        //
        // GET api/users
        //
        /// <summary>
        /// Асинхронно извлекает из коллекции пользователей доменной модели всех пользователей.
        /// </summary>
        [HttpGet]
        public async Task<IEnumerable<DomainUser>> GetUsersAsync()
        {
            return (await _userService.GetUsersAsync()).Select(user => PrepareForReturn(user));
        }

        //
        // GET api/users/user1
        //
        /// <summary>
        /// Асинхронно извлекает из коллекции пользователей доменной модели пользователя с заданным идентификационным
        /// именем пользователя.
        /// </summary>
        /// <param name="userName">Идентификационное имя пользователя.</param>
        [HttpGet("{userName}")]
        public async Task<ActionResult<DomainUser>> GetUserAsync([FromRoute]string userName)
        {
            var user = await _userService.GetUserAsync(userName);
            if (user == null)
            {
                return NotFound(OperationDetails.Error($"The entity of type '{typeof(DomainUser)}' with value '{userName}' " +
                    $"for '{nameof(IUserIdentity.UserName)}' not found."));
            }
            return PrepareForReturn(user);
        }

        //
        // GET api/users/me
        //
        /// <summary>
        /// Асинхронно извлекает из коллекции пользователей доменной модели пользователя, выполняющего текущий аутентифицированный
        /// запрос.
        /// </summary>
        [HttpGet("me")]
        public async Task<ActionResult<DomainUser>> GetMeAsync() => await GetUserAsync(User?.Identity?.Name);
        

        private DomainUser PrepareForReturn(DomainUser user)
        {
            var profile = user.Profile;
            profile.UpdatePersonalInfo(profile.FirstName, profile.LastName, profile.JobPosition,
                Url.Content(profile.PhotoFilePath));
            profile.SocialLinks.First();
            return user;
        }

        //
        // POST api/users/register
        //
        /// <summary>
        /// Асинхронно регистрирует нового пользователя доменной модели.
        /// </summary>
        /// <param name="model">Данные модели привязки для регистрации нового пользователя.</param>
        [HttpPost("register")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> RegisterAsync([FromForm]RegisterUserBindingModel model)
        {
            var user = await _userService.GetUserAsync(model.UserName);
            if (user == null)
            {
                var creator = await _userService.GetUserAsync(User?.Identity?.Name);
                await _userService.CreateUserAsync(model.UserName, model.Password, model.Email, model.Role, creator);
                return Ok(OperationDetails.Success($"User '@{model.UserName}' has been registered successfully."));
            }
            else
            {
                return BadRequest(OperationDetails.Error($"User '@{model.UserName}' already exists."));
            }
        }

        //
        // PUT api/users/profile
        //
        /// <summary>
        /// Асинхронно обновляет данные профайла пользователя доменной модели.
        /// </summary>
        /// <param name="model">Данные модели привязки для обновления профайла пользователя.</param>
        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfileAsync([FromForm]MyProfileBindingModel model)
        {
            var user = await _userService.GetUserAsync(User?.Identity?.Name);
            string photoFilePath = model.PersonalInfo.PhotoFilePath;
            if (model.PersonalInfo.Image != null)
            {
                using (var stream = new MemoryStream())
                {
                    await model.PersonalInfo.Image.CopyToAsync(stream);
                    string extension = Path.GetExtension(model.PersonalInfo.Image.FileName);
                    string fileName = _fileService.GenerateUniqueFileName(extension, "userphoto-");
                    photoFilePath = await _fileService.SaveImageAsync(fileName, stream);
                }
            }
            await _userService.UpdateUserPersonalInfoAsync(user.Identity.UserName, model.PersonalInfo.FirstName,
                model.PersonalInfo.LastName, model.PersonalInfo.JobPosition, photoFilePath);

            var socialLinks = model.SocialLinks.Select(x => new SocialLink(x.NetworkName, x.Url));
            await _userService.UpdateUserSocialLinksAsync(user.Identity.UserName, socialLinks.ToArray());

            return Ok(OperationDetails.Success("Your profile has been updated successfully."));
        }

        //
        // PUT api/users/display-status
        //
        /// <summary>
        /// Асинхронно обновляет статус отображения пользователя доменной модели на главной странице сайта в качестве члена
        /// команды компании.
        /// </summary>
        /// <param name="model">Данные модели привязки, содержащие идентификационное имя пользователя и новый статус отображения.</param>
        [HttpPut("display-status")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateDisplayStatusAsync(UserDisplayStatusBindingModel model)
        {
            await _userService.UpdateUserDisplayStatusAsync(model.UserName, model.IsDisplayed);
            return Ok(OperationDetails.Success($"Display status for user '@{model.UserName}' has been updated successfully."));
        }

        //
        // DELETE api/users/user1
        //
        /// <summary>
        /// Асинхронно удаляет из коллекции пользователей доменной модели пользователя с заданным идентификационным именем.
        /// </summary>
        /// <param name="userName">Идентификационное имя пользователя доменной модели.</param>
        [HttpDelete("{userName}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteAsync([FromRoute]string userName)
        {
            await _userService.DeleteUserAsync(userName);
            return Ok(OperationDetails.Success($"The entity of type '{typeof(DomainUser)}' with value '{userName}' for " +
                $"'{nameof(IUserIdentity.UserName)}' deleted successfully."));
        }
    }
}
