using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Web.ReactRedux.Attributes;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class BlogPostViewModel
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(50)]
        public string Category { get; set; }

        [Required]
        [StringLength(5000)]
        public string Content { get; set; }

        [DataType(DataType.ImageUrl)]
        public string ImagePath { get; set; }

        [DataType(DataType.Upload)]
        [Display(Name = "Image")]
        [AtLeastOneOfTwo(nameof(ImagePath), ErrorMessage = "The Image must be provided.")]
        [ImageFileExtensions]
        public IFormFile Image { get; set; }
    }
}
