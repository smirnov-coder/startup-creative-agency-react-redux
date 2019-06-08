using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class ServiceInfoBindingModel
    {
        [Required]
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
