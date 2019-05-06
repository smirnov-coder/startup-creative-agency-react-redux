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
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private SignInManager<UserIdentity> _signInManager;

        public AuthController(IUserService userService, SignInManager<UserIdentity> signInManager)
        {
            _userService = userService;
            _signInManager = signInManager;
        }

        //
        // POST api/auth/token
        //
        [HttpPost("token")]
        public async Task<ActionResult<string>> AccessTokenAsync(UserCredentials credentials)
        {
            var user = await _userService.GetUserAsync(credentials.UserName);
            if (user == null)
            {
                return NotFound($"The entity of type '{typeof(DomainUser)}' with value '{credentials.UserName}' " +
                    $"for '{nameof(IUserIdentity.UserName)}' not found.");
            }
            var identityResult = await _signInManager.CheckPasswordSignInAsync(user.Identity as UserIdentity, credentials.Password, false);
            if (identityResult.Succeeded)
            {
                return await JwtHelper.GetEncodedJwtAsync(user.Identity as UserIdentity, _signInManager.UserManager);
            }
            return BadRequest($"Unable to authenticate user with value '{credentials.UserName}' for '{nameof(IUserIdentity.UserName)}'.");
        }

        //[HttpGet("token/test")]
        //[Authorize(Policy = "AdminPolicy")]
        //public IActionResult TestToken()
        //{
        //    var user = User;

        //    return Ok("Authorization test passed successfully.");
        //}
    }
}
