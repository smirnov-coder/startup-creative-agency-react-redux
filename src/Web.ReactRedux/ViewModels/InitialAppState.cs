using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class InitialAppState
    {
        public bool IsAuthenticated { get; set; }
        public bool IsAdmin { get; set; }
        public string UserName { get; set; }
        public string Photo { get; set; }
        public int NewMessagesCount { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}
