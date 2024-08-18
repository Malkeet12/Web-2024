class PubSub1 {
  constructor() {
    this.topics = new Map();
    this.queue = [];
    this.processing = false;
    this.subscribeHook = null;
    this.unsubscribeHook = null;
    this.publishHook = null;
  }

  onSubscribe(callback) {
    this.subscribeHook = callback;
  }

  onUnsubscribe(callback) {
    this.unsubscribeHook = callback;
  }

  onPublish(callback) {
    this.publishHook = callback;
  }

  subscribe(topic, listener, priority = 0) {
    if (!this.topics.has(topic)) {
      this.topics.set(topic, []);
    }

    const subscriber = { listener, priority };
    this.topics.get(topic).push(subscriber);
    this.topics.get(topic).sort((a, b) => b.priority - a.priority); // Sort by priority

    if (this.subscribeHook) this.subscribeHook(topic, listener);

    return {
      unsubscribe: () => {
        this.topics.set(
          topic,
          this.topics.get(topic).filter((sub) => sub.listener !== listener)
        );
        if (this.unsubscribeHook) this.unsubscribeHook(topic, listener);
      },
    };
  }

  subscribeOnce(topic, listener) {
    const wrapper = (data) => {
      listener(data);
      this.unsubscribe(topic, wrapper); // Unsubscribe after first execution
    };
    return this.subscribe(topic, wrapper);
  }

  publish(topic, data) {
    if (this.publishHook) this.publishHook(topic, data);

    if (!this.topics.has(topic)) return;

    // Queue the message for batch processing
    this.queue.push({ topic, data });

    if (!this.processing) {
      setTimeout(() => this.processBatch(), 100); // Process after 100ms
    }
  }

  processBatch() {
    this.processing = true;

    const batch = this.queue;
    this.queue = [];

    batch.forEach(({ topic, data }) => {
      if (this.topics.has(topic)) {
        this.topics.get(topic).forEach(({ listener }) => {
          try {
            listener(data);
          } catch (error) {
            console.error(`Error in listener for topic "${topic}":`, error);
            this.publish("error", error); // Trigger an error event
          }
        });
      }
    });

    this.processing = false;
  }

  unsubscribe(topic, listener) {
    if (this.topics.has(topic)) {
      this.topics.set(
        topic,
        this.topics.get(topic).filter((sub) => sub.listener !== listener)
      );
    }
    if (this.unsubscribeHook) this.unsubscribeHook(topic, listener);
  }

  unsubscribeAll(topic) {
    if (this.topics.has(topic)) {
      this.topics.delete(topic);
      if (this.unsubscribeHook) this.unsubscribeHook(topic);
    }
  }

  listSubscribers(topic) {
    return this.topics.has(topic) ? [...this.topics.get(topic)] : [];
  }

  countSubscribers(topic) {
    return this.topics.has(topic) ? this.topics.get(topic).length : 0;
  }
}

// Usage Example:

// Create an instance of PubSub1
const pubSub = new PubSub1();

// Subscribe to a topic with a priority
const subscription = pubSub.subscribe(
  "myTopic",
  (data) => {
    console.log(`Received data: ${data}`);
  },
  10
);

// Subscribe to another listener with a lower priority
pubSub.subscribe(
  "myTopic",
  (data) => {
    console.log(`Low priority listener: ${data}`);
  },
  5
);

// Publish data to the topic
pubSub.publish("myTopic", "Hello, world!");

// Unsubscribe from the topic
subscription.unsubscribe();

// Unsubscribe all listeners for a topic
pubSub.unsubscribeAll("myTopic");

// Publish data again to see if it still receives data
pubSub.publish("myTopic", "This should not be logged");
