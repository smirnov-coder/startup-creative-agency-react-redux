using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class AuthResult
    {
        public string AccessToken { get; set; }
        public InitialAppState AppState { get; set; }
    }
}
