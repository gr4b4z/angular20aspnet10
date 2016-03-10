import { Injectable } from 'angular2/core';
import { Http, Response ,Headers } from 'angular2/http';
import {Observable} from 'rxjs/Rx'; 


export class PublicEvent {
 
 id: string;
  title: string;
  maxAttendees: number = 0;
  numberOfRegistered: number = 0;
  location:string;
  date:string;
  description:string; 
}

@Injectable()
export class EventsService {
 
 constructor(private _http: Http) { }

  getEvents() {
    return this._http.get('api/events')
      .map((response: Response) => 
      <PublicEvent[]>response.json()
      );
  }

  getEvent(id: string) {
    return this.getEvents()
    .do(x=> console.log(x))
      .map(events => events.find(evt => evt.id == id));
  }
   private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
   addEvent(evt: PublicEvent):Promise<PublicEvent> {
     let headers = new Headers(); 
     headers.append("Content-type","application/json");
    return this._http.post('api/events',JSON.stringify(evt),{headers:headers})
      .map((response: Response) => 
            <PublicEvent>response.json()
      )
      .catch(this.handleError)
      .toPromise();
  }
}