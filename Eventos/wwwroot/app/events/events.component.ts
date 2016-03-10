import { Component, OnInit} from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { PublicEvent, EventsService } from '../services/eventService';
import { Observable } from 'rxjs/Rx';




@Component({
  selector: 'eventos-events',
  templateUrl: 'app/events/events.component.html',
  directives:[ROUTER_DIRECTIVES]
})
export class EventsComponent implements OnInit {
  events:Observable<PublicEvent[]>;

constructor(private _eventService : EventsService){

 }  
 
  ngOnInit() {
    if (!this.events) {
      this.events = this._eventService.getEvents()
    }
  }
}

