using System.ComponentModel.DataAnnotations;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class RegisterUserViewModel
    {
        [Required]
        [StringLength(20)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20)]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [StringLength(20)]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        public string Role { get; set; }
    }
}
