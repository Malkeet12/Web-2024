// export default async function mapAsyncLimit<T, U>(
//     iterable: Array<T>,
//     callbackFn: (value: T) => Promise<U>,
//     size: number = Infinity,
//   ): Promise<Array<U>> {
//     const results = [];

//     for (let i = 0; i < iterable.length; i += size) {
//       const chunk = iterable.slice(i, i + size);
//       const chunkResults = await Promise.all(chunk.map(callbackFn));

//       results.push(...chunkResults);
//     }

//     return results;
//   }

// The previous approaches have a huge downside, that is there is some idleness and the available upper concurrency
//limit is not always fully-utilized.
/**
 * @param {Array<any>} iterable
 * @param {Function} callbackFn
 * @param {number} size
 *
 * @return {Promise}
 */
export default function mapAsyncLimit(iterable, callbackFn, size = Infinity) {
  return new Promise((resolve, reject) => {
    const result = [];
    if (iterable.length == 0) {
      resolve(result);
      return;
    }

    let nextIndex = 0;
    let resolved = 0;
    async function processItem(index) {
      nextIndex++;
      try {
        const res = await callbackFn(iterable[index]);
        result[index] = res;
        resolved++;
        if (resolved === iterable.length) {
          resolve(result);
          return;
        }
        if (nextIndex < iterable.length) {
          processItem(nextIndex);
        }
      } catch (e) {
        reject(e);
      }
    }
    for (let index = 0; index < Math.min(iterable.length, size); index++) {
      processItem(index);
    }
  });
}

const asyncDouble = (x) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(x * 2);
    }, 10);
  });
const res = await mapAsyncLimit([3], asyncDouble);
console.log(res);
// const chop = (arr, limit) => {
//   const res = [];
//   for (let index = 0; index < arr.length; index += limit) {
//     res.push(arr.slice(index, index + limit));
//   }
//   return res;
// };

// const mapLimit = (arr, limit, fn) => {
//   return new Promise((resolve, reject) => {
//     let chopped = chop(arr, limit);

//     // for all the subarrays of chopped
//     // run it in series
//     // that is one after another
//     // initially it will take an empty array to resolve
//     // merge the output of the subarray and pass it on to the next
//     const final = chopped.reduce((a, b) => {
//       return a.then((val) => {
//         // run the sub-array values in parallel
//         // pass each input to the iteratee function
//         // and store their outputs
//         // after all the tasks are executed
//         // merge the output with the previous one and resolve
//         return new Promise((resolve, reject) => {
//           const results = [];
//           let tasksCompleted = 0;
//           b.forEach((e) => {
//             fn(e, (error, value) => {
//               if (error) {
//                 reject(error);
//               } else {
//                 results.push(value);
//                 tasksCompleted++;
//                 if (tasksCompleted >= b.length) {
//                   resolve([...val, ...results]);
//                 }
//               }
//             });
//           });
//         });
//       });
//     }, Promise.resolve([]));

//     final
//       .then((result) => {
//         resolve(result);
//       })
//       .catch((e) => {
//         reject(e);
//       });
//   });
// };

// let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
//   setTimeout(function () {
//     num = num * 2;
//     console.log(num);
//     callback(null, num);
//   }, 2000);
// });

// numPromise
//   .then((result) => console.log("success:" + result))
//   .catch(() => console.log("no success"));

// // first batch
// // Output: 2;
// // 4;
// // 6;
// // // second batch
// // 8;
// // 10;
// // ("success:2,4,6,8,10");
