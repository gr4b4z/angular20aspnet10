using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;

namespace Eventos.Controllers
{
    public class Registration {
        public string Email {get;set;}
        public string EventId { get; set; }
        public string Name {get;set;}
        public string Surname {get;set;}
        public int Tickets {get;set;}
     
    }
    
    public class RegistrationsRepository{
         private static List<Registration> _events ;
         private static string fileUrl = "events.json";
        static RegistrationsRepository(){
              _events = new List<Registration>();
        }
        
        public List<Registration> GetAll(){
            return _events;
        }
        public void Register(string eventId,Registration registration){
            registration.EventId = eventId;
            _events.Add(registration);
            Console.WriteLine("Event was created");
        }
        
        
    }
    [Route("api/[controller]")]
    public class RegistrationsController : Controller
    {
       private RegistrationsRepository _repository;
       private EventsRepository _eventsRepository;
        public RegistrationsController(){
          _repository = new RegistrationsRepository();
          _eventsRepository = new EventsRepository();
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Registration> Get()
        {
            return _repository.GetAll();
        }
        // POST api/values
        [HttpPost("{eventId}")]
        public Registration Register(string eventId,[FromBody]Registration registration)
        {
            Console.WriteLine("Registering user for an event " + eventId);
            _repository.Register(eventId,registration);
            _eventsRepository.Get(eventId).DecreaseTickets(registration.Tickets);
            return registration;
           
        }

    }
}
