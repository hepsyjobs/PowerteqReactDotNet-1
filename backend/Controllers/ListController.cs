using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ListController : ControllerBase
    {
        private readonly ILogger<ListController> _logger;
        private static List<ListObject> globalListObj = new List<ListObject> 
                {
                    new ListObject { Name = "test note", Id = 1}
                };

        public ListController(ILogger<ListController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public List<ListObject> Get()
        {
            if(globalListObj.Count > 0) {
                return globalListObj;
            } 
            else  {
                return new List<ListObject> 
                {
                    new ListObject { Name = "dummy note", Id = 1}
                };
            }
        }

        [HttpPost]
        public string Post(List<ListObject> listObj)
        {
            try 
            {
                globalListObj = listObj;
                return "Data successfully updated";
            }
            catch (Exception e)
            {
                return "There was some error";
            }
        }
    }
}
