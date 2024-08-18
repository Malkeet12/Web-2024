// import stringify from "./jsonstringify";

/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
function parse(str) {
  if (str === "") {
    throw new SyntaxError("Unexpected end of JSON input");
  }
  if (str[0] === "'") {
    throw Error();
  }
  if (str === "null") {
    return null;
  }
  if (str === "{}") {
    return {};
  }
  if (str === "[]") {
    return [];
  }
  if (str === "true") {
    return true;
  }
  if (str === "false") {
    return false;
  }
  if (str[0] === '"') {
    return str.slice(1, -1);
  }
  if (+str === +str) {
    return Number(str);
  }
  if (str[0] === "{") {
    return str
      .slice(1, -1)
      .split(",")
      .reduce((acc, item) => {
        const index = item.indexOf(":");
        const key = item.slice(0, index);
        const value = item.slice(index + 1);
        acc[parse(key)] = parse(value);
        return acc;
      }, {});
  }
  if (str[0] === "[") {
    return str
      .slice(1, -1)
      .split(",")
      .map((value) => parse(value));
  }
}
console.log(parse());
console.log(parse('["cur{ly"]'));
console.log(JSON.stringify(["cur{ly"]));

// parse('{"ke,y":"value"})
// parse('["cur{ly"]')
// parse('{"ke\"y", "value"}')
