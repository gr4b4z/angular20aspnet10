import { global, noop } from 'angular2/src/facade/lang';
export { PromiseWrapper } from 'angular2/src/facade/promise';
import { Subject } from 'rxjs/Subject';
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { toPromise } from 'rxjs/operator/toPromise';
export { Observable } from 'rxjs/Observable';
export { Subject } from 'rxjs/Subject';
export class TimerWrapper {
    static setTimeout(fn, millis) {
        return global.setTimeout(fn, millis);
    }
    static clearTimeout(id) { global.clearTimeout(id); }
    static setInterval(fn, millis) {
        return global.setInterval(fn, millis);
    }
    static clearInterval(id) { global.clearInterval(id); }
}
export class ObservableWrapper {
    // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
    static subscribe(emitter, onNext, onError, onComplete = () => { }) {
        onError = (typeof onError === "function") && onError || noop;
        onComplete = (typeof onComplete === "function") && onComplete || noop;
        return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
    }
    static isObservable(obs) { return !!obs.subscribe; }
    /**
     * Returns whether `obs` has any subscribers listening to events.
     */
    static hasSubscribers(obs) { return obs.observers.length > 0; }
    static dispose(subscription) { subscription.unsubscribe(); }
    /**
     * @deprecated - use callEmit() instead
     */
    static callNext(emitter, value) { emitter.next(value); }
    static callEmit(emitter, value) { emitter.emit(value); }
    static callError(emitter, error) { emitter.error(error); }
    static callComplete(emitter) { emitter.complete(); }
    static fromPromise(promise) {
        return PromiseObservable.create(promise);
    }
    static toPromise(obj) { return toPromise.call(obj); }
}
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * Use Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 */
export class EventEmitter extends Subject {
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    constructor(isAsync = true) {
        super();
        this._isAsync = isAsync;
    }
    emit(value) { super.next(value); }
    /**
     * @deprecated - use .emit(value) instead
     */
    next(value) { super.next(value); }
    subscribe(generatorOrNext, error, complete) {
        let schedulerFn;
        let errorFn = (err) => null;
        let completeFn = () => null;
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this._isAsync ? (value) => { setTimeout(() => generatorOrNext.next(value)); } :
                    (value) => { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this._isAsync ? (err) => { setTimeout(() => generatorOrNext.error(err)); } :
                        (err) => { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this._isAsync ? () => { setTimeout(() => generatorOrNext.complete()); } :
                        () => { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this._isAsync ? (value) => { setTimeout(() => generatorOrNext(value)); } :
                    (value) => { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this._isAsync ? (err) => { setTimeout(() => error(err)); } : (err) => { error(err); };
            }
            if (complete) {
                completeFn =
                    this._isAsync ? () => { setTimeout(() => complete()); } : () => { complete(); };
            }
        }
        return super.subscribe(schedulerFn, errorFn, completeFn);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhbmd1bGFyMi9zcmMvZmFjYWRlL2FzeW5jLnRzIl0sIm5hbWVzIjpbIlRpbWVyV3JhcHBlciIsIlRpbWVyV3JhcHBlci5zZXRUaW1lb3V0IiwiVGltZXJXcmFwcGVyLmNsZWFyVGltZW91dCIsIlRpbWVyV3JhcHBlci5zZXRJbnRlcnZhbCIsIlRpbWVyV3JhcHBlci5jbGVhckludGVydmFsIiwiT2JzZXJ2YWJsZVdyYXBwZXIiLCJPYnNlcnZhYmxlV3JhcHBlci5zdWJzY3JpYmUiLCJPYnNlcnZhYmxlV3JhcHBlci5pc09ic2VydmFibGUiLCJPYnNlcnZhYmxlV3JhcHBlci5oYXNTdWJzY3JpYmVycyIsIk9ic2VydmFibGVXcmFwcGVyLmRpc3Bvc2UiLCJPYnNlcnZhYmxlV3JhcHBlci5jYWxsTmV4dCIsIk9ic2VydmFibGVXcmFwcGVyLmNhbGxFbWl0IiwiT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbEVycm9yIiwiT2JzZXJ2YWJsZVdyYXBwZXIuY2FsbENvbXBsZXRlIiwiT2JzZXJ2YWJsZVdyYXBwZXIuZnJvbVByb21pc2UiLCJPYnNlcnZhYmxlV3JhcHBlci50b1Byb21pc2UiLCJFdmVudEVtaXR0ZXIiLCJFdmVudEVtaXR0ZXIuY29uc3RydWN0b3IiLCJFdmVudEVtaXR0ZXIuZW1pdCIsIkV2ZW50RW1pdHRlci5uZXh0IiwiRXZlbnRFbWl0dGVyLnN1YnNjcmliZSJdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxNQUFNLEVBQWEsSUFBSSxFQUFDLE1BQU0sMEJBQTBCO0FBQ2hFLFNBQVEsY0FBYyxRQUF5Qiw2QkFBNkIsQ0FBQztPQUd0RSxFQUFDLE9BQU8sRUFBQyxNQUFNLGNBQWM7T0FJN0IsRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG1DQUFtQztPQUM1RCxFQUFDLFNBQVMsRUFBQyxNQUFNLHlCQUF5QjtBQUVqRCxTQUFRLFVBQVUsUUFBTyxpQkFBaUIsQ0FBQztBQUMzQyxTQUFRLE9BQU8sUUFB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QSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDMUJBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBLFFBQVFBLEdBQUdBLENBQUNBLEdBQUdBLE9BQU9BLFVBQVVBLENBQUNBLE1BQU1BLGVBQWVBLENBQUNBLEtBQUtBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO29CQUMxREEsS0FBQ0EsR0FBR0EsT0FBT0EsZUFBZUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDckVBLENBQUNBO1lBRURBLEVBQUVBLENBQUNBLENBQUNBLGVBQWVBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBO2dCQUM3QkEsVUFBVUEsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsUUFBUUEsVUFBVUEsQ0FBQ0EsTUFBTUEsZUFBZUEsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZEQSxZQUFRQSxlQUFlQSxDQUFDQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUNyRUEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsV0FBV0EsR0FBR0EsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsQ0FBQ0EsS0FBS0EsT0FBT0EsVUFBVUEsQ0FBQ0EsTUFBTUEsZUFBZUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3hEQSxLQUFDQSxLQUFLQSxPQUFPQSxlQUFlQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUVyRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ1ZBLE9BQU9BO29CQUNIQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxDQUFDQSxHQUFHQSxPQUFPQSxVQUFVQSxDQUFDQSxNQUFNQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxDQUFDQSxHQUFHQSxPQUFPQSxLQUFLQSxDQUFDQSxHQUFHQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUM1RkEsQ0FBQ0E7WUFFREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2JBLFVBQVVBO29CQUNOQSxJQUFJQSxDQUFDQSxRQUFRQSxHQUFHQSxRQUFRQSxVQUFVQSxDQUFDQSxNQUFNQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQSxHQUFHQSxRQUFRQSxRQUFRQSxFQUFFQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUN0RkEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFFREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsV0FBV0EsRUFBRUEsT0FBT0EsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7SUFDM0RBLENBQUNBO0FBQ0hKLENBQUNBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbCwgaXNQcmVzZW50LCBub29wfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuZXhwb3J0IHtQcm9taXNlV3JhcHBlciwgUHJvbWlzZUNvbXBsZXRlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9wcm9taXNlJztcblxuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7T3BlcmF0b3J9IGZyb20gJ3J4anMvT3BlcmF0b3InO1xuXG5pbXBvcnQge1Byb21pc2VPYnNlcnZhYmxlfSBmcm9tICdyeGpzL29ic2VydmFibGUvUHJvbWlzZU9ic2VydmFibGUnO1xuaW1wb3J0IHt0b1Byb21pc2V9IGZyb20gJ3J4anMvb3BlcmF0b3IvdG9Qcm9taXNlJztcblxuZXhwb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuZXhwb3J0IHtTdWJqZWN0fSBmcm9tICdyeGpzL1N1YmplY3QnO1xuXG5leHBvcnQgY2xhc3MgVGltZXJXcmFwcGVyIHtcbiAgc3RhdGljIHNldFRpbWVvdXQoZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgbWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBnbG9iYWwuc2V0VGltZW91dChmbiwgbWlsbGlzKTtcbiAgfVxuICBzdGF0aWMgY2xlYXJUaW1lb3V0KGlkOiBudW1iZXIpOiB2b2lkIHsgZ2xvYmFsLmNsZWFyVGltZW91dChpZCk7IH1cblxuICBzdGF0aWMgc2V0SW50ZXJ2YWwoZm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZCwgbWlsbGlzOiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBnbG9iYWwuc2V0SW50ZXJ2YWwoZm4sIG1pbGxpcyk7XG4gIH1cbiAgc3RhdGljIGNsZWFySW50ZXJ2YWwoaWQ6IG51bWJlcik6IHZvaWQgeyBnbG9iYWwuY2xlYXJJbnRlcnZhbChpZCk7IH1cbn1cblxuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVXcmFwcGVyIHtcbiAgLy8gVE9ETyh2c2F2a2luKTogd2hlbiB3ZSB1c2UgcnhuZXh0LCB0cnkgaW5mZXJyaW5nIHRoZSBnZW5lcmljIHR5cGUgZnJvbSB0aGUgZmlyc3QgYXJnXG4gIHN0YXRpYyBzdWJzY3JpYmU8VD4oZW1pdHRlcjogYW55LCBvbk5leHQ6ICh2YWx1ZTogVCkgPT4gdm9pZCwgb25FcnJvcj86IChleGNlcHRpb246IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiAoKSA9PiB2b2lkID0gKCkgPT4ge30pOiBPYmplY3Qge1xuICAgIG9uRXJyb3IgPSAodHlwZW9mIG9uRXJyb3IgPT09IFwiZnVuY3Rpb25cIikgJiYgb25FcnJvciB8fCBub29wO1xuICAgIG9uQ29tcGxldGUgPSAodHlwZW9mIG9uQ29tcGxldGUgPT09IFwiZnVuY3Rpb25cIikgJiYgb25Db21wbGV0ZSB8fCBub29wO1xuICAgIHJldHVybiBlbWl0dGVyLnN1YnNjcmliZSh7bmV4dDogb25OZXh0LCBlcnJvcjogb25FcnJvciwgY29tcGxldGU6IG9uQ29tcGxldGV9KTtcbiAgfVxuXG4gIHN0YXRpYyBpc09ic2VydmFibGUob2JzOiBhbnkpOiBib29sZWFuIHsgcmV0dXJuICEhb2JzLnN1YnNjcmliZTsgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXIgYG9ic2AgaGFzIGFueSBzdWJzY3JpYmVycyBsaXN0ZW5pbmcgdG8gZXZlbnRzLlxuICAgKi9cbiAgc3RhdGljIGhhc1N1YnNjcmliZXJzKG9iczogRXZlbnRFbWl0dGVyPGFueT4pOiBib29sZWFuIHsgcmV0dXJuIG9icy5vYnNlcnZlcnMubGVuZ3RoID4gMDsgfVxuXG4gIHN0YXRpYyBkaXNwb3NlKHN1YnNjcmlwdGlvbjogYW55KSB7IHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpOyB9XG5cbiAgLyoqXG4gICAqIEBkZXByZWNhdGVkIC0gdXNlIGNhbGxFbWl0KCkgaW5zdGVhZFxuICAgKi9cbiAgc3RhdGljIGNhbGxOZXh0KGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+LCB2YWx1ZTogYW55KSB7IGVtaXR0ZXIubmV4dCh2YWx1ZSk7IH1cblxuICBzdGF0aWMgY2FsbEVtaXQoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIHZhbHVlOiBhbnkpIHsgZW1pdHRlci5lbWl0KHZhbHVlKTsgfVxuXG4gIHN0YXRpYyBjYWxsRXJyb3IoZW1pdHRlcjogRXZlbnRFbWl0dGVyPGFueT4sIGVycm9yOiBhbnkpIHsgZW1pdHRlci5lcnJvcihlcnJvcik7IH1cblxuICBzdGF0aWMgY2FsbENvbXBsZXRlKGVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxhbnk+KSB7IGVtaXR0ZXIuY29tcGxldGUoKTsgfVxuXG4gIHN0YXRpYyBmcm9tUHJvbWlzZShwcm9taXNlOiBQcm9taXNlPGFueT4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiBQcm9taXNlT2JzZXJ2YWJsZS5jcmVhdGUocHJvbWlzZSk7XG4gIH1cblxuICBzdGF0aWMgdG9Qcm9taXNlKG9iajogT2JzZXJ2YWJsZTxhbnk+KTogUHJvbWlzZTxhbnk+IHsgcmV0dXJuIHRvUHJvbWlzZS5jYWxsKG9iaik7IH1cbn1cblxuLyoqXG4gKiBVc2UgYnkgZGlyZWN0aXZlcyBhbmQgY29tcG9uZW50cyB0byBlbWl0IGN1c3RvbSBFdmVudHMuXG4gKlxuICogIyMjIEV4YW1wbGVzXG4gKlxuICogSW4gdGhlIGZvbGxvd2luZyBleGFtcGxlLCBgWmlwcHlgIGFsdGVybmF0aXZlbHkgZW1pdHMgYG9wZW5gIGFuZCBgY2xvc2VgIGV2ZW50cyB3aGVuIGl0c1xuICogdGl0bGUgZ2V0cyBjbGlja2VkOlxuICpcbiAqIGBgYFxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnemlwcHknLFxuICogICB0ZW1wbGF0ZTogYFxuICogICA8ZGl2IGNsYXNzPVwiemlwcHlcIj5cbiAqICAgICA8ZGl2IChjbGljayk9XCJ0b2dnbGUoKVwiPlRvZ2dsZTwvZGl2PlxuICogICAgIDxkaXYgW2hpZGRlbl09XCIhdmlzaWJsZVwiPlxuICogICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICogICAgIDwvZGl2PlxuICogIDwvZGl2PmB9KVxuICogZXhwb3J0IGNsYXNzIFppcHB5IHtcbiAqICAgdmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gKiAgIEBPdXRwdXQoKSBvcGVuOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAqICAgQE91dHB1dCgpIGNsb3NlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAqXG4gKiAgIHRvZ2dsZSgpIHtcbiAqICAgICB0aGlzLnZpc2libGUgPSAhdGhpcy52aXNpYmxlO1xuICogICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAqICAgICAgIHRoaXMub3Blbi5lbWl0KG51bGwpO1xuICogICAgIH0gZWxzZSB7XG4gKiAgICAgICB0aGlzLmNsb3NlLmVtaXQobnVsbCk7XG4gKiAgICAgfVxuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBVc2UgUnguT2JzZXJ2YWJsZSBidXQgcHJvdmlkZXMgYW4gYWRhcHRlciB0byBtYWtlIGl0IHdvcmsgYXMgc3BlY2lmaWVkIGhlcmU6XG4gKiBodHRwczovL2dpdGh1Yi5jb20vamh1c2Fpbi9vYnNlcnZhYmxlLXNwZWNcbiAqXG4gKiBPbmNlIGEgcmVmZXJlbmNlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBzcGVjIGlzIGF2YWlsYWJsZSwgc3dpdGNoIHRvIGl0LlxuICovXG5leHBvcnQgY2xhc3MgRXZlbnRFbWl0dGVyPFQ+IGV4dGVuZHMgU3ViamVjdDxUPiB7XG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2lzQXN5bmM6IGJvb2xlYW47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgW0V2ZW50RW1pdHRlcl0sIHdoaWNoIGRlcGVuZGluZyBvbiBbaXNBc3luY10sXG4gICAqIGRlbGl2ZXJzIGV2ZW50cyBzeW5jaHJvbm91c2x5IG9yIGFzeW5jaHJvbm91c2x5LlxuICAgKi9cbiAgY29uc3RydWN0b3IoaXNBc3luYzogYm9vbGVhbiA9IHRydWUpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuX2lzQXN5bmMgPSBpc0FzeW5jO1xuICB9XG5cbiAgZW1pdCh2YWx1ZTogVCkgeyBzdXBlci5uZXh0KHZhbHVlKTsgfVxuXG4gIC8qKlxuICAgKiBAZGVwcmVjYXRlZCAtIHVzZSAuZW1pdCh2YWx1ZSkgaW5zdGVhZFxuICAgKi9cbiAgbmV4dCh2YWx1ZTogYW55KSB7IHN1cGVyLm5leHQodmFsdWUpOyB9XG5cbiAgc3Vic2NyaWJlKGdlbmVyYXRvck9yTmV4dD86IGFueSwgZXJyb3I/OiBhbnksIGNvbXBsZXRlPzogYW55KTogYW55IHtcbiAgICBsZXQgc2NoZWR1bGVyRm47XG4gICAgbGV0IGVycm9yRm4gPSAoZXJyOiBhbnkpID0+IG51bGw7XG4gICAgbGV0IGNvbXBsZXRlRm4gPSAoKSA9PiBudWxsO1xuXG4gICAgaWYgKGdlbmVyYXRvck9yTmV4dCAmJiB0eXBlb2YgZ2VuZXJhdG9yT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgc2NoZWR1bGVyRm4gPSB0aGlzLl9pc0FzeW5jID8gKHZhbHVlKSA9PiB7IHNldFRpbWVvdXQoKCkgPT4gZ2VuZXJhdG9yT3JOZXh0Lm5leHQodmFsdWUpKTsgfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmFsdWUpID0+IHsgZ2VuZXJhdG9yT3JOZXh0Lm5leHQodmFsdWUpOyB9O1xuXG4gICAgICBpZiAoZ2VuZXJhdG9yT3JOZXh0LmVycm9yKSB7XG4gICAgICAgIGVycm9yRm4gPSB0aGlzLl9pc0FzeW5jID8gKGVycikgPT4geyBzZXRUaW1lb3V0KCgpID0+IGdlbmVyYXRvck9yTmV4dC5lcnJvcihlcnIpKTsgfSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVycikgPT4geyBnZW5lcmF0b3JPck5leHQuZXJyb3IoZXJyKTsgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGdlbmVyYXRvck9yTmV4dC5jb21wbGV0ZSkge1xuICAgICAgICBjb21wbGV0ZUZuID0gdGhpcy5faXNBc3luYyA/ICgpID0+IHsgc2V0VGltZW91dCgoKSA9PiBnZW5lcmF0b3JPck5leHQuY29tcGxldGUoKSk7IH0gOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHsgZ2VuZXJhdG9yT3JOZXh0LmNvbXBsZXRlKCk7IH07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjaGVkdWxlckZuID0gdGhpcy5faXNBc3luYyA/ICh2YWx1ZSkgPT4geyBzZXRUaW1lb3V0KCgpID0+IGdlbmVyYXRvck9yTmV4dCh2YWx1ZSkpOyB9IDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSkgPT4geyBnZW5lcmF0b3JPck5leHQodmFsdWUpOyB9O1xuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgZXJyb3JGbiA9XG4gICAgICAgICAgICB0aGlzLl9pc0FzeW5jID8gKGVycikgPT4geyBzZXRUaW1lb3V0KCgpID0+IGVycm9yKGVycikpOyB9IDogKGVycikgPT4geyBlcnJvcihlcnIpOyB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgY29tcGxldGVGbiA9XG4gICAgICAgICAgICB0aGlzLl9pc0FzeW5jID8gKCkgPT4geyBzZXRUaW1lb3V0KCgpID0+IGNvbXBsZXRlKCkpOyB9IDogKCkgPT4geyBjb21wbGV0ZSgpOyB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBlci5zdWJzY3JpYmUoc2NoZWR1bGVyRm4sIGVycm9yRm4sIGNvbXBsZXRlRm4pO1xuICB9XG59XG4iXX0=