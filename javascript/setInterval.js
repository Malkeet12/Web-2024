// const myInterval = (callback, delay) => {
//   let timerId;
//   const repeat = () => {
//     callback();
//     timerId = setTimeout(repeat, delay);
//   };
//   timerId = setTimeout(repeat, delay);
//   return {
//     clear: () => {
//       clearTimeout(timerId);
//     },
//   };
// };

// he requestAnimationFrame function is a browser API that tells the browser to execute a callback function just before the next repaint.
//  This makes it ideal for creating smooth animations or performing operations that need to be executed in sync with the display refresh rate,
//  typically around 60 frames per second.
// check call typically every 1000/60 => 16.7 ms

function mySetTimeout(callback, delay) {
  let start = Date.now();
  let cancelled = false;

  function check() {
    if (cancelled) return;
    const currentTime = Date.now(); // Get the current time
    const elapsedTime = currentTime - start; // Calculate elapsed time

    if (elapsedTime >= delay) {
      start = currentTime;
      callback();
    }
    requestAnimationFrame(check);
  }

  requestAnimationFrame(check);
  return {
    cancel: function () {
      cancelled = true;
    },
  };
}
// Usage:
const intervalId = mySetTimeout(() => {
  console.log("Timeout executed!");
}, 2000); // Executes the callback after approximately 2000ms
intervalId.cancel();
