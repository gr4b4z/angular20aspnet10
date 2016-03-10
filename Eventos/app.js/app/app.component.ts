import { Component} from 'angular2/core';
import {  ROUTER_DIRECTIVES, RouteConfig } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';

import { NewEventComponent } from './newEvent/newEvent.component';
import { EventsComponent } from './events/events.component';
import { RegisterComponent } from './registration/register.component';
import { EventsService } from './services/eventService';


@Component({
    selector: 'eventos-app',
    templateUrl: 'app/app.component.html',
    directives: [NewEventComponent, RegisterComponent, EventsComponent, ROUTER_DIRECTIVES],
    providers: [ HTTP_PROVIDERS, EventsService]
})
@RouteConfig([
    { path: '/events', name: "Events", component: EventsComponent, useAsDefault: true },
    { path: '/new-event', name: "NewEvent", component: NewEventComponent },
    { path: '/register/:id', name: "Register", component: RegisterComponent },
])
export class AppComponent {


}

