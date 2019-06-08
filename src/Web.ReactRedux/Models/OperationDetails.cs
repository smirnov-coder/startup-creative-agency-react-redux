using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    /// <summary>
    /// Содержит информацию о выполненной операции.
    /// </summary>
    public class OperationDetails
    {
        /// <summary>
        /// Флаг, показывающий, что при выполнении операции произошла ошибка.
        /// </summary>
        public bool IsError { get; set; }
        
        /// <summary>
        /// Сообщение с дополнительной информацией об операции.
        /// </summary>
        public string Message { get; set; }

        public static OperationDetails Error(string message) => new OperationDetails
        {
            IsError = true,
            Message = message
        };

        public static OperationDetails Success(string message) => new OperationDetails
        {
            IsError = false,
            Message = message
        };
    }
}
