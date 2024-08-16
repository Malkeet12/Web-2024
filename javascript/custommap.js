class HashMap {
  constructor() {
    this.buckets = {};
    this.size = 0;
  }

  // A simple hash function to convert keys to a unique string
  _hash(key) {
    if (typeof key === "string") {
      return `str_${key}`;
    } else if (typeof key === "number") {
      return `num_${key}`;
    } else {
      return `obj_${JSON.stringify(key)}`;
    }
  }

  set(key, value) {
    const hashedKey = this._hash(key);
    if (!Object.prototype.hasOwnProperty.call(this.buckets, hashedKey)) {
      this.size++;
    }
    this.buckets[hashedKey] = value;
    return this;
  }

  get(key) {
    const hashedKey = this._hash(key);
    return this.buckets[hashedKey];
  }

  has(key) {
    const hashedKey = this._hash(key);
    return Boolean(this.buckets[hashedKey]);
  }

  delete(key) {
    const hashedKey = this._hash(key);
    if (this.buckets[hashedKey]) {
      delete this.buckets[hashedKey];
      this.size--;
      return true;
    }
    return false;
  }

  clear() {
    this.buckets = {};
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  forEach(callback) {
    for (let key in this.buckets) {
      if (this.buckets[key]) {
        // Extract original key from the hashed key
        let originalKey;
        if (key.startsWith("str_")) {
          originalKey = key.slice(4);
        } else if (key.startsWith("num_")) {
          originalKey = Number(key.slice(4));
        } else {
          originalKey = JSON.parse(key.slice(4));
        }
        callback(this.buckets[key], originalKey, this);
      }
    }
  }
}

// Example usage
const myMap = new HashMap();

myMap.set("a", 1);
myMap.set(2, "number key");
myMap.set({ name: "Alice" }, "object key");

console.log(myMap.get("a")); // 1
console.log(myMap.get(2)); // 'number key'
console.log(myMap.has("a")); // true
console.log(myMap.has({ name: "Alice" })); // false because objects are compared by reference
myMap.forEach(console.log);
myMap.delete("a");
console.log(myMap.get("a")); // undefined

console.log(myMap.getSize()); // 2

myMap.clear();
console.log(myMap.getSize()); // 0
