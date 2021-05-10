using API.Entity;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IService<Person> eService = new EntityService();
        private readonly StatusService statService = new StatusService();

        [HttpGet]
        public async Task<List<Person>> GetPeople()
        {
            return eService.GetAllEntities();
        }

        [Route("/getPerson/{id}")]
        [HttpGet]
        public ActionResult<Person> GetOne(int id)
        {
            return eService.GetOne(id);
        }

        [Route("updatePerson")]
        [HttpPut]
        public ActionResult UpdatePerson(Person person)
        {
            if (eService.UpdatePerson(person))
            {
                return NoContent();
            }

            return BadRequest("Failed to update");
        }

        [Route("addPerson")]
        [HttpPost]
        public ActionResult AddPerson(Person person) {
            if (eService.AddPerson(person)) {
                return NoContent();
            }
            return BadRequest("Failed to add new person");
        }

        [Route("deletePerson/{id}")]
        [HttpDelete]
        public ActionResult DeletePerson(int id) {
            if (eService.DeletePerson(id)) {
                return NoContent();
            }
            return BadRequest("Failed to delete person");
        }


        //Status Routes (Move to new controller later)
        [Route("status")]
        [HttpGet]
        public ActionResult<List<string>> GetStatuses()
        {
            return statService.GetStatusValues();
        }

        [Route("statusNum")]
        [HttpGet]
        public ActionResult<List<int>> GetStatusesNum()
        {
            return statService.GetStatusNum();
        }
    }
}