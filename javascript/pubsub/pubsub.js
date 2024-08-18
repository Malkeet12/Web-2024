// https://sahadar.github.io/pubsub/

//Wildcard Subscriptions
// Once-Only Listeners
//TODO Method: subscribeOnce
// Multiple subscriptions
// many namespaces, one callback
//one namespace, many callbacks
// Event Priority
//pubSub.subscribe('user.*', callback); // Listens to all user-related events

//Purpose: Automatically unsubscribe a listener after it has been invoked once.
// Implementation: Provide a subscribeOnce method.
// Benefits: Useful for events like initialization or single-use callbacks.
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, listener) {
    // If the topic doesn't exist, create it
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }

    // Add the listener to the topic
    this.topics[topic].push(listener);

    // Return an unsubscribe function
    return {
      unsubscribe: () => {
        this.topics[topic] = this.topics[topic].filter(
          (subscriber) => subscriber !== listener
        );
      },
    };
  }

  publish(topic, data) {
    console.log(topic, data);
    // If the topic doesn't exist, return early
    if (!this.topics[topic]) {
      return;
    }

    // Call each listener with the supplied data
    this.topics[topic].forEach((listener) => listener(data));
  }

  unsubscribeAll(topic) {
    // Remove all listeners from the topic
    if (this.topics[topic]) {
      delete this.topics[topic];
    }
  }
}

// Usage Example:

// Create an instance of PubSub
const pubSub = new PubSub();

// Subscribe to a topic
const subscription = pubSub.subscribe("myTopic", (data) => {
  console.log(`Received data: ${data}`);
});

// Publish data to the topic
pubSub.publish("myTopic", "Hello, world!");

// Unsubscribe from the topic
subscription.unsubscribe();

// Publish data again to see if it still receives data
pubSub.publish("myTopic", "This should not be logged");

// Subscribe again and unsubscribe all
pubSub.subscribe("myTopic", (data) => {
  console.log(`Received data again: ${data}`);
});

// Unsubscribe all listeners
pubSub.unsubscribeAll("myTopic");

// Publish data again to see if it still receives data
pubSub.publish("myTopic", "This should also not be logged");

// var number = 0;

// var subscription = pubsub.subscribe(
//   ["hello/world", "goodbye/world"],
//   function () {
//     number++;
//   }
// );

// pubsub.publish("hello/world");
// console.log(number); //1
// pubsub.publish("goodbye/world");
// console.log(number); //2
// pubsub.unsubscribe(subscription);

// pubsub.publish("hello/world");
// console.log(number); //2
// pubsub.publish("goodbye/world");
// console.log(number); //2
