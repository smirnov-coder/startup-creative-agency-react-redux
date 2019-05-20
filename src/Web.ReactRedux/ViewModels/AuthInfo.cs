using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.ViewModels
{
    public class AuthInfo
    {
        public string AccessToken { get; set; }
        public bool IsAdmin { get; set; }
    }
}
