import { Component,OnInit} from 'angular2/core';
import { RouteParams,Router} from 'angular2/router';
import { IRegistrationRequest,RegistrationRequest, RegistrationService } from '../services/registrationService';
import { EventsService, PublicEvent } from '../services/eventService';

import {Observable} from 'rxjs/Rx'; 



@Component({
  selector: 'eventos-register',
  templateUrl: 'app/registration/register.component.html',
  providers:[RegistrationService]
})
export class RegisterComponent implements OnInit {
 registration:IRegistrationRequest = new RegistrationRequest();
 publicEvent:PublicEvent = new PublicEvent();
 publicEvent2:PublicEvent = {id:"12",title:"sdd",maxAttendees:0,numberOfRegistered:0,location:"",description:"",date:""}; 
 maxNumberOfTickets = 5;
  
 constructor(
     private _routerParams: RouteParams,
     private _eventsService:EventsService,
     private _registrationService:RegistrationService,
     private _router:Router
     ){
   
 }
 availableTickets(publicEvent:PublicEvent){
     var max = publicEvent.maxAttendees - publicEvent.numberOfRegistered;
     let array = [];
     for(let a = max;a--;) array.unshift(a);
     return array;
     
 }
 ngOnInit(){
    this._eventsService.getEvent(this._routerParams.params["id"])
        .subscribe(evt => this.publicEvent = evt );
 }
 register(registration:IRegistrationRequest){
     this._registrationService
     .registerForEvent(this.publicEvent.id , registration)
     .then(e=>{
        this._router.navigate(['Events']);    
     });
     
     
 }
 cancel(){
     let route = ['Events']
      this._router.navigate(route);
 }
  
}

