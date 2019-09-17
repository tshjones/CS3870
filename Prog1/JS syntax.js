
////////////////////////////////////////Basic Syntax///////////////////////////////////
// comments are prefixed with double slashes
/*
 * Multi-line comments look like this
 */
// camelCase is preferred
// double-quotes create strings
const firstName = "Joshua";

// semicolons are optional
// single-quotes also create strings
const lastName = 'Yue'

var num = 10;

// arrays can be declared inline
// arrays can have multiple types (more on types later)
const arr = [
  'string',
  42,
  function() { console.log('hi'); },
];

// this returns the element at the 2nd index and invokes it
arr[2]();

// this will iterate through the array and console log each element
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
} 

////////////////////////////////////////Types////////////////////////////////////////
const x = 42;

// get type by using "typeof"
console.log(typeof x);

//error, assignment to constant variable
/////x = 'abc';

let y = 42;

console.log(typeof y); 

y = 'abc';

console.log(typeof y);

console.log(typeof undefined);

// this may surprise you...
console.log(typeof null);

//Type coercion

const x = 10;
const explicit = String(x);
const implicit = x + '';

//Equality: use === 

x == explicit //coerces the types

x === explicit //compare both types and values


////////////////////////////////////////Objects///////////////////////////////////////
//Three different ways of creating an object
//Way 1, use new keyword
const obj = new Object();

obj.firstName = "Joshua";
obj.lastName = 'Yue';
obj.isTeaching = true;
obj.greet = function() { console.log('Hello!'); };

obj.greet();

console.log(JSON.stringify(obj));

//Way 2, object literal, preferred over the new keyword
const obj2 = {}; // {} returns a new empty object
obj2['firstName'] = 'Joshua';
//bracket notation for dynamic keys
const a = 'lastName';
obj2[a] = 'Yue';

//Way 3, put everything inline
const obj3 = {
  2: 0, //this is legal. All keys are cast to strings
  firstName: 'Joshua',
  lastName: 'Yue',
  greet: function() {
    console.log('hi');
  },
  address: { //nested object
    street: "Main st.",
    number: '111'
  }
};

const key = 'street';
console.log (obj3.address[key]);
console.log (obj3[2]); //2 will be cast to a string

//'this' keyword in an object
var obj = {
    val:0,
    read(){
        val = 30;
    },
    test(){
        this.val = 40;
    },
};
obj
{val: 0, read: ƒ, test: ƒ}
obj.read();
obj
{val: 0, read: ƒ, test: ƒ}
obj.test();
obj
{val: 40, read: ƒ, test: ƒ}

////////////////////////////////////////Object Mutation///////////////////////////////
const o = {
  a: 'a',
  b: 'b',
  obj: {
    key: 'key',
  },
};

const o2 = o;

o2.a = 'new value'

// o and o2 reference the same object
console.log(o.a);

// this shallow-copies o into o3
const o3 = Object.assign({}, o);

// deep copy
function deepCopy(obj) {
  // check if vals are objects
  // if so, copy that object (deep copy)
  // else return the value
  const keys = Object.keys(obj);

  const newObject = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof obj[key] === 'object') {
      newObject[key] = deepCopy(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  }

  return newObject;
}

const o4 = deepCopy(o)

o.obj.key = 'new key!'
console.log(o4.obj.key);


////////////////////////////////////////Prototype Inheritance//////////////////////////////

const obj = {
	a: 'a',
}

obj.__proto__;

//Array.prototype.push()
const arr1 = [];
arr1.push(10);
arr1.push('abc');
arr1.__proto__;
//methods defined most tightly to the instance have priority
arr1.toString();// which one is called? the one in arr1.__proto__ or arr1.__proto__.__proto__?


//String.prototype.toUpperCase()
const str = 'abc';
str.toUpperCase();
//Danger of prototype inheritance
const num1 = 56;
num1.toString(); //"56"
//we can actually change the implementation of toString();
Number.prototype.toString = function() { return 1000; };
num1.toString(); //"1000"
const num2 = -20;
num2.toString(); //"1000"
//Changing the prototype is very dangerous and is recommended against doing.

////////////////////////////////////////Function/////////////////////////////////////////////


//function as a constructor, capitalize function name
function Dog() {
}

typeof Dog.prototype //'object' 
//When you create a function, it will automatically have a property called prototype, initialized to an empty object.

let fido = new Dog();
//placing bark on Dog.prototype makes it available to all instances of Dog
Dog.prototype.bark = function() {
 console.log('woof!');
};

fido.bark(); //'woof'

//"this" keyword refers to the new object that you’re creating
function Rectangle( width, height ) {
 this.width = width;
 this.height = height;
}
//Create an object that has Rectangle.prototype in its prototype chain
const rect = new Rectangle( 3, 4 );
rect.width; // 3
rect.height; // 4

Rectangle.prototype.area = function() {
 return this.width * this.height;
};
//const rect = new Rectangle( 3, 4 );
rect.area(); // 12

//subclassing
function Square( length ) {
 this.width = this.height = length;
}

Square.prototype = Object.create( Rectangle.prototype );

const square = new Square( 4 );
square.area(); // 16

//ES6 you can use class
class Rectangle {
  constructor(height, width) {
    this.name = 'Rectangle';
    this.height = height;
    this.width = width;
  }
  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }
  get area() {
    return this.height * this.width;
  }
  set area(value) {
    this.height = this.width = Math.sqrt(value);
  }
}

class Square extends Rectangle {
  constructor(length) {
    this.height; // ReferenceError, super needs to be called first!
    
    // Here, it calls the parent class' constructor with lengths
    // provided for the Rectangle's width and height
    super(length, length);
    
    // Note: In derived classes, super() must be called before you
    // can use 'this'. Leaving this out will cause a reference error.
    this.name = 'Square';
  }
}


//////////////////////////////Define Functions//////////////////////////////
//Function statement (or function declaration)
function showMessage(from, text) {
  from = '*' + from + '*'; // make "from" look nicer
  alert( from + ': ' + text );
}
let from = "Ann";
showMessage(from, "Hello"); // *Ann*: Hello

//in JS there is always a default global object
//every JS function is an object method
function myLooooooooooogFunction(a, b) {
  return a * b;
}
window.myLooooooooooogFunction(10, 2);    // Will also return 20

//Function expression
let sayHi = function() {
  alert( "Hello" );
};
sayHi();
let func = sayHi;
func();
//function is just a special kind of value (object)
//function can be passed to another function as a value
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}
function showOk() {
  alert( "You agreed." );
}
function showCancel() {
  alert( "You cancelled the execution." );
}
// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

//The idea is that we pass a function and expect it to be “called back” later if necessary. 
//In the above case, showOk becomes the callback for the “yes” answer, and showCancel for the “no” answer.

//use Function Expressions to write the same function:
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You cancelled the execution."); }
);

//arrow function
let sum = (a, b) => a + b;

/* The arrow function is a shorter form of:

let sum = function(a, b) {
  return a + b;
};
*/
alert( sum(1, 2) ); // 3

//Multiline arrow functions
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, use return to get results
};

alert( sum(1, 2) ); // 3


//////////////////////////////Invoke Functions////////////////////////////////////////////////////
//all functions are object methods
var person = {
    firstName: 'John',
    lastName: 'Doe',
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};
person.fullName();         // Will return "John Doe"

const fn = person.fullName;
fn(); //undefined  undefined, because 'this' is now the global object

let student = {
    firstName: 'Josh',
    lastName: 'Yue',
};

student.fullName = person.fullName;
student.fullName(); //Josh Yue

//use bind() that returns a new function

let fullN = person.fullName.bind(student);
fullN(); //Josh Yue

//call a function using call() that call the function immediately
var person = {
    fullName: function() {
        return this.firstName + '' + this.lastName;
    }
};
var person1 = {
	firstName: 'John',
    lastName: 'Doe',
};
var person2 = {
    firstName: 'Mary',
    lastName: 'Doe',
};
person.fullName.call(person1);  // Will return "John Doe"

//call() method with arguments
var person = {
    fullName: function(city, country) {
        return this.firstName + ' ' + this.lastName + ',' + city + ',' + country;
    }
};

var person1 = {
	firstName: 'John',
    lastName: 'Doe',
}
person.fullName.call(person1, 'Oslo', 'Norway');

//apply() is similar to call(), only difference
//The call() method takes arguments separately 
//The apply() method takes arguments as an array.
var person = {
    fullName: function(city, country) {
        return this.firstName + " " + this.lastName + "," + city + "," + country;
    }
}

var person1 = {
	firstName: 'John',
    lastName: 'Doe',
}
person.fullName.apply(person1, ['Oslo', 'Norway']);

//Arrow functions will always be called with the context in which it was defined

////////////////////////////////////////Variable Scope//////////////////////////////////////

const thisIsAConst = 20;
//thisIsAConst = 50; //error!

const constObj = {};
constObj.a = 'a'; //OK! objects are stored by reference


let x = 10;
//let x = 'abc'; //error for repeated declaration

var y = 10;
var y = 'abc' //totally fine


// "var" is lexically scoped, meaning it exists from time of declaration to end of function
function testScope(){
    if (true) {
      var lexicallyScoped = 'This exists until the end of the function';
    }
    console.log(lexicallyScoped);
}
	

function testScope(){
  // "let" and "const" are block scoped
	if (true) {
	  let blockScoped = 'This exists until the next }';
	  const alsoBlockScoped = 'As does this';
	}
	// this variable doesn't exist
    console.log(blockScoped); //reference error
	// this variable doesn't exist
	console.log(typeof blockScoped);
}

thisIsAlsoAVariable = "hello";



////////////////////////////////////////Closure/////////////////////////////////////////////
//example1
function makeGreetFunction() {
	let message = 'Hi JS';
	return function() { alert(message);};
}

const greet = makeGreetFunction();

alert(message);//error. message doesn't exist
greet();//


//example2
function makeFunctionArray() {
	const arr = [];
	for(var i=0; i<10; i++){
		arr.push( function() {alert(i);});
	}
	//alert(i);
	return arr;
}

const functionArr = makeFunctionArray();
	//alert(i);
functionArr[0]();// 10

//solution1: change for(var i=0; i<10; i++) to for(let i=0; i<10; i++)
//solution2: use iffe

function makeFunctionArray() {
  const arr = [];
  for(var i=0; i<10; i++){
	arr.push((function(x) {
      return function () { alert(x);};
    })(i));
  }
  return arr;
}
const functionArr = makeFunctionArray();
	//alert(i);
functionArr[0]();// 10


//exercise0
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {
    let shooter = function() { // shooter function
      alert( i ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // the shooter number 0 shows 10
army[5](); // and number 5 also outputs 10...



//answer to exercise0
function makeArmy() {
  let shooters = [];

  let i = 0;
  while (i < 10) {//or simply use for(let i=0; i<10; i++)
    let num = i;
    let shooter = function() { // shooter function
      alert( num ); // should show its number
    };
    shooters.push(shooter);
    i++;
  }

  return shooters;
}

let army = makeArmy();

army[0](); // the shooter number 0 shows 10
army[5](); // and number 5 also outputs 10...

//Execise1

function makeWorker() {
  let name = "Pete";

  return function() {
    alert(name);
  };
}

let name = "John";

// create a function
let work = makeWorker();

// call it
work(); //what will it show? "Pete" (name where created) or "John" (name where called)?

//Execise2
//Write function sum that works like this: sum(a)(b) = a+b.
//Yes, exactly this way, via double brackets (not a mistype).
//For instance sum(1)(2) = 3   sum(6)(-1) = 5




function sum(num1){
  return function(num2){
    return num1 + num2
  };
}

alert(sum(1)(2));


////////////////////////////////////////Higher-order Functions///////////////////////////////////////
let elements = [
  'iphone',
  'ipad',
  'Mac',
  'iwatch'
];
//The map() method creates a new array with the results of calling a provided function 
//on every element in the calling array

//or you can do 
function getLengths(x) {
  return x.length;
}
elements.map(getLengths);

//equivalent ways
elements.map(function(element) { 
  return element.length; 
}); 

elements.map(element => {
  return element.length;
});
 
elements.map(element => element.length);

elements.map(({ length }) => length); 

//The filter() method creates a new array with all elements that pass the test implemented
//by the provided function
elements.filter(element => element.includes('i'));
//The reduce() method executes a reducer function on each member of 
//the array resulting in a single output value
elements.reduce((accumulator, currentValue) => accumulator + ' ' + currentValue, 'Who likes');

//or you can do something like
const reducer = (accumulator, currentValue) => accumulator + ' ' + currentValue;
elements.reduce(reducer, 'Who likes');


//exercise
//1. call map to create a new array by adding 1 to all elements to the original array
//2. call filter to return a new array containing all elements in the original array that are greater than 1
//3. call reduce to sum up all elements in the array, with the initial value as 10

const arr = [0, 1, 2, 3, 4];
arr.map(x => x+1);
arr.filter(x => x>2);
arr.reduce((sum, x) => sum + x, 10);

//implement map method
function map (arr, func){
  const newArr = [];
  //arr.foreach(function (var) {newArr.push(func(var));});
  for(let i =0; i < arr.length; i++){
    newArr[i] = func(arr[i]);
  }
  return newArr;
}

//Use map generically
//This example shows how to use map on a String to convert it an array of characters 
var map = Array.prototype.map;
var a = map.call('Hello World', x => x.charAt(0));

//This example shows how to use map on a String to get an array of bytes 
//in the ASCII encoding representing the character values
var map = Array.prototype.map;
//returns the Unicode of the character at the specified index in a string
var b = map.call('Hello World', x => x.charCodeAt(0));

//bind
var map = Array.prototype.map.bind('Hello World');
map(x => x.charCodeAt(0));


////////////////////////////////////////Hoisted Functions///////////////////////////////////////
// functions are hoisted
//butNotThis();

thisShouldWork();

// but only if they are declared as functions and not as variables initialized to
// anonymous functions
console.log("typeof butNotThis: " + typeof butNotThis);

function thisShouldWork() {
    console.log("functions are hoisted");
}

var butNotThis = function() {
    console.log("but variables aren't");
}
////////////////////////////////////////Asynch and Callback functions///////////////////////////////////////
// this function will freeze a browser page if run in console
function hang(seconds = 5) {
  const doneAt = Date.now() + seconds * 1000;
  while(Date.now() < doneAt) {}
}


function printOne() {
  console.log('one');
}

function printTwo() {
  console.log('two');
}

function printThree() {
  console.log('three');
}

// this may not print in the order that you expect, because of the way the JS
// function queue works
setTimeout(printOne, 5000);
setTimeout(printTwo, 0);
printThree();


// this is a HOF that invokes the function argument on 1
function doSomethingWithOne(callback) {
  return callback(1);
}

doSomethingWithOne(console.log);

// this is the same thing, but done asynchronously
function doSomethingWithOneAsync(callback) {
  setTimeout(() => callback(1), 5000);
}

doSomethingWithOneAsync(console.log);

// this simulates a database call that returns an object representing a person
function getUserFromDatabase(callback) {
    // simulates getting data from db
    setTimeout(() => callback({firstName: 'Jordan', lastName: 'Smith'}), 5000);
}

// this is a function that greets a user, which we pass as a callback to getUserFromDatabase
function greetUser(user) {
  console.log('Hi, ' + user.firstName);
}

getUserFromDatabase(greetUser);

//call back hell, some real-world code
function login(req, res, callback) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) return callback(err);

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return callback(err);
      if (!isMatch) return res.status(401).send('Incorrect password');

      // add relevant data to token
      const payload = {id: user._id, email: user.email};

      jwt.sign(payload, config.secret, {}, function(err, token) {
        if (err) return callback(err);

        user.token = token;
        user.save((err) => {
          if (err) return callback(err);
          res.json({token});
        });
      });
    });
  });
}

//refactor callback hell with promise
function login(req, res, callback) {
  User.findOne({email: req.body.email})
    .then(function(user) {
      return user.comparePassword(req.body.password);
    })
    .then(function(isMatch) {
      // have to throw in order to break Promise chain
      if (!isMatch) {
        res.status(401).send('Incorrect password');
        throw {earlyExit: true};
      }
      const payload = {id: user._id, email: user.email};
      return jwt.sign(payload, config.secret, {});
    })
    .then(function(token) {
      user.token = token;
      return user.save();
    })
    .then(function() {
      res.json({token});
    })
    .catch(function(err) {
      if (!err.earlyExit) callback(err);
    });
}

////////////////////////////////////////This///////////////////////////////////////
var person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
      return this.firstName + " " + this.lastName;
  }
};
person.fullName();   


var person = {
  read: function() {
    this.firstName = "John";
    this.lastName = "Doe";
  },
  fullName () {
      return this.firstName + " " + this.lastName;
  }
};
person.read();
person.fullName();         // Will return "John Doe"

let fn = person.fullName;
fn(); //undefined  undefined, because 'this' is now the global object

let student = {
  firstName: 'Sam',
  lastName: 'Smith',
};

student.fullName = person.fullName;
student.fullName(); //Sam Smith

let instructor = {
  firstName: 'Josh',
  lastName: 'Green',
};

//use bind() that returns a new function
let fullName = person.fullName.bind(instructor);
fullName(); //Josh Green

//When the new keyword is used,
//"this" is bound to the new object being created
function Rectangle( width, height ) {
  this.width = width;
  this.height = height;
 }
 const rect = new Rectangle( 3, 4 );
 rect.width; // 3
 rect.height; // 4


//Exercise
//Create an object calculator with three methods.
//read() prompts for two values and saves them as object properties.
//sum() returns the sum of saved values.
//multiply() multiplies saved values and returns the result.

let calculator = {
  // ... your code ...
};

calculator.read();
alert( calculator.sum() );
alert( calculator.multiply() );

//Answer1
let calculator1 = {
  num1: 0,
  num2: 0,
  read(){
    this.num1 = parseInt(prompt("Input a number", 0));
    this.num2 = parseInt(prompt("Input another number", 0));
  },
  sum(){
    return this.num1 + this.num2;
  },
  multiply(){
    return this.num1 * this.num2;
  }
};
//Answer2
let calculator = {
  read() {
    this.a = +prompt('a?', 0);
    this.b = +prompt('b?', 0);
  },
  sum() {
    return this.a + this.b;
  },
  multiply() {
    return this.a * this.b;
  },
};


//The example using bind()
var small = {
  a: 1,
  go: function(b,c,d){
    console.log(this.a+b+c+d);
  }
}
var large = {
  a: 100
}
small.go(2,3,4);
// logs 1+2+3+4 => 10
small.go.call(large,2,3,4); // use call()
//what if we don’t know all 3 arguments yet
let bindTest = small.go.bind(large, 2);
console.log(bindTest);
// logs => function (b,c,d){console.log(this.a+b+c+d);}
bindTest(3,4);


//The example illustrates arrow function with no bound this
function Counter() {
  this.num = 0;
}
var a = new Counter();
a.num;

//===> increase the value of a.num every second?
function Counter() {
  this.num = 0;
  this.timer = setInterval(function add() {
    this.num++;
    console.log(this.num);
  }, 1000);
}

var b = new Counter();
// NaN
// NaN
// NaN
// ...
clearInterval(b.timer);

//Try
function Counter() {
  this.num = 0;
  this.timer = setInterval(function add() {
    console.log(this);
  }, 1000);
}
var b = new Counter();
//window
//window
//window

//To fix it
function Counter() {
  this.num = 0;
  this.timer = setInterval(() => {
    this.num++;
    console.log(this.num);
  }, 1000);
}
var b = new Counter();
// 1
// 2
// 3
// ...
clearInterval(b.timer);

// For proof of concept
function Counter() {
  var that = this;
this.timer = setInterval(() => {
    console.log(this === that);
  }, 1000);
}
var b = new Counter();
// true
// true
// ...
clearInterval(b.timer);

//Exercise
var group = {
  title: "CS4830",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      alert(this.title + ': ' + student);
    });
  }
};

group.showList();

//Solution1
var group = {
  title: "CS4830",
  students: ["John", "Pete", "Alice"],

  showList() {
    let self = this;
    this.students.forEach(function(student) {
      alert(self.title + ': ' + student);
    });
  }
};

group.showList();

//Solution2
var group = {
  title: "CS4830",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(function(student) {
      alert(this.title + ': ' + student);
    }.bind(this));
  }
};

group.showList();

//Solution3
var group = {
  title: "CS4830",
  students: ["John", "Pete", "Alice"],

  showList() {
    this.students.forEach(student => alert(this.title + ': ' + student));
  }
};

group.showList();

//don't use arrow function for an attribute within an object literal
const someObj = {
  someFunc() { return this; },
  someArrow: () => this
};

someObj.someArrow();//window

