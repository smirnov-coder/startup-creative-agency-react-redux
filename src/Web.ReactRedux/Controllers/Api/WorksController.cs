using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    public class WorksController : ApiControllerBase<WorkExampleBindingModel, WorkExample, int>
    {
        private readonly IWorkExampleService _workExampleService;
        private readonly IFileService _fileService;

        public WorksController(IWorkExampleService workExampleService, IFileService fileService, IUserService userService) 
            : base(userService)
        {
            _workExampleService = workExampleService;
            _fileService = fileService;
        }

        protected override async Task<WorkExample> CreateEntityFromModelAsync(WorkExampleBindingModel model, DomainUser creator)
        {
            var workExample = new WorkExample(model.Id, creator)
            {
                Name = model.Name,
                Category = model.Category,
                Description = model.Description,
                ImagePath = model.ImagePath
            };
            if (model.Image != null)
            {
                using (var stream = new MemoryStream())
                {
                    await model.Image.CopyToAsync(stream);
                    string extension = Path.GetExtension(model.Image.FileName);
                    string fileName = _fileService.GenerateUniqueFileName(extension, "workexample-");
                    workExample.ImagePath = await _fileService.SaveImageAsync(fileName, stream);
                }
            }
            return workExample;
        }

        protected override async Task<WorkExample> PerformAddAsync(WorkExample entity)
        {
            return await _workExampleService.AddWorkExampleAsync(entity);
        }

        protected override async Task PerformDeleteAsync(int entityId)
        {
            await _workExampleService.DeleteWorkExampleAsync(entityId);
        }

        protected override async Task<WorkExample> PerformGetAsync(int id)
        {
            return await _workExampleService.GetWorkExampleAsync(id);
        }

        protected override async Task<IEnumerable<WorkExample>> PerformGetManyAsync()
        {
            return await _workExampleService.GetWorkExamplesAsync();
        }

        protected override async Task PerformUpdateAsync(WorkExample entity)
        {
            await _workExampleService.UpdateWorkExampleAsync(entity);
        }

        protected override WorkExample PrepareEntityForReturn(WorkExample entity)
        {
            entity.ImagePath = Url.Content(entity.ImagePath);
            return entity;
        }
    }
}
