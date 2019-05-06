using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StartupCreativeAgency.Domain.Abstractions.Exceptions;

namespace StartupCreativeAgency.Web.ReactRedux.Attributes
{
    public class CustomExceptionFilterAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var ex = context.Exception;
            if (ex is EntityNotFoundException)
                context.Result = new NotFoundObjectResult(ex.Message);
            else if (ex is DuplicateEntityException)
                context.Result = new BadRequestObjectResult(ex.Message);
            else
                context.Result = new StatusCodeResult(500);
        }
    }
}
