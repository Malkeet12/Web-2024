class RateLimiter {
  #window = 12000;
  #limit = 100;
  #cache;

  constructor(limit, window) {
    this.#limit = limit;
    this.#window = window;
    this.#cache = new Map();
  }
  isRateLimited(ip) {
    const timeStamps = this.#cache.get(ip) || [];
    const validTimeStamps = timeStamps.filter(
      (time) => Date.now() - time < this.#window
    );
    this.#cache.set(ip, validTimeStamps);
    if (validTimeStamps.length >= this.#limit) {
      return true;
    }
    validTimeStamps.push(Date.now());
    this.#cache.set(ip, validTimeStamps);
    return false;
  }
}

const rateLimiterInstance = new RateLimiter(2, 2000);
console.log(rateLimiterInstance.limit); //undefined
Object.freeze(rateLimiterInstance.constructor.prototype);
export default rateLimiterInstance;

for (let index = 0; index < 5; index++) {
  console.log(rateLimiterInstance.isRateLimited("1"));
}
