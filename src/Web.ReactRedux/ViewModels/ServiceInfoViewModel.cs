using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class ServiceInfoViewModel
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string IconClass { get; set; }

        [Required]
        [StringLength(50)]
        public string Caption { get; set; }

        [Required]
        [StringLength(300)]
        public string Description { get; set; }
    }
}
