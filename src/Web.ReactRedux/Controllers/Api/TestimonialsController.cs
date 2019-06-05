using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers.Api
{
    public class TestimonialsController : ApiControllerBase<TestimonialBindingModel, Testimonial, int>
    {
        private readonly ITestimonialService _testimonialService;

        public TestimonialsController(ITestimonialService testimonialService, IUserService userService) : base(userService)
        {
            _testimonialService = testimonialService;
        }

        protected override Task<Testimonial> CreateEntityFromModelAsync(TestimonialBindingModel model, DomainUser creator)
        {
            var testimonial = new Testimonial(model.Id, creator)
            {
                Author = model.Author,
                Company = model.Company,
                Text = model.Text
            };
            return Task.FromResult(testimonial);
        }

        protected override async Task<Testimonial> PerformAddAsync(Testimonial entity)
        {
            return await _testimonialService.AddTestimonialAsync(entity);
        }

        protected override async Task PerformDeleteAsync(int entityId)
        {
            await _testimonialService.DeleteTestimonialAsync(entityId);
        }

        protected override async Task<Testimonial> PerformGetAsync(int id)
        {
            return await _testimonialService.GetTestimonialAsync(id);
        }

        protected override async Task<IEnumerable<Testimonial>> PerformGetManyAsync()
        {
            return await _testimonialService.GetTestimonialsAsync();
        }

        protected override async Task PerformUpdateAsync(Testimonial entity)
        {
            await _testimonialService.UpdateTestimonialAsync(entity);
        }
    }
}
