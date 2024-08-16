
class AnalyticsSDK1 {
  private static instance: AnalyticsSDK1;
  private events: any[] = [];
  private batchSize: number = 10; // Number of events to batch before sending
  private serverUrl: string = 'https://example.com/analytics';

  // Private constructor to prevent instantiation
  private constructor() { }

  // Static method to provide global access to the single instance
  public static getInstance(): AnalyticsSDK1 {
    if (!AnalyticsSDK1.instance) {
      AnalyticsSDK1.instance = new AnalyticsSDK1();
    }
    return AnalyticsSDK1.instance;
  }

  // Method to log an event
  public logEvent(event: any): void {
    this.events.push(event);
    if (this.events.length >= this.batchSize) {
      this.sendEvents();
    }
  }

  // Private method to send the events to the server
  private sendEvents(): void {
    if (this.events.length === 0) return;

    // Simulate sending data to the server
    console.log(`Sending ${this.events.length} events to ${this.serverUrl}`);
    // You would replace this with an actual HTTP request in a real implementation

    // Clear the events after sending
    this.events = [];
  }

  // Optionally, a method to manually trigger sending the events
  public flush(): void {
    this.sendEvents();
  }

  // Optionally, configure batch size and server URL
  public configure(options: { batchSize?: number; serverUrl?: string }): void {
    if (options.batchSize) this.batchSize = options.batchSize;
    if (options.serverUrl) this.serverUrl = options.serverUrl;
  }
}

// Usage example:

// Get the single instance of the SDK
const analytics = AnalyticsSDK1.getInstance();

// Log events throughout your application
analytics.logEvent({ type: 'page_view', page: '/home' });
analytics.logEvent({ type: 'click', element: 'signup_button' });

// Manually flush the remaining events, if needed
analytics.flush();
