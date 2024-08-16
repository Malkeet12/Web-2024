// class RateLimiter {
//     static instance: any
//     private requests: {}
//     private limit: number

//     constructor() {
//         if (RateLimiter.instance) return
//         this.requests = {}
//         this.limit = 1
//         RateLimiter.instance = this
//     }
//     isAllowed(url: string): Boolean {
//         if (!this.requests[url]) {
//             this.requests[url] = {
//                 count: 1, timestamp: Date.now()
//             }
//             return true
//         }

//         if (this.requests[url].count >= this.limit && this.requests[url].timestamp - Date.now() < 1000) {
//             return false
//         }

//         return false
//     }
// }

/*
limit: Maximum number of requests allowed.
windowMs: Time window in milliseconds.
requestsMap: A Map that stores the timestamps of requests per user/IP.
*/

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requestsMap = new Map();
  }

  isRateLimited(identifier) {
    const now = Date.now();
    const timestamps = this.requestsMap.get(identifier) || [];

    // Filter out timestamps that are outside the rolling window
    const validTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < this.windowMs
    );

    // Update the map with the filtered timestamps
    this.requestsMap.set(identifier, validTimestamps);

    if (validTimestamps.length >= this.limit) {
      return true; // Rate limit exceeded
    } else {
      // Add the current timestamp and return false (not rate limited)
      validTimestamps.push(now);
      this.requestsMap.set(identifier, validTimestamps);
      return false;
    }
  }
}

// Simulated request and response objects for testing
class ApiController {
  constructor(limit, windowMs) {
    this.rateLimiter = new RateLimiter(limit, windowMs);
  }

  handleRequest(req) {
    const identifier =
      req.ip ||
      req.headers.get("x-forwarded-for") ||
      req.connection.remoteAddress;

    if (this.rateLimiter.isRateLimited(identifier)) {
      return {
        statusCode: 429,
        message: "Too many requests. Please try again later.",
      };
    }

    return {
      statusCode: 200,
      message: "Request processed successfully!",
    };
  }
}

// Simulate a request for testing purposes
function simulateRequest(controller, req) {
  const res = controller.handleRequest(req);
  console.log(`Status: ${res.statusCode}, Message: ${res.message}`);
}

// Testing the rate limiter with multiple requests
const controller = new ApiController(5, 60000); // Limit to 5 requests per minute
const headers = new Headers(); // Use Headers class to create the headers object
headers.set("x-forwarded-for", "127.0.0.1");

const req = {
  ip: "127.0.0.1",
  headers: headers,
  connection: { remoteAddress: "127.0.0.1" },
};

// Simulate 7 requests to test rate limiting
for (let i = 0; i < 7; i++) {
  simulateRequest(controller, req);
}
