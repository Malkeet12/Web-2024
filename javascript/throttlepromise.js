import { fetchNumbers } from "./mockApi.js";

function throttlePromises(funcs, limit) {
  const result = [];
  let runningPromises = 0;
  let currentIndex = 0;

  return new Promise((resolve, reject) => {
    function runNext() {
      if (currentIndex >= funcs.length && runningPromises === 0) {
        return resolve(result); // All promises resolved
      }

      while (runningPromises < limit && currentIndex < funcs.length) {
        const index = currentIndex++;
        const promise = funcs[index]();
        console.log({ index });
        promise
          .then((res) => {
            result[index] = res;
            runningPromises--;
            runNext(); // Start the next promise
          })
          .catch(reject); // If any promise fails, reject the whole throttlePromises

        runningPromises++;
      }
    }

    runNext();
  });
}
// function throttlePromises(funcs, max) {
//   const result = [];
//   return new Promise((resolve, reject) => {
//     let count = 0;
//     let queue = [...funcs];
//     function run() {
//       while (count < max && queue.length) {
//         const fn = queue.shift()();
//         count++;
//         console.log(count);
//         fn.then((data) => {
//           count--;
//           result.push(data);
//           run();
//         }).catch((err) => reject(err));
//       }
//       if (result.length === funcs.length) {
//         resolve(result);
//       }
//     }
//     run();
//   });
// }

// Example usage:
const callApis = [
  () => fetchNumbers(0),
  () => fetchNumbers(1),
  () => fetchNumbers(2),
  () => fetchNumbers(3),
  () => fetchNumbers(4),
  () => fetchNumbers(5),
  () => fetchNumbers(6),
  () => fetchNumbers(7),
  () => fetchNumbers(8),
];

throttlePromises(callApis, 6)
  .then((data) => {
    console.log("All API responses:", data);
  })
  .catch((err) => {
    console.error("Error occurred:", err);
  });
