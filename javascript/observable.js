class Observable {
  constructor(setup) {
    this._setup = setup;
  }

  subscribe(subscriber) {
    // equivalent to fire
    // a wrapper function/ object
    // is used to share the closure of outer function and modify the logics
    const subscriberWrapper = {
      unsubscribed: false,
      next(value) {
        if (this.unsubscribed) return;
        // we are relying on the scope of subscriber
        if (subscriber instanceof Function) return subscriber(value);
        return subscriber.next ? subscriber.next(value) : null;
      },
      error(value) {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.error ? subscriber.error(value) : null;
      },
      complete() {
        if (this.unsubscribed) return;
        this.unsubscribe();
        return subscriber.complete ? subscriber.complete() : null;
      },
      unsubscribe() {
        this.unsubscribed = true;
      },
    };
    this._setup(subscriberWrapper);
    return subscriberWrapper;
  }
}

function simpleObservableSetup(subscriber) {
  let count = 0;
  const intervalId = setInterval(() => {
    if (count < 5) {
      subscriber.next(count++);
    } else {
      subscriber.complete();
      clearInterval(intervalId);
    }
  }, 1000);

  // Handle unsubscription
  return () => {
    clearInterval(intervalId);
    subscriber.unsubscribe();
  };
}

// Creating an observable instance
const observable = new Observable(simpleObservableSetup);

// Subscribing to the observable
const subscription = observable.subscribe({
  next(value) {
    console.log(`Received value: ${value}`);
  },
  error(err) {
    console.error(`Error occurred: ${err}`);
  },
  complete() {
    console.log("Observable completed");
  },
});

// Example of unsubscribing after 3 seconds
setTimeout(() => {
  console.log("Unsubscribing...");
  subscription.unsubscribe();
}, 3000);
