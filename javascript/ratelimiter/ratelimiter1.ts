class RateLimiter1 {
    private limit: number;
    private windowMs: number;
    private requestsMap: Map<string, number[]>;

    constructor(limit: number, windowMs: number) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.requestsMap = new Map();
    }

    public isRateLimited(identifier: string): boolean {
        const now = Date.now();
        const timestamps = this.requestsMap.get(identifier) || [];

        // Filter out timestamps that are outside the rolling window
        const validTimestamps = timestamps.filter(timestamp => now - timestamp < this.windowMs);

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

interface CustomRequest {
    ip?: string;
    headers: { [key: string]: string };
    connection: { remoteAddress: string };
}

interface CustomResponse {
    statusCode: number;
    message: string;
}

class ApiController1 {
    private rateLimiter: RateLimiter1;

    constructor(limit: number, windowMs: number) {
        this.rateLimiter = new RateLimiter1(limit, windowMs);
    }

    public handleRequest(req: CustomRequest, res: CustomResponse): CustomResponse {
        const identifier = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress;

        if (this.rateLimiter.isRateLimited(identifier)) {
            return {
                statusCode: 429,
                message: 'Too many requests. Please try again later.',
            };
        }

        return {
            statusCode: 200,
            message: 'CustomRequest processed successfully!',
        };
    }
}

// Simulate a request for testing purposes
function simulateRequest(controller: ApiController1, req: CustomRequest) {
    const res: CustomResponse = controller.handleRequest(req, {} as CustomResponse);
    console.log(`Status: ${res.statusCode}, Message: ${res.message}`);
}

// Testing the rate limiter with multiple requests
const controller = new ApiController1(5, 60000); // Limit to 5 requests per minute
const req: CustomRequest = { ip: '127.0.0.1', headers: {}, connection: { remoteAddress: '127.0.0.1' } };

// Simulate 7 requests to test rate limiting
for (let i = 0; i < 7; i++) {
    simulateRequest(controller, req);
}
