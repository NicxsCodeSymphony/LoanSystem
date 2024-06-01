using System;
using System.Collections.Generic;

namespace backend.Entities;

public partial class ClientInfo
{
    public int Id { get; set; }

    public int UserType { get; set; }

    public string FirstName { get; set; } = null!;

    public string MiddleName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string Address { get; set; } = null!;

    public int ZipCode { get; set; }

    public DateTime Birthdate { get; set; }

    public int Age { get; set; }

    public string NameOfFather { get; set; } = null!;

    public string NameOfMother { get; set; } = null!;

    public string CivilStatus { get; set; } = null!;

    public string Religion { get; set; } = null!;

    public string Occupation { get; set; } = null!;
}
