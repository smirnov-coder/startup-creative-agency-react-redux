using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using StartupCreativeAgency.Web.ReactRedux.Attributes;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class MyProfileViewModel
    {
        public PersonalInfoViewModel PersonalInfo { get; set; }

        public IList<SocialLinkViewModel> SocialLinks { get; set; }
    }

    public class PersonalInfoViewModel
    {
        //[BindNever]
        //public string UserName { get; set; }

        [StringLength(30)]
        public string FirstName { get; set; }

        [StringLength(50)]
        public string LastName { get; set; }

        [StringLength(100)]
        public string JobPosition { get; set; }

        [DataType(DataType.ImageUrl)]
        public string PhotoFilePath { get; set; }

        [DataType(DataType.Upload)]
        [ImageFileExtensions]
        public IFormFile Image { get; set; }
    }
}
