using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Entities;

namespace backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserTypeControllerAPI : ControllerBase
    {
        private readonly EdisanContext _context;

        public UserTypeControllerAPI(EdisanContext context)
        {
            _context = context;
        }

        [HttpGet("UserTypeAPI")]
        public IActionResult UserTypeAPI()
        {
            var result = _context.UserTypes.ToList();
            return Ok(result);
        }
        [HttpGet("CreateUserTypeAPI")]
        public IActionResult CreateUserTypeAPI()
        {
            return Ok(new List<UserType>());
        }
        [HttpPost("CreateUserTypeAPI")]
        public IActionResult CreateUserTypeAPI([FromBody] UserType user)
        {
            if (user == null || string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("Name is required.");
            }

            try
            {
                _context.UserTypes.Add(user);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while saving the entity changes.");
            }
        }

        [HttpGet("UserTypeAPI/{id}")]
        public IActionResult GetUserTypeAPI(int id)
        {
            var userType = _context.UserTypes.Find(id);
            if (userType == null)
            {
                return NotFound("User type not found.");
            }

            return Ok(userType);
        }



        [HttpPut("EditUserTypeAPI/{id}")]
        public IActionResult EditUserTypeAPI(int id, UserType user)
        {
            if (user == null || string.IsNullOrEmpty(user.Name))
            {
                return BadRequest("Name is required.");
            }

            var userType = _context.UserTypes.Find(id);
            if (userType == null)
            {
                return NotFound("User type not found.");
            }

            try
            {
                userType.Name = user.Name;
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while updating the entity.");
            }
        }


        [HttpDelete("DeleteUserTypeAPI/{id}")]
        public IActionResult DeleteUserTypeAPI(int id)
        {
            var userType = _context.UserTypes.Find(id);
            if (userType == null)
            {
                return NotFound("User type not found.");
            }

            try
            {
                _context.UserTypes.Remove(userType);
                _context.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while deleting the entity.");
            }
        }
    }
}
