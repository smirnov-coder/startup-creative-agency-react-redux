using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StartupCreativeAgency.Web.ReactRedux.Models
{
    public class MessageReadStatusBindingModel
    {
        public int[] MessageIds { get; set; }
        public bool IsRead { get; set; }
    }
}
