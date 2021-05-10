using API.Enum;
using System;

namespace API.Entity
{
    public class Person
    {
        public int id { get; set; }
        public string description { get; set; }
        public Status status { get; set; }
        public Person(int id, string description, Status status) //change status type to enum
        {
            this.id = id;
            this.description = description;
            this.status = status;
        }

        public override bool Equals(object obj)
        {
            return obj is Person person &&
                   id == person.id;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(id, description, status);
        }
    }
}