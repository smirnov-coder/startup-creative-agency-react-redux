using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Web.ReactRedux.Attributes;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class WorkExampleViewModel
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [Required]
        [StringLength(20)]
        public string Category { get; set; }

        [Required]
        [StringLength(500)]
        public string Description { get; set; }

        [DataType(DataType.ImageUrl)]
        public string ImagePath { get; set; }

        [DataType(DataType.Upload)]
        [AtLeastOneOfTwo(nameof(ImagePath), ErrorMessage = "The Image must be provided.")]
        [ImageFileExtensions]
        public IFormFile Image { get; set; }
    }
}
