using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace backend.ViewModel
{
    public class ClientInfoViewModel
    {
        public int Id { get; set; }
        [Required]
        public int? UserType { get; set; }

        public string UserTypeName { get; set; } = "";

        [Required]
        public string? FirstName { get; set; }
        [Required]
        public string? MiddleName { get; set; }
        [Required]
        public string? LastName { get; set; }
        [Required]
        public string? Address { get; set; }
        [Required]
        public int? ZipCode { get; set; }
         [Required]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? Birthdate { get; set; }

        [Required]
        public int? Age { get; set; }
        [Required]
        public string? NameOfFather { get; set; }
        [Required]
        public string? NameOfMother { get; set; }
        [Required]
        public string? CivilStatus { get; set; }
        [Required]
        public string? Religion { get; set; }
        [Required]
        public string? Occupation { get; set; }
    }
}