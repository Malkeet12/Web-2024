export const fetchData = (lastIndex = 0) => {
  console.log({ lastIndex });
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = new Array(50).fill(null);
      const modifiedData = data.map((_, index) => lastIndex + index + 1);
      resolve(modifiedData);
    }, 500);
  });
};

export const fetchNumbers = (page = 0, limit = 50) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numbers = Array.from(
        { length: limit },
        (_, i) => i + 1 + page * limit
      );
      resolve(numbers);
    }, 1000);
  });
};

export const GridVals = [1, 2];
