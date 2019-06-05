using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using StartupCreativeAgency.Web.ReactRedux.Attributes;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class MyProfileBindingModel
    {
        public PersonalInfoBindingModel PersonalInfo { get; set; }

        public IList<SocialLinkViewModel> SocialLinks { get; set; }
    }

    public class PersonalInfoBindingModel
    {
        [StringLength(30)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(100)]
        public string JobPosition { get; set; }

        public string PhotoFilePath { get; set; }

        [ImageFileExtensions]
        public IFormFile Image { get; set; }
    }
}
