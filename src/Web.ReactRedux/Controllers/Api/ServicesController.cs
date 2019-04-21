using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    public class ServicesController : ApiControllerBase<ServiceInfoViewModel, ServiceInfo, int>
    {
        private readonly IServiceInfoService _serviceInfoService;

        public ServicesController(IServiceInfoService serviceInfoService, IUserService userService)
            : base(userService)
        {
            _serviceInfoService = serviceInfoService;
        }

        protected override async Task<IEnumerable<ServiceInfo>> PerformGetManyAsync()
        {
            return await _serviceInfoService.GetServiceInfosAsync();
        }

        protected override async Task<ServiceInfo> PerformGetAsync(int id)
        {
            return await _serviceInfoService.GetServiceInfoAsync(id);
        }

        protected override Task<ServiceInfo> CreateEntityFromModelAsync(ServiceInfoViewModel model, DomainUser creator)
        {
            var serviceInfo = new ServiceInfo(model.Id, creator)
            {
                IconClass = model.IconClass,
                Caption = model.Caption,
                Description = model.Description,
            };
            return Task.FromResult(serviceInfo);
        }

        protected override async Task<ServiceInfo> PerformAddAsync(ServiceInfo entity)
        {
            return await _serviceInfoService.AddServiceInfoAsync(entity);
        }

        protected override async Task PerformUpdateAsync(ServiceInfo entity)
        {
            await _serviceInfoService.UpdateServiceInfoAsync(entity);
        }

        protected override async Task PerformDeleteAsync(int entityId)
        {
            await _serviceInfoService.DeleteServiceInfoAsync(entityId);
        }
    }
}