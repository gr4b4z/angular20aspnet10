import { PromiseWrapper } from 'angular2/src/facade/async';
import { isPresent } from 'angular2/src/facade/lang';
import { RouteData, BLANK_ROUTE_DATA } from './instruction';
export class SyncRouteHandler {
    constructor(componentType, data) {
        this.componentType = componentType;
        /** @internal */
        this._resolvedComponent = null;
        this._resolvedComponent = PromiseWrapper.resolve(componentType);
        this.data = isPresent(data) ? new RouteData(data) : BLANK_ROUTE_DATA;
    }
    resolveComponentType() { return this._resolvedComponent; }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL3JvdXRlci9zeW5jX3JvdXRlX2hhbmRsZXIudHMiXSwibmFtZXMiOlsiU3luY1JvdXRlSGFuZGxlciIsIlN5bmNSb3V0ZUhhbmRsZXIuY29uc3RydWN0b3IiLCJTeW5jUm91dGVIYW5kbGVyLnJlc29sdmVDb21wb25lbnRUeXBlIl0sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLDJCQUEyQjtPQUNqRCxFQUFDLFNBQVMsRUFBTyxNQUFNLDBCQUEwQjtPQUdqRCxFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGVBQWU7QUFHekQ7SUFNRUEsWUFBbUJBLGFBQW1CQSxFQUFFQSxJQUEyQkE7UUFBaERDLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFNQTtRQUh0Q0EsZ0JBQWdCQTtRQUNoQkEsdUJBQWtCQSxHQUFpQkEsSUFBSUEsQ0FBQ0E7UUFHdENBLElBQUlBLENBQUNBLGtCQUFrQkEsR0FBR0EsY0FBY0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDaEVBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLElBQUlBLFNBQVNBLENBQUNBLElBQUlBLENBQUNBLEdBQUdBLGdCQUFnQkEsQ0FBQ0E7SUFDdkVBLENBQUNBO0lBRURELG9CQUFvQkEsS0FBbUJFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7QUFDMUVGLENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Byb21pc2VXcmFwcGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jJztcbmltcG9ydCB7aXNQcmVzZW50LCBUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG5pbXBvcnQge1JvdXRlSGFuZGxlcn0gZnJvbSAnLi9yb3V0ZV9oYW5kbGVyJztcbmltcG9ydCB7Um91dGVEYXRhLCBCTEFOS19ST1VURV9EQVRBfSBmcm9tICcuL2luc3RydWN0aW9uJztcblxuXG5leHBvcnQgY2xhc3MgU3luY1JvdXRlSGFuZGxlciBpbXBsZW1lbnRzIFJvdXRlSGFuZGxlciB7XG4gIHB1YmxpYyBkYXRhOiBSb3V0ZURhdGE7XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZWRDb21wb25lbnQ6IFByb21pc2U8YW55PiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGNvbXBvbmVudFR5cGU6IFR5cGUsIGRhdGE/OiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICAgIHRoaXMuX3Jlc29sdmVkQ29tcG9uZW50ID0gUHJvbWlzZVdyYXBwZXIucmVzb2x2ZShjb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLmRhdGEgPSBpc1ByZXNlbnQoZGF0YSkgPyBuZXcgUm91dGVEYXRhKGRhdGEpIDogQkxBTktfUk9VVEVfREFUQTtcbiAgfVxuXG4gIHJlc29sdmVDb21wb25lbnRUeXBlKCk6IFByb21pc2U8YW55PiB7IHJldHVybiB0aGlzLl9yZXNvbHZlZENvbXBvbmVudDsgfVxufVxuIl19