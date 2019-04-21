using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
        [Consumes("application/json")]
        public async Task<ActionResult<string>> AccessTokenAsync(UserCredentials credentials)
        {
            var user = await _userService.GetUserAsync(credentials.UserName);
            if (user == null)
            {
                return NotFound($"The entity of type '{typeof(DomainUser)}' with value '{credentials.UserName}' " +
                    $"for '{nameof(IUserIdentity.UserName)}' not found.");
            }
            /// TODO: Создать и вернуть JWT. Какой метод SignInManager'а использовать???
            var identityResult = await _signInManager.CheckPasswordSignInAsync(user.Identity as UserIdentity, credentials.Password, false);
            if (identityResult.Succeeded)
            {
                var roles = await _signInManager.UserManager.GetRolesAsync(user.Identity as UserIdentity);
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Identity.UserName),
                };
                foreach (var role in roles)
                {
                    claims.Add(new Claim(ClaimsIdentity.DefaultRoleClaimType, role));
                }
                ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);

                var today = DateTime.UtcNow;
                var jwt = new JwtSecurityToken(
                    issuer: JwtOptions.ISSUER,
                    audience: JwtOptions.AUDIENCE,
                    notBefore: today,
                    claims: claims,
                    expires: today.Add(TimeSpan.FromDays(JwtOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(JwtOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

                return encodedJwt;
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
