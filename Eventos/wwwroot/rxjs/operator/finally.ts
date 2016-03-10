import {Operator} from '../Operator';
import {Subscriber} from '../Subscriber';
import {Subscription} from '../Subscription';
import {Observable} from '../Observable';

/**
 * Returns an Observable that mirrors the source Observable, but will call a specified function when
 * the source terminates on complete or error.
 * @param {function} finallySelector function to be called when source terminates.
 * @returns {Observable} an Observable that mirrors the source, but will call the specified function on termination.
 */
export function _finally<T>(finallySelector: () => void): Observable<T> {
  return this.lift(new FinallyOperator(finallySelector));
}

class FinallyOperator<T> implements Operator<T, T> {
  constructor(private finallySelector: () => void) {
  }

  call(subscriber: Subscriber<T>): Subscriber<T> {
    return new FinallySubscriber(subscriber, this.finallySelector);
  }
}

class FinallySubscriber<T> extends Subscriber<T> {
  constructor(destination: Subscriber<T>, finallySelector: () => void) {
    super(destination);
    this.add(new Subscription(finallySelector));
  }
}