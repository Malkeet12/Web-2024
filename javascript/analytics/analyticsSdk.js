class AnalyticsSDK {
  #events = [];
  batchSize;
  serverUrl;

  constructor(batchSize = 10, serverUrl = "https://example.com/analytics") {
    if (AnalyticsSDK.instance) {
      return AnalyticsSDK.instance;
    }

    this.batchSize = batchSize;
    this.serverUrl = serverUrl;

    AnalyticsSDK.instance = this;
    return this;
  }

  // Public method to log an event
  logEvent(event) {
    this.#events.push(event);
    if (this.#events.length >= this.batchSize) {
      this.#sendEvents(); // Calls the private method
    }
  }

  // Private method to send the events to the server
  #sendEvents() {
    if (this.#events.length === 0) return;

    console.log(`Sending ${this.#events.length} events to ${this.serverUrl}`);
    // Actual server communication would go here

    this.#events = [];
  }

  // Public method to manually trigger sending the events
  flush() {
    this.#sendEvents(); // Calls the private method
  }
}

// Create an instance of the SDK
const analytics1 = new AnalyticsSDK(5, "https://api.example.com/analytics");

// Log events throughout your application
analytics1.logEvent({ type: "page_view", page: "/home" });
analytics1.logEvent({ type: "click", element: "signup_button" });
analytics1.logEvent({ type: "click", element: "learn_more_button" });
analytics1.logEvent({ type: "click", element: "purchase_button" });
analytics1.logEvent({ type: "purchase", amount: 100 });

// Attempt to create another instance with different settings
const analytics2 = new AnalyticsSDK(
  2,
  "https://api.anotherexample.com/analytics"
);

// Both instances should be the same, and the original settings should be preserved
console.log(analytics1 === analytics2); // true
console.log(analytics2.batchSize); // 5
console.log(analytics2.serverUrl); // 'https://api.example.com/analytics'

// Manually flush the remaining events, if needed
analytics2.flush();

// class AnalyticsSDK {
//   #events = [];
//   #batchSize;
//   #serverUrl;
//   #maxRetries;
//   #retryDelay;

//   constructor(batchSize = 10, serverUrl = 'https://example.com/analytics', maxRetries = 3, retryDelay = 1000) {
//     if (AnalyticsSDK.instance) {
//       return AnalyticsSDK.instance;
//     }

//     this.#batchSize = batchSize;
//     this.#serverUrl = serverUrl;
//     this.#maxRetries = maxRetries;
//     this.#retryDelay = retryDelay;

//     AnalyticsSDK.instance = this;
//     return this;
//   }

//   // Public method to log an event
//   logEvent(event) {
//     this.#events.push(event);
//     if (this.#events.length >= this.#batchSize) {
//       this.#sendEvents();
//     }
//   }

//   // Private method to send the events to the server
//   async #sendEvents() {
//     if (this.#events.length === 0) return;

//     const eventsToSend = [...this.#events];
//     this.#events = [];

//     try {
//       await this.#sendRequest(eventsToSend, 0);
//       console.log(`Successfully sent ${eventsToSend.length} events`);
//     } catch (error) {
//       console.error(`Failed to send events after ${this.#maxRetries} retries`, error);
//       // Optionally, requeue the events to try again later
//       this.#events.push(...eventsToSend);
//     }
//   }

//   // Private method to handle the request and retry if it fails
//   async #sendRequest(events, attempt) {
//     try {
//       console.log(`Sending events to ${this.#serverUrl} (attempt ${attempt + 1})`);
//       await this.#mockApiRequest(events); // Replace with actual server request in production
//     } catch (error) {
//       if (attempt < this.#maxRetries) {
//         console.log(`Retrying in ${this.#retryDelay}ms...`);
//         await this.#delay(this.#retryDelay);
//         return this.#sendRequest(events, attempt + 1);
//       } else {
//         throw error;
//       }
//     }
//   }

//   // Private method to simulate delay
//   #delay(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

//   // Mock API request method (this would be your actual server request in production)
//   #mockApiRequest(events) {
//     return new Promise((resolve, reject) => {
//       const shouldFail = Math.floor(Math.random() * 5) === 0; // Fail every 5th request
//       if (shouldFail) {
//         reject(new Error('Mock API failure'));
//       } else {
//         resolve();
//       }
//     });
//   }

//   // Public method to manually trigger sending the events
//   flush() {
//     this.#sendEvents();
//   }
// }

// // Usage example:

// const analytics = new AnalyticsSDK(5, 'https://api.example.com/analytics', 3, 1000);

// // Log events throughout your application
// analytics.logEvent({ type: 'page_view', page: '/home' });
// analytics.logEvent({ type: 'click', element: 'signup_button' });
// analytics.logEvent({ type: 'click', element: 'learn_more_button' });
// analytics.logEvent({ type: 'click', element: 'purchase_button' });
// analytics.logEvent({ type: 'purchase', amount: 100 });

// // Manually flush the remaining events, if needed
// analytics.flush();
