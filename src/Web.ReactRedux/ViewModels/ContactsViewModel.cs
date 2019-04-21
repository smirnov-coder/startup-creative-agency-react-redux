using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class ContactsViewModel
    {
        public IList<ContactInfoViewModel> Contacts { get; set; }

        public IList<SocialLinkViewModel> SocialLinks { get; set; }
    }

    public class ContactInfoViewModel
    {
        [Required, HiddenInput]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string Caption { get; set; }

        public IList<ContactValue> Values { get; set; }
    }

    public class ContactValue
    {
        [Required]
        [StringLength(100)]
        public string Value { get; set; }
    }

    public class SocialLinkViewModel
    {
        [Required]
        [StringLength(50)]
        public string NetworkName { get; set; }

        [StringLength(100)]
        [DataType(DataType.Url)]
        public string Url { get; set; }
    }
}
