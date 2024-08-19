function debounce(func, wait, option = { leading: false, trailing: true }) {
  let timerId = null;
  const { leading = false, trailing = true } = option;
  return function (...args) {
    let isInvoked = false;

    clearTimeout(timerId);
    if (leading && !timerId) {
      func.apply(this, args);
      isInvoked = true;
    }
    timerId = setTimeout(() => {
      timerId = null;
      if (trailing && !isInvoked) {
        func.apply(this, args);
      }
    }, wait);
  };
}
// function debounce(func, wait) {
//   let timerId;
//   return function (...args) {
//     clearTimeout(timerId);

//     timerId = setTimeout(() => {
//       timerId = null;
//       func.apply(this, args);
//     }, wait);
//   };
// }
