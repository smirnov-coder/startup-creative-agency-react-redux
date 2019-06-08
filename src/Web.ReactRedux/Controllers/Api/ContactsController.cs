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
    /// Контроллер для работы с контактными данными компании.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Policy = "AdminPolicy")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsService _contactsService;

        public ContactsController(IContactsService contactsService) => _contactsService = contactsService;

        //
        // GET api/contacts
        //
        /// <summary>
        /// Асинхронно извлекает из хранилища контактные данные компании.
        /// </summary>
        [HttpGet, AllowAnonymous]
        public async Task<ContactsViewModel> GetAsync()
        {
            var result = new ContactsViewModel
            {
                ContactInfos = await _contactsService.GetContactsAsync(),
                SocialLinks = (await _contactsService.GetSocialLinksAsync()).Select(x => new SocialLink(x.Key, x.Value))
            };
            return result;
        }

        //
        // POST api/contacts
        //
        /// <summary>
        /// Асинхронно создаёт контактные данные компании на основании данных модели привязки и сохраняет их в хранилище.
        /// </summary>
        /// <param name="model">Данные модели привязки контактных данных компании.</param>
        [HttpPost]
        public async Task<IActionResult> SaveAsync([FromForm]ContactsBindingModel model)
        {
            var contacts = model.ContactInfos.Select(contact => new ContactInfo(contact.Name)
            {
                Caption = contact.Caption,
                Values = contact.Values.Select(x => x.Value).ToList()
            });
            await _contactsService.SaveContactsAsync(contacts);

            var socialLinksData = model.SocialLinks.ToDictionary(socialLink => socialLink.NetworkName, socialLink => socialLink.Url);
            await _contactsService.SaveSocialLinksAsync(socialLinksData);

            return Ok(OperationDetails.Success("Company contacts saved successfully."));
        }
    }
}
