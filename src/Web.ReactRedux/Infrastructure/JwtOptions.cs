using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace StartupCreativeAgency.Web.ReactRedux.Infrastructure
{
    public class JwtOptions
    {
        public const string ISSUER = "StartupCreativeAgency"; // издатель токена

        public const string AUDIENCE = "StartupCreativeAgency"; // потребитель токена

        const string KEY = "mysupersecret_secretkey!123";   // ключ для шифрации

        public const int LIFETIME = 10; // время жизни токена - 10 дней

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
