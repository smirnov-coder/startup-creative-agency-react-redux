using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class UserDisplayStatusBindingModel
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public bool IsDisplayed { get; set; }
    }
}
