//this-->https://bigfrontend.dev/list/ux5bnrclvredliygb7
//sleep
export const sleep = (time) =>
  new Promise((resolve) => setTimeout(resolve, time));
// console.log("start");
// sleep(2000).then(() => {
//   console.log("I run after 2000 milliseconds");
// });

// (async () => {
//   console.log("start");
//   await sleep(1000);
//   console.log("I run after 1000 milliseconds");
// })();

// const performAction = async () => {
//   await sleep(500);
//   console.log("I run after 500 milliseconds");
// };

// performAction();
// const time = async () => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 1000);
//   });
// };
// console.log(1);
// const res = await time();
// console.log(res);
// console.log(2);

const baz = () => console.log("baz");
const foo = () => console.log("foo");
const zoo = () => console.log("zoo");

const start = () => {
  console.log("start");
  setImmediate(baz);
  new Promise((resolve, reject) => {
    resolve("bar");
  }).then((resolve) => {
    console.log(resolve);
    process.nextTick(zoo);
  });
  process.nextTick(foo);
};

start();
