using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class ContactsBindingModel
    {
        public IList<ContactInfoBindingModel> ContactInfos { get; set; }

        public IList<SocialLinkBindingModel> SocialLinks { get; set; }
    }

    public class ContactInfoBindingModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(30)]
        public string Caption { get; set; }

        public IList<ContactValue> Values { get; set; }
    }

    public class ContactValue
    {
        [Required]
        [StringLength(50)]
        public string Value { get; set; }
    }

    public class SocialLinkBindingModel
    {
        [Required]
        [StringLength(50)]
        public string NetworkName { get; set; }

        [StringLength(100)]
        public string Url { get; set; }
    }
}
