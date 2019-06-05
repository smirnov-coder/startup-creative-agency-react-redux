using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class OperationDetails
    {
        public bool IsError { get; set; }
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
