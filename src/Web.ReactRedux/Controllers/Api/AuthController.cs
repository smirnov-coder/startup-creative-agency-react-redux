using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Infrastructure;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
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
            //var identityResult = await _userManager.CheckPasswordSignInAsync(identity, credentials.Password, false);
            //if (identityResult.Succeeded)
            //{
            //    var result =  new AuthResult
            //    {
            //        AccessToken = await JwtHelper.GetEncodedJwtAsync(identity, userManager),
            //        AppState = new InitialAppState
            //        {
            //            IsAuthenticated = true,
            //            UserName = user.Identity.UserName,
            //            Photo = Url.Content(user.Profile.PhotoFilePath),
            //            IsAdmin = await userManager.IsInRoleAsync(user.Identity as UserIdentity, "Administrator"),
            //        }
            //    };
            //    if (result.AppState.IsAdmin)
            //    {
            //        result.AppState.NewMessagesCount = (await _messageService.GetMessagesAsync()).Where(x => !x.IsRead).Count();
            //        result.AppState.Roles = result.AppState.IsAdmin ? _roleManager.Roles.Select(role => role.Name) : null;
            //    }
            //    return result;
            //}
            //return BadRequest(OperationDetails.Error($"Unable to authenticate user '{credentials.UserName}'."));
        }
    }
}
