using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Exceptions;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
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
        // GET api/users/
        //
        [HttpGet]
        public async Task<IEnumerable<DomainUser>> GetUsersAsync()
        {
            return await _userService.GetUsersAsync();
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
                return NotFound($"The entity of type '{typeof(DomainUser)}' with value '{userName}' " +
                    $"for '{nameof(DomainUser.Identity.UserName)}' not found.");
            }
            return user;
        }

        //
        // POST api/users/register
        //
        [HttpPost]
        public async Task<IActionResult> RegisterAsync(RegisterUserViewModel newUser)
        {
            var user = await _userService.GetUserAsync(newUser.UserName);
            if (user == null)
            {
                var creator = await _userService.GetUserAsync(User?.Identity?.Name);
                await _userService.CreateUserAsync(newUser.UserName, newUser.Password, newUser.Email, newUser.Role, creator);
                return Ok($"User '@{newUser.UserName}' has been registered successfully.");
            }
            else
            {
                return BadRequest($"User '@{newUser.UserName}' already exists.");
            }
        }

        //
        // PUT api/users/user1/profile
        //
        [HttpPut("{userName}/profile")]
        public async Task<IActionResult> UpdateProfileAsync(string userName, MyProfileViewModel profile)
        {
            if (userName != User?.Identity?.Name)
                return BadRequest($"{nameof(DomainUser.Identity.UserName)} mismatch.");
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

            return Ok("Your profile has been updated successfully.");
        }

        //
        // PUT api/users/user1/displayStatus?isDisplayed=true
        //
        [HttpPut("{userName}/displayStatus")]
        public async Task<IActionResult> UpdateDisplayStatusAsync(string userName, bool isDisplayed)
        {
            try
            {
                await _userService.UpdateUserDisplayStatusAsync(userName, isDisplayed);
                return Ok($"Display status for user '@{userName}' has been updated successfully.");

            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }

        //
        // DELETE api/users/user1
        //
        [HttpDelete("{userName}")]
        public async Task<IActionResult> DeleteAsync(string userName)
        {
            try
            {
                await _userService.DeleteUserAsync(userName);
                return Ok($"The entity of type '{typeof(DomainUser)}' with value '{userName}' for " +
                    $"'{nameof(DomainUser.Identity.UserName)}' deleted successfully.");
            }
            catch (EntityNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
