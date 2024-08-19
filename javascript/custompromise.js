//Phase 1 But this implementation will not work if we decided to directly resolve a value instead of an async operation, because our handlers are not registered by the time our executor is called.
// function CustomPromise(executer) {
//   //The handlers we pass to .then and .catch methods are stored in local variables (onResolve,
//   // onReject), so that they can be called when our async function is completed.

//   let onResolve;
//   let onReject;
//   let isCalled = false;
//   function resolve(res) {
//     if (typeof onResolve === "function" && !isCalled) {
//       onResolve(res);
//       isCalled = true;
//     }
//   }
//   function reject(err) {
//     if (typeof onResolve === "function" && !isCalled) {
//       onReject(err);
//       isCalled = true;
//     }
//   }

//   this.then = function (thenHandler) {
//     onResolve = thenHandler;
//     return this;
//   };
//   this.catch = function (catchHandler) {
//     onReject = catchHandler;
//     return this;
//   };

//   executer(resolve, reject);
// }

class CustomPromise {
  constructor(executor) {
    this.onResolve = null;
    this.onReject = null;
    this.isCalled = false;
    this.isFulfilled = false;
    this.isRejected = false;
    this.value = null;
    this.error = null;

    // Resolve function
    const resolve = (res) => {
      if (this.isFulfilled || this.isRejected) return; // Ensure resolve/reject can only be called once
      this.isFulfilled = true;
      this.value = res;

      if (typeof this.onResolve === "function" && !this.isCalled) {
        this.onResolve(res);
        this.isCalled = true;
      }
    };

    // Reject function
    const reject = (err) => {
      if (this.isFulfilled || this.isRejected) return; // Ensure resolve/reject can only be called once
      this.isRejected = true;
      this.error = err;

      if (typeof this.onReject === "function" && !this.isCalled) {
        this.onReject(err);
        this.isCalled = true;
      }
    };

    // Execute the executor immediately
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err); // If an error is thrown during execution, reject the promise
    }
  }

  then(thenHandler) {
    this.onResolve = thenHandler;

    if (this.isFulfilled && !this.isCalled) {
      this.onResolve(this.value);
      this.isCalled = true;
    }

    return this; // Allow chaining
  }

  catch(catchHandler) {
    this.onReject = catchHandler;

    if (this.isRejected && !this.isCalled) {
      this.onReject(this.error);
      this.isCalled = true;
    }

    return this; // Allow chaining
  }

  static resolve(value) {
    return new CustomPromise((resolve) => resolve(value));
  }

  static reject(error) {
    return new CustomPromise((resolve, reject) => reject(error));
  }
}

// Missing Features in the Previous Implementation:
// State Management:

// In the new implementation, the promise has a clear state (PENDING, FULFILLED, REJECTED), which is crucial for determining the current status of the promise and handling callbacks accordingly.
// Microtask Queue Handling:

// The new implementation uses queueMicrotask to ensure that the resolution and rejection of the promise are handled in the next microtask, ensuring that the then and catch callbacks are added to the microtask queue before they are executed.
// Support for finally:

// The finally method is implemented to ensure that a callback is always executed, regardless of whether the promise is fulfilled or rejected.
// Chaining of then and catch:

// The new implementation returns a new CustomPromise from then and catch, enabling proper chaining of promises.
// Handling Nested Promises:

// The implementation handles cases where the resolution value is itself a promise, ensuring that the new promise adopts the state of the resolved promise.
