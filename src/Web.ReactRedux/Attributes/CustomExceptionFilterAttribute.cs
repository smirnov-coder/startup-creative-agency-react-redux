using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StartupCreativeAgency.Domain.Abstractions.Exceptions;
using StartupCreativeAgency.Web.ReactRedux.Models;

namespace StartupCreativeAgency.Web.ReactRedux.Attributes
{
    /// <summary>
    /// Пользовательский фильтр обработки исключений.
    /// </summary>
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var ex = context.Exception;
            if (ex is EntityNotFoundException)
            {
                context.Result = new NotFoundObjectResult(OperationDetails.Error(ex.Message));
                return;
            }

            if (ex is DuplicateEntityException)
            {
                context.Result = new BadRequestObjectResult(OperationDetails.Error(ex.Message));
                return;
            }

            if (ex is DomainServiceException)
            {
                string message;
                if (ex.InnerException != null && ex.InnerException is InvalidOperationException)
                    message = ex.InnerException.Message;
                else
                    message = ex.Message;
                context.Result = new BadRequestObjectResult(OperationDetails.Error(message));
                return;
            }
            
            context.Result = new StatusCodeResult(500);
        }
    }
}
