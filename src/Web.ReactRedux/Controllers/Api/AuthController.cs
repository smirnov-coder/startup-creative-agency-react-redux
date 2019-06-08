using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    /// <summary>
    /// Контроллер для аутентификации пользователей.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private UserManager<UserIdentity> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private IMessageService _messageService;

        public AuthController(
            IUserService userService, 
            UserManager<UserIdentity> userManager, 
            IMessageService messageService,
            RoleManager<IdentityRole> roleManager)
        {
            _userService = userService;
            _userManager = userManager;
            _messageService = messageService;
            _roleManager = roleManager;
        }

        //
        // POST api/auth/token
        //
        /// <summary>
        /// Асинхронно выполняет аутентификацию пользователя по идентификационному имени пользователя и паролю.
        /// Возвращает объект результата аутентификации, содержащий начальное состояние SPA и маркер доступа (access token)
        /// в виде JSON Web Token (JWT).
        /// </summary>
        /// <param name="credentials">Учётные данные пользователя для аутентификациии.</param>
        [HttpPost("token")]
        public async Task<ActionResult<AuthResult>> AccessTokenAsync(UserCredentials credentials)
        {
            var user = await _userService.GetUserAsync(credentials.UserName);
            if (user == null)
            {
                return NotFound(OperationDetails.Error($"User '{credentials.UserName}' not found."));
            }
            var identity = user.Identity as UserIdentity;
            if (await _userManager.CheckPasswordAsync(identity, credentials.Password))
            {
                var result = new AuthResult
                {
                    AccessToken = await JwtHelper.GetEncodedJwtAsync(identity, _userManager),
                    AppState = new InitialAppState
                    {
                        IsAuthenticated = true,
                        UserName = user.Identity.UserName,
                        Photo = Url.Content(user.Profile.PhotoFilePath),
                        IsAdmin = await _userManager.IsInRoleAsync(user.Identity as UserIdentity, "Administrator"),
                    }
                };
                if (result.AppState.IsAdmin)
                {
                    result.AppState.NewMessagesCount = (await _messageService.GetMessagesAsync()).Where(x => !x.IsRead).Count();
                    result.AppState.Roles = result.AppState.IsAdmin ? _roleManager.Roles.Select(role => role.Name) : null;
                }
                return result;
            }
            return BadRequest(OperationDetails.Error("Invalid password."));
        }
    }
}
