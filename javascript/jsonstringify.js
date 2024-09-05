/**
 * @param {any} data
 * @return {string}
 */
export function stringify(data) {
  if ([NaN, null, undefined, Infinity].includes(data)) {
    return "null";
  }
  const type = typeof data;
  switch (type) {
    case "function":
      return undefined;
    case "bigint":
      throw Error("bigints are not supported");
    case "string":
      return `"${data}"`;
    case "object": {
      if (data instanceof Date) {
        return `"${data.toISOString()}"`;
      }
      if (Array.isArray(data)) {
        const arr = data.map((el) => stringify(el));
        return `[${arr.join(",")}]`;
      }

      const arr = Object.entries(data).reduce((acc, [key, value]) => {
        if (value === undefined) {
          return acc;
        }
        acc.push(`"${key}":${stringify(value)}`);
        return acc;
      }, []);
      return `{${arr.join(",")}}`;
    }
    default:
      console.log(typeof String(data));
      return String(data);
  }
}
const obj = { val: 1 };
const a = stringify(obj);
console.log(a, typeof a);
