using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StartupCreativeAgency.Domain.Entities;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    /// TODO: delete
    public class BasePageModel
    {
        public UserWidgetViewModel UserWidget { get; set; }
        public bool IsAdmin { get; set; }
        public int NewMessagesCount { get; set; }
    }

    public class ListPageModel<TEntity, TKey> : BasePageModel where TEntity : BaseEntity<TKey>
    {
        public IEnumerable<TEntity> Items { get; set; }
    }

    public class EditPageModel<TEntity, TKey> : BasePageModel where TEntity : BaseEntity<TKey>
    {
        public TEntity Item { get; set; }
    }

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

    public class MyProfilePageModel : BasePageModel
    {
        public DomainUser User { get; set; }
    }

    public class ServicePageModel : BasePageModel
    {
        public ServiceInfo Service { get; set; }
    }

    public class UsersPageModel : BasePageModel
    {
        public IEnumerable<DomainUser> Users { get; set; }
    }

    public class ManageUserPageModel
    {
        public UserWidgetViewModel UserWidget { get; set; }
        public DomainUser ManagedUser { get; set; }
        public int NewMessagesCount { get; set; }
    }

    public class RegisterUserPageModel
    {
        public UserWidgetViewModel UserWidget { get; set; }
        public int NewMessagesCount { get; set; }
    }

    public class WorksPageModel : BasePageModel
    {
        public IEnumerable<WorkExample> Works { get; set; }
    }

    public class WorkExamplePageModel : BasePageModel
    {
        public WorkExample WorkExample { get; set; }
    }

    public class BlogPageModel : BasePageModel
    {
        public IEnumerable<BlogPost> BlogPosts { get; set; }
    }

    public class BrandsPageModel : BasePageModel
    {
        public IEnumerable<Brand> Brands { get; set; }
    }

    public class TestimonialsPageModel : BasePageModel
    {
        public IEnumerable<Testimonial> Testimonials { get; set; }
    }

    public class ContactsPageModel
    {
        public UserWidgetViewModel UserWidget { get; set; }
        public IEnumerable<ContactInfo> Contacts { get; set; }
        public IEnumerable<SocialLink> SocialLinks { get; set; }
        public int NewMessagesCount { get; set; }

    }

    public class MessagesPageModel
    {
        public UserWidgetViewModel UserWidget { get; set; }
        public IEnumerable<Message> Messages { get; set; }
        public int NewMessagesCount { get; set; }
    }
}
