using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Entities;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class HomePageModel
    {
        public IEnumerable<ServiceInfo> Services { get; set; }
        public IEnumerable<DomainUser> TeamMembers { get; set; }
        public IEnumerable<WorkExample> Works { get; set; }
        public IEnumerable<BlogPost> BlogPosts { get; set; }
        public IEnumerable<Brand> Brands { get; set; }
        public IEnumerable<Testimonial> Testimonials { get; set; }
        public IEnumerable<ContactInfo> Contacts { get; set; }
        public IEnumerable<SocialLink> SocialLinks { get; set; }
    }
}
