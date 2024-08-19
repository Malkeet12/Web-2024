//https://bigfrontend.dev/list/ux5bnrclvredliygb7
// This is a JavaScript Quiz from BFE.dev

const obj = {
  a: 1,
  b: function () {
    console.log(this.a);
  },
  c() {
    console.log(this.a);
  },
  d: () => {
    console.log(this.a);
  },
  e: (function () {
    return () => {
      console.log(this.a);
    };
  })(),
  f: function () {
    return () => {
      console.log(this.a);
    };
  },
};

console.log(obj.a);
obj.b();
obj.b();
const b = obj.b;
b();
obj.b.apply({ a: 2 });
obj.c();
obj.d();
obj.d();
obj.d.apply({ a: 2 });
obj.e();
obj.e();
obj.e.call({ a: 2 });
obj.f()();
obj.f()();
obj.f().call({ a: 2 });
// This is a JavaScript Quiz from BFE.dev

// const obj = {
//   a: 1,
//   b() {
//     return this.a;
//   },
// };
// console.log(obj.b());
// // console.log((true ? obj.b : a)());
// console.log((true, obj.b)());
// console.log((3, obj["b"])());
// console.log(obj.b());
// console.log((obj.c = obj.b)());

// const obj = {
//     a: 1,
//     b: this.a + 1,
//     c: () => this.a + 1,
//     d() {
//       return this.a + 1
//     },
//     e() {
//       return (() => this.a + 1)()
//     }
//   }
//   console.log(obj.b)
//   console.log(obj.c())
//   console.log(obj.d())
//   console.log(obj.e())

var bar = 1;

function foo() {
  return this.bar++;
}

const a = {
  bar: 10,
  foo1: foo,
  foo2: function () {
    return foo();
  },
};

console.log(a.foo1.call());
console.log(a.foo1());
console.log(a.foo2.call());
console.log(a.foo2());

// const obj = {
//     prefix: 'BFE',
//     list: ['1', '2', '3'],
//     log() {
//       this.list.forEach(function (item) {
//         console.log(this.prefix + item);
//       });
//     },
//   };

//   obj.log();

class A {
  static dev = "BFE";
  dev = "bigfrontend";
}

class B extends A {
  log() {
    console.log(this.dev);
  }

  static log() {
    console.log(this.dev);
  }
}

B.log();
new B().log();

// var a = {};
// var b = { key: "b" };
// var c = { key: "c" };
// a[b] = 600;
// b[c] = 700;
// console.log(a, b, c);
// console.log(a[c]);
// console.log(a[b]);
// console.log(b[b]);
// console.log(b[c]);
