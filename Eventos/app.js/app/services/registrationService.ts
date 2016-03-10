import { Injectable } from 'angular2/core';
import { Http, Response ,Headers } from 'angular2/http';
import {Observable} from 'rxjs/Rx'; 



export interface IRegistrationRequest {
  name: string;
  surname: string;
  tickets?: number;
  email:string;
   
}

export class RegistrationRequest implements IRegistrationRequest {
  name: string;
  surname: string;
  tickets: number = 0;
  email:string;
   
}

@Injectable()
export class RegistrationService {
 
 constructor(private _http: Http) { }
  
   private handleError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  
    
    registerForEvent(eventId, registrationRequest:RegistrationRequest) {
     let headers = new Headers(); 
     headers.append("Content-type","application/json");
     let url = 'api/registrations/'+eventId;
      var data = JSON.stringify(registrationRequest);
     
    return this._http.post(url,data,{headers:headers})
      .map((response: Response) => 
            <RegistrationRequest>response.json()
      )
      .catch(this.handleError)
      .toPromise();
  }
  
 
    
}