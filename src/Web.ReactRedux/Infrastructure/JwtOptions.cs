using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;

namespace StartupCreativeAgency.Web.ReactRedux.Infrastructure
{
    /// <summary>
    /// Содержит различные параметры для создания и валидации JSON Web Token (JWT).
    /// </summary>
    public class JwtOptions
    {
        /// <summary>
        /// Издатель JWT.
        /// </summary>
        public const string ISSUER = "StartupCreativeAgency";

        /// <summary>
        /// Потребитель JWT.
        /// </summary>
        public const string AUDIENCE = "StartupCreativeAgency";

        /// <summary>
        /// Ключ, используемый для подписи JWT.
        /// </summary>
        const string KEY = "mysupersecret_secretkey!123";

        /// <summary>
        /// Время жизни JWT в условных единицах (минуты, часы, дни и т.д.).
        /// </summary>
        public const int LIFETIME = 10;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
