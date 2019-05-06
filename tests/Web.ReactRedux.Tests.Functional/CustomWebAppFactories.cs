using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace StartupCreativeAgency.Web.ReactRedux.Tests.Functional
{
    public class CustomWebAppFactories : IDisposable
    {
        // 4 разные фабрики нужны, чтобя хоть немного сократить время на выполнение тестов.
        public CustomWebApplicationFactory ForRead { get; private set; }
        public CustomWebApplicationFactory ForAdd { get; private set; }
        public CustomWebApplicationFactory ForUpdate { get; private set; }
        public CustomWebApplicationFactory ForDelete { get; private set; }

        public CustomWebAppFactories()
        {
            ForRead = new CustomWebApplicationFactory();
            ForAdd = new CustomWebApplicationFactory();
            ForUpdate = new CustomWebApplicationFactory()
            {
                ContactsFileName = "write-contacts.json",
                SocialLinksFileName = "write-social-links.json"
            };
            ForDelete = new CustomWebApplicationFactory();
        }

        public void Dispose()
        {
            ForRead?.Dispose();
            ForAdd?.Dispose();
            ForUpdate?.Dispose();
            ForDelete?.Dispose();
        }
    }

    [CollectionDefinition("Factories")]
    public class SharedTestResource : ICollectionFixture<CustomWebAppFactories>
    { }
}
