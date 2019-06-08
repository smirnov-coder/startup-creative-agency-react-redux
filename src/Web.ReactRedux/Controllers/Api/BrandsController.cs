using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    /// <summary>
    /// Контроллер для работы с корпоративными клиентами компании.
    /// </summary>
    public class BrandsController : ApiControllerBase<BrandBindingModel, Brand, int>
    {
        private readonly IBrandService _brandService;
        private readonly IFileService _fileService;

        public BrandsController(IBrandService brandService, IFileService fileService, IUserService userService) 
            : base(userService)
        {
            _brandService = brandService;
            _fileService = fileService;
        }

        protected override async Task<Brand> CreateEntityFromModelAsync(BrandBindingModel model, DomainUser creator)
        {
            var brand = new Brand(model.Id, creator)
            {
                Name = model.Name,
                ImagePath = model.ImagePath
            };
            if (model.Image != null)
            {
                using (var stream = new MemoryStream())
                {
                    await model.Image.CopyToAsync(stream);
                    string extension = Path.GetExtension(model.Image.FileName);
                    string fileName = _fileService.GenerateUniqueFileName(extension, "brand-");
                    brand.ImagePath = await _fileService.SaveImageAsync(fileName, stream);
                }
            }
            return brand;
        }

        protected override async Task<Brand> PerformAddAsync(Brand entity)
        {
            return await _brandService.AddBrandAsync(entity);
        }

        protected override async Task PerformDeleteAsync(int entityId)
        {
            await _brandService.DeleteBrandAsync(entityId);
        }

        protected override async Task<Brand> PerformGetAsync(int id)
        {
            return await _brandService.GetBrandAsync(id);
        }

        protected override async Task<IEnumerable<Brand>> PerformGetManyAsync()
        {
            return await _brandService.GetBrandsAsync();
        }

        protected override async Task PerformUpdateAsync(Brand entity)
        {
            await _brandService.UpdateBrandAsync(entity);
        }

        protected override Brand PrepareEntityForReturn(Brand entity)
        {
            entity.ImagePath = Url.Content(entity.ImagePath);
            return entity;
        }
    }
}