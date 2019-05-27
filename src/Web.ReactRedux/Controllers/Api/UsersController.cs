﻿using System;
using System.Collections.Generic;
using System.IO;
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
        [HttpGet]
        public async Task<IEnumerable<DomainUser>> GetUsersAsync()
        {
            return (await _userService.GetUsersAsync()).Select(user => PrepareForReturn(user));
        }

        //
        // GET api/users/user1
        //
        [HttpGet("{userName}")]
        public async Task<ActionResult<DomainUser>> GetUserAsync(string userName)
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
        [HttpGet("me")]
        public async Task<ActionResult<DomainUser>> GetMeAsync() => await GetUserAsync(User?.Identity?.Name);
        

        private DomainUser PrepareForReturn(DomainUser user)
        {
            var profile = user.Profile;
            profile.UpdatePersonalInfo(profile.FirstName, profile.LastName, profile.JobPosition,
                Url.Content(profile.PhotoFilePath));
            /// TODO: Абсолютно непонятная ошибка с проксями.
            profile.SocialLinks.First();

            return user;
        }

        //
        // POST api/users/register
        //
        [HttpPost("register")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> RegisterAsync(RegisterUserViewModel newUser)
        {
            var user = await _userService.GetUserAsync(newUser.UserName);
            if (user == null)
            {
                var creator = await _userService.GetUserAsync(User?.Identity?.Name);
                await _userService.CreateUserAsync(newUser.UserName, newUser.Password, newUser.Email, newUser.Role, creator);
                return Ok(OperationDetails.Success($"User '@{newUser.UserName}' has been registered successfully."));
            }
            else
            {
                return BadRequest(OperationDetails.Error($"User '@{newUser.UserName}' already exists."));
            }
        }

        //
        // PUT api/users/user1/profile
        //
        [HttpPut("{userName}/profile")]
        public async Task<IActionResult> UpdateProfileAsync([FromRoute]string userName, [FromForm]MyProfileBindingModel profile)
        {
            if (userName != User?.Identity?.Name)
                return BadRequest(OperationDetails.Error("User name mismatch."));

            var user = await _userService.GetUserAsync(userName);
            string photoFilePath = profile.PersonalInfo.PhotoFilePath;
            if (profile.PersonalInfo.Image != null)
            {
                using (var stream = new MemoryStream())
                {
                    await profile.PersonalInfo.Image.CopyToAsync(stream);
                    string extension = Path.GetExtension(profile.PersonalInfo.Image.FileName);
                    string fileName = _fileService.GenerateUniqueFileName(extension, "userphoto-");
                    photoFilePath = await _fileService.SaveImageAsync(fileName, stream);
                }
            }
            await _userService.UpdateUserPersonalInfoAsync(user.Identity.UserName, profile.PersonalInfo.FirstName,
                profile.PersonalInfo.LastName, profile.PersonalInfo.JobPosition, photoFilePath);

            var socialLinks = profile.SocialLinks.Select(x => new SocialLink(x.NetworkName, x.Url));
            await _userService.UpdateUserSocialLinksAsync(user.Identity.UserName, socialLinks.ToArray());

            return Ok(OperationDetails.Success("Your profile has been updated successfully."));
        }

        //
        // PUT api/users/user1/display-status
        //
        [HttpPut("{userName}/display-status")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> UpdateDisplayStatusAsync([FromRoute]string userName, bool isDisplayed)
        {
            await _userService.UpdateUserDisplayStatusAsync(userName, isDisplayed);
            return Ok(OperationDetails.Success($"Display status for user '@{userName}' has been updated successfully."));
        }

        //
        // DELETE api/users/user1
        //
        [HttpDelete("{userName}")]
        [Authorize(Policy = "AdminPolicy")]
        public async Task<IActionResult> DeleteAsync(string userName)
        {
            await _userService.DeleteUserAsync(userName);
            return Ok(OperationDetails.Success($"The entity of type '{typeof(DomainUser)}' with value '{userName}' for " +
                $"'{nameof(IUserIdentity.UserName)}' deleted successfully."));
        }
    }
}
