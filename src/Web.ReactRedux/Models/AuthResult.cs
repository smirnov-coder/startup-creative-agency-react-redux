using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    /// <summary>
    /// Результат аутентификации пользователя.
    /// </summary>
    public class AuthResult
    {
        /// <summary>
        /// Маркер доступа.
        /// </summary>
        public string AccessToken { get; set; }

        /// <summary>
        /// Состояние SPA после выполнения аутентификации пользователя.
        /// </summary>
        public InitialAppState AppState { get; set; }
    }
}
