using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactsService _contactsService;

        public ContactsController(IContactsService contactsService) => _contactsService = contactsService;

        //
        // GET api/contacts
        //
        [HttpGet]
        public async Task<ContactsViewModel> GetAsync()
        {
            var result = new ContactsViewModel
            {
                Contacts = (await _contactsService.GetContactsAsync()).Select(contact => new ContactInfoViewModel
                {
                    Caption = contact.Caption,
                    Name = contact.Name,
                    Values = contact.Values.Select(x => new ContactValue { Value = x }).ToList()
                }).ToList(),

                SocialLinks = (await _contactsService.GetSocialLinksAsync()).Select(socialLink => new SocialLinkViewModel
                {
                    NetworkName = socialLink.Key,
                    Url = socialLink.Value
                }).ToList()
            };
            return result;
        }

        //
        // POST api/contacts
        //
        [HttpPost]
        public async Task<IActionResult> SaveAsync(ContactsViewModel contacts)
        {
            var contactsData = contacts.Contacts.Select(contact => new ContactInfo(contact.Name)
            {
                Caption = contact.Caption,
                Values = contact.Values.Select(x => x.Value).ToList()
            });
            await _contactsService.SaveContactsAsync(contactsData);

            var socialLinksData = contacts.SocialLinks.ToDictionary(socialLink => socialLink.NetworkName, socialLink => socialLink.Url);
            await _contactsService.SaveSocialLinksAsync(socialLinksData);

            return Ok("Company contacts saved successfully.");
        }
    }
}
