using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Services
{
    //out = reference passing vs value
    //in = pass reference but dont modify
    interface IService<T>
    {
        List<T> GetAllEntities();
        T GetOne(int id);
        bool UpdatePerson(T obj);
        bool AddPerson(T obj);
        bool DeletePerson(int id);
    }
}
