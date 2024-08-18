function cloneDeep(obj, map = new Map()) {
  // Handle primitive types, null, and undefined
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle functions by returning them directly
  if (typeof obj === "function") {
    return obj;
  }

  // Handle circular references
  if (map.has(obj)) {
    return map.get(obj);
  }

  // Handle Date
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // Handle RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Handle Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    map.set(obj, mapCopy); // Set before recursion to handle circular references
    obj.forEach((value, key) => {
      mapCopy.set(cloneDeep(key, map), cloneDeep(value, map));
    });
    return mapCopy;
  }

  // Handle Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    map.set(obj, setCopy); // Set before recursion to handle circular references
    obj.forEach((value) => {
      setCopy.add(cloneDeep(value, map));
    });
    return setCopy;
  }

  // Handle Array
  if (Array.isArray(obj)) {
    const arrCopy = [];
    map.set(obj, arrCopy); // Set before recursion to handle circular references
    for (let i = 0; i < obj.length; i++) {
      arrCopy[i] = cloneDeep(obj[i], map);
    }
    return arrCopy;
  }

  // Handle Object
  const objCopy = {};
  map.set(obj, objCopy); // Set before recursion to handle circular references
  const keys = [...Object.getOwnPropertySymbols(obj), ...Object.keys(obj)];
  for (const key of keys) {
    objCopy[key] = cloneDeep(obj[key], map);
  }

  return objCopy;
}

// Example usage:

const sym = Symbol("key");
const original = {
  name: "Alice",
  age: 25,
  hobbies: ["reading", "hiking"],
  [sym]: "symbolValue",
  date: new Date(),
  regex: /hello/g,
  map: new Map([[1, "one"]]),
  set: new Set([1, 2, 3]),
  func: function () {
    return "I'm a function";
  },
};

original.self = original; // Circular reference

const cloned = cloneDeep(original);

console.log(cloned);
console.log(cloned.self === cloned); // true, proving the circular reference was handled
console.log(cloned[sym]); // "symbolValue", proving the symbol property was copied
console.log(cloned.date instanceof Date); // true, ensuring Date objects are cloned
console.log(cloned.regex instanceof RegExp); // true, ensuring RegExp objects are cloned
console.log(cloned.map instanceof Map); // true, ensuring Map objects are cloned
console.log(cloned.set instanceof Set); // true, ensuring Set objects are cloned
console.log(cloned.func === original.func); // true, functions are not cloned but directly returned
