using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class ContactsViewModel
    {
        [JsonProperty(nameof(ContactInfos))]
        public IList<ContactInfoViewModel> ContactInfos { get; set; }

        [JsonProperty(nameof(SocialLinks))]
        public IList<SocialLinkViewModel> SocialLinks { get; set; }
    }

    public class ContactInfoViewModel
    {
        [Required, HiddenInput]
        [JsonProperty(nameof(Name))]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        [JsonProperty(nameof(Caption))]
        public string Caption { get; set; }

        [JsonProperty(nameof(Values))]
        public IList<ContactValue> Values { get; set; }
    }

    public class ContactValue
    {
        [Required]
        [StringLength(100)]
        [JsonProperty(nameof(Value))]
        public string Value { get; set; }
    }

    public class SocialLinkViewModel
    {
        [Required]
        [StringLength(50)]
        [JsonProperty(nameof(NetworkName))]
        public string NetworkName { get; set; }

        [StringLength(100)]
        [DataType(DataType.Url)]
        [JsonProperty(nameof(Url))]
        public string Url { get; set; }
    }
}
