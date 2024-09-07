const myExtends = (SuperType, SubType) => {
    // extend the child to point to the parent
    // all the nonstatic methods
    SubType.prototype.__proto__ = SuperType.prototype;
    //ES5: Object.setPrototypeOf(SubType.prototype, SuperType.prototype);

    // static methods;
    SubType.__proto__ = SuperType;
    //ES5: Object.setPrototypeOf(SubType, SuperType);

    // as the child is pointing to the parent
    // after it, update the child's constructor to point itself.
    SubType.prototype.constructor = SubType;
    //ES5: Object.setPrototypeOf(SubType.prototype, SubType.prototype);
}
// Input:
// Parent
function Person() {
    this.name = "abc";
}

// non static methods
Person.prototype.walk = function () {
    console.log(this.name + ', I am walking!');
};

Person.prototype.sayHello = function () {
    console.log('hello');
};

// static methods
Person.staticSuper = function () {
    console.log('static');
};

// child
function Student() {
    this.name = "pqr";
}

// sayHello
// this will replace the parent after extending
Student.prototype.sayHello = function () {
    console.log('hi, I am a student');
}

// add sayGoodBye method
Student.prototype.sayGoodBye = function () {
    console.log('goodBye');
}

const Extend = myExtends(Person, Student);

const student1 = new Student();
student1.sayHello();
student1.walk();
student1.sayGoodBye();
Student.staticSuper();
console.log(student1.name);

// check inheritance
console.log(student1 instanceof Person);
console.log(student1 instanceof Student);

// Output:
// "hi, I am a student"
// "pqr, I am walking!"
// "goodBye"
// "static"
// "pqr"

// true
// true
