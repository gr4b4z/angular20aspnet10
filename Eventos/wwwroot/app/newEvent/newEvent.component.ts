import { Component, OnInit} from 'angular2/core';
import { RouteParams,Router,ROUTER_DIRECTIVES} from 'angular2/router';
import { PublicEvent, EventsService } from '../services/eventService';


@Component({
  selector: 'eventos-newEvent',
  templateUrl: 'app/newEvent/newEvent.component.html',
  directives:[ROUTER_DIRECTIVES]
})
export class NewEventComponent implements OnInit {
 event:PublicEvent;
 constructor(private _eventsService:EventsService,
    private _router:Router){
   
 }
 createEvent(event:PublicEvent){
   this._eventsService.addEvent(event).then(e=>{
       let route = ['Events']
        this._router.navigate(route);    
   });
 }
 cancel(){
     let route = ['Events']
      this._router.navigate(route);
 }
  
 
ngOnInit(){
    this.event = new PublicEvent();
}
  
  
}

