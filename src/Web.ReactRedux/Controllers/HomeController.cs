using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using StartupCreativeAgency.Domain.Abstractions.Services;
using StartupCreativeAgency.Web.ReactRedux.ViewModels;
using StartupCreativeAgency.Domain.Entities;

namespace StartupCreativeAgency.Web.ReactRedux.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() => View();
    }
}
