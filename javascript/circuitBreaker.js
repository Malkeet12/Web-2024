export const circuitBreaker = (fn, failureCount, threshold) => {
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
      return res;
    } catch (e) {
      failures++;
      timeSinceLastFailure = Date.now();
      if (failures >= failureCount) {
        isClosed = true;
      }
      console.log("error", e);
    }
  };
};

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
c();
c();
setTimeout(() => {
  console.log(c());
}, 300); // "hello";
