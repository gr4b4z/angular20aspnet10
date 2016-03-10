System.register(['angular2/core', 'angular2/router', '../services/registrationService', '../services/eventService'], function(exports_1, context_1) {
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
    var core_1, router_1, registrationService_1, eventService_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (registrationService_1_1) {
                registrationService_1 = registrationService_1_1;
            },
            function (eventService_1_1) {
                eventService_1 = eventService_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(_routerParams, _eventsService, _registrationService, _router) {
                    this._routerParams = _routerParams;
                    this._eventsService = _eventsService;
                    this._registrationService = _registrationService;
                    this._router = _router;
                    this.registration = new registrationService_1.RegistrationRequest();
                    this.publicEvent = new eventService_1.PublicEvent();
                    this.publicEvent2 = { id: "12", title: "sdd", maxAttendees: 0, numberOfRegistered: 0, location: "", description: "", date: "" };
                    this.maxNumberOfTickets = 5;
                }
                RegisterComponent.prototype.availableTickets = function (publicEvent) {
                    var max = publicEvent.maxAttendees - publicEvent.numberOfRegistered;
                    var array = [];
                    for (var a = max; a--;)
                        array.unshift(a);
                    return array;
                };
                RegisterComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._eventsService.getEvent(this._routerParams.params["id"])
                        .subscribe(function (evt) { return _this.publicEvent = evt; });
                };
                RegisterComponent.prototype.register = function (registration) {
                    var _this = this;
                    this._registrationService
                        .registerForEvent(this.publicEvent.id, registration)
                        .then(function (e) {
                        _this._router.navigate(['Events']);
                    });
                };
                RegisterComponent.prototype.cancel = function () {
                    var route = ['Events'];
                    this._router.navigate(route);
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'eventos-register',
                        templateUrl: 'app/registration/register.component.html',
                        providers: [registrationService_1.RegistrationService]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, eventService_1.EventsService, registrationService_1.RegistrationService, router_1.Router])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
