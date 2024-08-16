import { sleep } from "./common";

const breaker = (limit, threshold) => {
  let count = 0;
  let time;

  const makeApiCall = () => {
    const timeGap = Date.now() - time;
    if (count >= limit && timeGap < threshold) {
      const message = `circuit break, try after  ${timeGap / 1000}s`;
      console.log(message);
      return message;
    }
    count += 1;
    if (!time) time = Date.now();

    console.log("getting data");
  };
  return {
    makeApiCall,
  };
};

const instance = breaker(5, 2000);
console.log(instance);
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
await sleep(3000);
instance.makeApiCall();
instance.makeApiCall();
instance.makeApiCall();
