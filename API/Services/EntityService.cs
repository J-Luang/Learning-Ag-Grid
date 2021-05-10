using API.Entity;
using API.Enum;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    public class EntityService : IService<Person>
    {
        //Replace with repo/db data
        static List<Person> peopleRepo = new List<Person>();

        

        //create static object that binds if binded dont reinitialize
        static EntityService(){
            Person an1 = new Person(1, "Capybara", Status.inprogress);
            Person an2 = new Person(2, "Zebra", Status.inreview);
            Person an3 = new Person(3, "Sifakas", Status.backlog);

            peopleRepo.Add(an1);
            peopleRepo.Add(an2);
            peopleRepo.Add(an3);  
        }

        public EntityService(){}

        public List<Person> GetAllEntities()
        {
            return peopleRepo;
            throw new NotImplementedException();
        }

        public Person GetOne(int id)
        {
            foreach (Person person in peopleRepo)
            {
                if (person.id == id)
                {
                    return person;
                }
            }
            throw new NotImplementedException();
        }

        //Create method to update value in list
        public bool UpdatePerson(Person person){
            foreach (Person people in peopleRepo) {
                if (person.id == people.id) {
                    Debug.WriteLine(people.id);
                    Debug.WriteLine(people.status);
                    Debug.WriteLine(people.description);
                    people.status = person.status;
                    people.description = person.description;
                    Debug.WriteLine(person.id);
                    Debug.WriteLine(person.status);
                    Debug.WriteLine(person.description);
                    return true;
                }
            }
            return false;
        }

        public bool AddPerson(Person person) {
            if (!CheckId(person)) {
                peopleRepo.Add(person);
                return true;
            }
            return false;
        }

        public bool DeletePerson(int id) {
            foreach (Person person in peopleRepo)
            {
                if (person.id == id)
                {
                    peopleRepo.Remove(person);
                    return true;
                }
            }
            return false;
        }

        public bool CheckId(Person person) {
            foreach (Person people in peopleRepo) {
                if (people.Equals(person)) {
                    return true;
                }
            }
            return false;
        }
    }
}
