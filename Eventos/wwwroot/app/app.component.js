System.register(['angular2/core', 'angular2/router', 'angular2/http', './newEvent/newEvent.component', './events/events.component', './registration/register.component', './services/eventService'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, newEvent_component_1, events_component_1, register_component_1, eventService_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (newEvent_component_1_1) {
                newEvent_component_1 = newEvent_component_1_1;
            },
            function (events_component_1_1) {
                events_component_1 = events_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (eventService_1_1) {
                eventService_1 = eventService_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'eventos-app',
                        templateUrl: 'app/app.component.html',
                        directives: [newEvent_component_1.NewEventComponent, register_component_1.RegisterComponent, events_component_1.EventsComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS, eventService_1.EventsService]
                    }),
                    router_1.RouteConfig([
                        { path: '/events', name: "Events", component: events_component_1.EventsComponent, useAsDefault: true },
                        { path: '/new-event', name: "NewEvent", component: newEvent_component_1.NewEventComponent },
                        { path: '/register/:id', name: "Register", component: register_component_1.RegisterComponent },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
