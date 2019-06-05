using System.ComponentModel.DataAnnotations;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class RegisterUserBindingModel
    {
        [Required]
        [RegularExpression(@"^[A-Za-z0-9\-_]+$")]
        [StringLength(20, MinimumLength = 3)]
        public string UserName { get; set; }

        [Required]
        [StringLength(50)]
        [RegularExpression(@"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]
        public string Email { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 6)]
        [RegularExpression(@"^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$")]
        public string Password { get; set; }

        [Required]
        [Compare(nameof(Password))]
        public string ConfirmPassword { get; set; }

        [Required(AllowEmptyStrings = false)]
        [StringLength(20)]
        public string Role { get; set; }
    }
}
