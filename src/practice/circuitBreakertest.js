function circuitBreaker(fn, limit, threshold) {
  let failures = 0;
  let timeSinceLastFailure = 0;
  let isClosed = false;
  return function (...args) {
    if (isClosed) {
      if (Date.now() - timeSinceLastFailure < threshold) {
        console.log("service unavailable");
        return;
      }
      isClosed = true;
    }
    try {
      const res = fn(...args);
      failures = 0;
      console.log("success");
      return res;
    } catch (e) {
      failures++;
      if (failures >= limit) {
        isClosed = true;
        timeSinceLastFailure = Date.now();
      }
      console.log(e);
    }
  };
}

const testFunction = () => {
  let count = 0;
  return function () {
    count++;
    if (count < 4) throw "failed";
    else return "success";
  };
};
let t = testFunction();
const c = circuitBreaker(t, 3, 100);
c();
c();
c();
c();
c();
c();
setTimeout(() => {
  c();
}, 500);
