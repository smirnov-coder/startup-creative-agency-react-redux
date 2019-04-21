using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Web.ReactRedux.Attributes;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class BrandViewModel
    {
        [HiddenInput]
        public int Id { get; set; }

        [Required]
        [StringLength(20)]
        public string Name { get; set; }

        [DataType(DataType.ImageUrl)]
        public string ImagePath { get; set; }

        [DataType(DataType.Upload)]
        [AtLeastOneOfTwo(nameof(ImagePath), ErrorMessage = "The Image must be provided.")]
        [ImageFileExtensions]
        public IFormFile Image { get; set; }
    }
}
