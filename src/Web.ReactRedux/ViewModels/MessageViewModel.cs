using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class MessageViewModel
    {
        //[Required, HiddenInput]
        //public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        [DataType(DataType.EmailAddress)]
        [RegularExpression(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]
        public string Email { get; set; }

        [StringLength(100)]
        public string Subject { get; set; }

        [StringLength(100)]
        public string Company { get; set; }

        [Required]
        [StringLength(5000)]
        [DataType(DataType.MultilineText)]
        public string Text { get; set; }
    }
}
