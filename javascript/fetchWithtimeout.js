const fetchWithTimeout = async (url, duration) => {
  const controller = new AbortController();
  const signal = controller.signal;
  let timerId = null;

  try {
    const fetchPromise = fetch(url, { signal });

    timerId = setTimeout(() => {
      console.log("Aborted");
      controller.abort();
    }, duration);

    // Await the fetch and process the response
    const response = await fetchPromise;
    const data = await response.json();

    // Clear the timeout if the fetch completes in time
    clearTimeout(timerId);
    return data;
  } catch (error) {
    // If an error occurs (including timeout), reject the promise
    clearTimeout(timerId);
    throw error;
  }
};

// Example usage:
(async () => {
  try {
    const resp = await fetchWithTimeout(
      "https://jsonplaceholder.typicode.com/todos/1",
      5000
    );
    console.log(resp);
  } catch (error) {
    console.error(error);
  }
})();
