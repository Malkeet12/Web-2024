let count = 0;
function mySetTimeout(callback, delay) {
  const start = Date.now(); // Capture the start time

  function check() {
    const currentTime = Date.now(); // Get the current time
    const elapsedTime = currentTime - start; // Calculate elapsed time

    if (elapsedTime >= delay) {
      callback(); // If the delay has passed, execute the callback
    } else {
      console.log(count++);
      requestAnimationFrame(check); // Otherwise, continue checking in the next frame
    }
  }

  requestAnimationFrame(check); // Start the loop
}

// Usage:
mySetTimeout(() => {
  console.log("Timeout executed!");
}, 2000); // Executes the callback after approximately 2000ms
