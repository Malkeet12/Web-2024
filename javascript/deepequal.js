//https://devtools.tech/questions/s/how-to-check-deep-equality-between-javascript-objects-or-zeta-frontend-interview-question---qid---1YjgIig2dBwqkpovXNrR
export function deepEqual(value, other) {
  "use strict";
  if (typeof value !== typeof other) {
    return false;
  }
  if (value === other) {
    return true;
  }
  if (
    typeof value !== "object" ||
    value === null ||
    typeof other !== "object" ||
    other === null
  ) {
    return false;
  }

  if (Array.isArray(value) && Array.isArray(other)) {
    value.forEach((item, index) => {
      const res = deepEqual(item, other[index]);
      if (!res) return false;
    });
    return true;
  }
  if (typeof value === "object" && typeof other === "object") {
    for (const [key, val] of Object.entries(value)) {
      if (!deepEqual(val, other[key]) || !other[key]) return false;
    }
    return true;
  }
}

let value = { a: 1 };
let other = { a: 1 };

deepEqual(value, other);
// => true

value = { a: { b: { c: { d: 2 } } } };
other = window.structuredClone(value);

deepEqual(value, other);
// => true

value = { a: 2 };
other = { a: 3 };

deepEqual(value, other);
// => false

deepEqual();
// => true

value = { a: 1 };
other = null;

deepEqual(value, other);
// => false

value = { a: 1 };
other = undefined;

deepEqual(value, other);
// => false

value = { a: 1 };

deepEqual(value);
// => false
