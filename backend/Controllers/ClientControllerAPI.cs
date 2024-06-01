using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Entities;
using backend.ViewModel;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ClientControllerAPI : ControllerBase
    {
        private readonly EdisanContext _context;

        public ClientControllerAPI(EdisanContext context)
        {
            _context = context;
        }

          [HttpGet("ClientAPI")]
        public  IActionResult ClientAPI()
        {
            var client = (
                from clientInfo in _context.ClientInfos
                join usertype in _context.UserTypes
                on clientInfo.UserType equals usertype.Id

                select new ClientInfoViewModel
                {
                    Id = clientInfo.Id,
                    UserType = clientInfo.UserType,
                    UserTypeName = usertype.Name,
                    FirstName = clientInfo.FirstName,
                    MiddleName = clientInfo.MiddleName,
                    LastName = clientInfo.LastName,
                    Address = clientInfo.Address,
                    ZipCode = clientInfo.ZipCode,
                    Birthdate = clientInfo.Birthdate,
                    Age = clientInfo.Age,
                    NameOfFather = clientInfo.NameOfFather,
                    NameOfMother = clientInfo.NameOfMother,
                    CivilStatus = clientInfo.CivilStatus,
                    Religion = clientInfo.Religion,
                    Occupation = clientInfo.Occupation,
                }
            ).ToList();


            if (client != null)
                return Ok(client);
            else
                return Problem("walay clients");
        }

        [HttpGet("CreateClientAPI")]
         public IActionResult CreateClientAPI()
        {
             return Ok(new List<ClientInfo>());
        }

        [HttpPost("CreateClientAPI")]

        public IActionResult CreateClientAPI([FromBody] ClientInfo clientInfo){
            if(ModelState.IsValid){
                _context.Add(clientInfo);
                _context.SaveChanges();
            }
            return Ok(clientInfo);
        }

        [HttpGet("GetClientById/{id}")]
public IActionResult GetClientById(int id)
{
    var client = _context.ClientInfos.Find(id);
    if (client == null)
    {
        return NotFound("Client not found");
    }

    return Ok(client);
}


[HttpPut("EditClientAPI/{id}")]
public IActionResult EditClientAPI(int id, [FromBody] ClientInfo client)
{
    if (client == null)
    {
        return BadRequest("Client is null");
    }

    var existingClient = _context.ClientInfos.Find(id);
    if (existingClient == null)
    {
        return NotFound("Client not found.");
    }

    try
    {
        // Update client properties
        existingClient.UserType = client.UserType;
        existingClient.FirstName = client.FirstName;
        existingClient.MiddleName = client.MiddleName;
        existingClient.LastName = client.LastName;
        existingClient.Address = client.Address;
        existingClient.ZipCode = client.ZipCode;
        existingClient.Birthdate = client.Birthdate;
        existingClient.Age = client.Age;
        existingClient.NameOfFather = client.NameOfFather;
        existingClient.NameOfMother = client.NameOfMother;
        existingClient.CivilStatus = client.CivilStatus;
        existingClient.Religion = client.Religion;
        existingClient.Occupation = client.Occupation;

        _context.SaveChanges();
        return Ok();
    }
    catch (Exception ex)
    {
        // Log exception for debugging
        return StatusCode(500, "An error occurred while updating the entity.");
    }
}



        [HttpDelete("DeleteClientAPI/{id}")]
        public IActionResult DeleteClientAPI(int id){
            var client = _context.ClientInfos.Find(id);
            if(client == null){
                return NotFound("Client not found");
            }

            try{
                _context.ClientInfos.Remove(client);
                _context.SaveChanges(); 
                return Ok();
            }
            catch(Exception ex){
                 return StatusCode(500, "An error occurred while deleting the entity.");
            }
        }
        

    }
}
