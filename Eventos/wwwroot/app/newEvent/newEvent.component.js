System.register(['angular2/core', 'angular2/router', '../services/eventService'], function(exports_1, context_1) {
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
    var core_1, router_1, eventService_1;
    var NewEventComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (eventService_1_1) {
                eventService_1 = eventService_1_1;
            }],
        execute: function() {
            NewEventComponent = (function () {
                function NewEventComponent(_eventsService, _router) {
                    this._eventsService = _eventsService;
                    this._router = _router;
                }
                NewEventComponent.prototype.createEvent = function (event) {
                    var _this = this;
                    this._eventsService.addEvent(event).then(function (e) {
                        var route = ['Events'];
                        _this._router.navigate(route);
                    });
                };
                NewEventComponent.prototype.cancel = function () {
                    var route = ['Events'];
                    this._router.navigate(route);
                };
                NewEventComponent.prototype.ngOnInit = function () {
                    this.event = new eventService_1.PublicEvent();
                };
                NewEventComponent = __decorate([
                    core_1.Component({
                        selector: 'eventos-newEvent',
                        templateUrl: 'app/newEvent/newEvent.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [eventService_1.EventsService, router_1.Router])
                ], NewEventComponent);
                return NewEventComponent;
            }());
            exports_1("NewEventComponent", NewEventComponent);
        }
    }
});
