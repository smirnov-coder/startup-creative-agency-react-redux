using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    /// <summary>
    /// Начальное состояние SPA.
    /// </summary>
    public class InitialAppState
    {
        /// <summary>
        /// Флаг, показывающий, прошёл ли текущий пользователь аутентификацию.
        /// </summary>
        public bool IsAuthenticated { get; set; }

        /// <summary>
        /// Флаг, показывающий, имеет ли текущий пользователь права администратора.
        /// </summary>
        public bool IsAdmin { get; set; }

        /// <summary>
        /// Идентификационное имя текущего пользователя (если пользователь аутентифицирован).
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Путь к файлу аватара текущего пользователя.
        /// </summary>
        public string Photo { get; set; }

        /// <summary>
        /// Количество новых непрочитанных сообщений от пользователей. Только для администраторов.
        /// </summary>
        public int NewMessagesCount { get; set; }

        /// <summary>
        /// Коллекция ролей пользователей. Только для администраторов.
        /// </summary>
        public IEnumerable<string> Roles { get; set; }
    }
}
