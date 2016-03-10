using System;
using System.Collections.Generic;
using Microsoft.AspNet.Mvc;

namespace Eventos.Controllers
{
    public class PublicEvent {
        public string Id { get; set; }
        public string Title {get;set;}
        public int maxAttendees {get;set;}
        public int? numberOfRegistered {get;set;}
        public string Location {get;set;}
        public string Description {get;set;}
        public string Date {get;set;}
        public void DecreaseTickets(int number){
            Console.WriteLine("DecreaseTickets "+ number);
            numberOfRegistered+= number;
            maxAttendees-=number;
        }
    }
    
    public class EventsRepository{
         private static List<PublicEvent> _events ;
         private static string fileUrl = "events.json";
        static EventsRepository(){
              _events = Newtonsoft.Json.JsonConvert.DeserializeObject<List<PublicEvent>>(System.IO.File.ReadAllText(fileUrl));
        }
        
        public List<PublicEvent> GetAll(){
            return _events;
        }
        public PublicEvent Get(string id){
            Console.WriteLine($"Taking event ({id})");
            return _events.Find(e=>e.Id == id);
        }
        public void Add(PublicEvent @event){
            @event.Id = $"event-{_events.Count*10}";
            @event.numberOfRegistered = 0;
            _events.Add(@event);
            Console.WriteLine($"Event (title: {@event.Title}) was created");
        }
        
        
    }
    [Route("api/[controller]")]
    public class EventsController : Controller
    {
       EventsRepository _repository;
        public EventsController(){
          _repository = new EventsRepository();
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<PublicEvent> Get()
        {
            return _repository.GetAll();
        }
        // POST api/values
        [HttpPost]
        public PublicEvent Post([FromBody]PublicEvent @event)
        {
            _repository.Add(@event);
            return @event;
        }

    }
}
