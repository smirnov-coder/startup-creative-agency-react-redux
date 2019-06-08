using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using StartupCreativeAgency.Domain.Entities;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class ContactsViewModel
    {
        [JsonProperty(nameof(ContactInfos))]
        public IEnumerable<ContactInfo> ContactInfos { get; set; }

        [JsonProperty(nameof(SocialLinks))]
        public IEnumerable<SocialLink> SocialLinks { get; set; }
    }
}
