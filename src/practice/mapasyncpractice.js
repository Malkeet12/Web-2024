async function mapAsync(funcs, limit = Infinity) {
  return new Promise((resolve, reject) => {
    const out = new Array(funcs.length).fill();
    let nextIndex = 0;
    let resolved = 0;
    const processItem = async (index) => {
      nextIndex++;
      try {
        const res = await funcs[index];
        out[index] = res;
        resolved++;
        if (resolved === funcs.length) {
          resolve(out);
          return;
        }
        if (nextIndex < funcs.length) {
          processItem(nextIndex);
        }
      } catch (e) {
        reject(e);
        return;
      }
    };
    for (let index = 0; index < Math.min(funcs.length, limit); index++) {
      processItem(index);
    }
  });
}

const arr = [1, 2, 3, 4, 5, 6];
const test = (number) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(number);
    }, 100)
  );
};

mapAsync(
  arr.map((item) => test(item)),
  2
).then((res) => console.log(res));
