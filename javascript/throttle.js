function throttle(func, wait, option = { leading: true, trailing: true }) {
  const { leading, trailing } = option;
  let timerId = null;
  let lastArgs = null;

  return function (...args) {
    if (timerId) {
      lastArgs = args;
      return;
    }
    if (leading || lastArgs) {
      func.apply(this, args);
    }
    const timeup = () => {
      if (lastArgs && trailing) {
        func.apply(this, lastArgs);
        lastArgs = null;
        timerId = setTimeout(timeup, wait);
      } else {
        timerId = null;
      }
    };
    timerId = setTimeout(timeup, wait);
  };
}

//   function throttle(func, wait) {
//     let timerId = null
//     let lastArgs = null;
//     return function (...args) {
//       if (timerId) {
//         lastArgs = args
//         return
//       }

//       func.apply(this, args)
//       timerId = setTimeout(() => {
//         if (lastArgs) {
//           func.apply(this, lastArgs)
//         }
//         timerId = null
//       }, wait)
//     }
//   }
