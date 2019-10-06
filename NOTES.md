### How do you check if the result of a numerical operation is invalid?

Ans. We use `Number.isNaN()`

```$xslt
  var something = "Hello world";
  var result = something / 2;
  console.log(Number.isNaN(result)); // true
  console.log(result); // NaN - result of an invalid numerical operation.
```


### In Javascript when should you not use `new`

Ans. We should not use `new` for creating 
- String
- Number and
- Boolean 

If we create a String, Number or a Boolean using new, their type will be an object and we can attach properties to them as well. It is not a very intuitive use of a String, Number or a boolean.
```
  var someString = new String("aaaa");
  var someBool = new Boolean("false");
  var someNum = new Number(5);
  console.log(typeof someString , typeof someBool, typeof someNum); // object object object
```

### Create a Date and convert and log it to UTC String.

Solution.
```$xslt
  var someDate = new Date("May 28, 2019");
  console.log(someDate.toUTCString());
```

### What is coercion

Ans. Type conversion in a dynamically typed language is called coercion.

### What will be the output?
```
  var numberOfStudents = 16;
  console.log(`There are ${numberOfStudents} students in the class`);
```

Ans. "There are 16 students in the class"

### How can we make the number to string coercion explicit?

Ans. `console.log(`There are ${numberOfStudents+""} students in the class`);`

When ever one of the operands of `+` is a string, Javascript perform string coercion on other operands. The only time it does a numeric operation is when both the operands are number.

### What will it output if logged?
`var numberOfStudents = 16 + "1" ;`

Ans. 161

### How to make it output 17?

Ans. 
option 1. use a + before "1" `var numberOfStudents = 16 + +"1" ;`
option 2. use Number() without new. `var numberOfStudents = 16 + Number("1") ;`

### What do you mean by falsy and truthy

Ans. If we try to convert a truthy value to a boolean it will become true & the values that become false when we try to convert them to a boolean are called falsy.

### List all falsy and truthy values in Javascript

Ans. 
- "" (empty string)
- 0, -0
- null
- NaN
- false
- undefined

every thing else is truthy.

### How to you explicitly convert a value to a Boolean?

Ans. Using `!!` or `Boolean()` 
```
  var numberOfStudents = 0;
  console.log(!!numberOfStudents);
  console.log(Boolean(numberOfStudents));
```


### What's the difference between `==` and `===` .

Ans. `==` allows coercion ; `===` doesnot allow coercion;


### State true of false - when types are same , `==` and `===` do the same thing. 

Ans. Yes, true. When types are the same, `==` and `===` do the exact same thing.

### What will it return `console.log(null == undefined);`

Ans. true

null and undefined both are falsy value and both are coerced to false. hence the above expression returns true.

however, `console.log(null === undefined);` will return false because `===` doesnot allow coercion and types of null and undefined are different . type of null is object whereas undefined is undefined.

### What's the difference between undeclared and undefined

undefined -> has been declared but it does not have a value
undeclared -> was never declared anywhere, we just started referencing it

### What determines the `this` of a function?

A functions this references the execution context for that call, determined entirely by how that function was called.

*Implicit binding*
at the place where function is called, there is a reference to the object with a `.`
```
  var vehicle = {
    name: 'Hundai i20',
    say(noise) {
      console.log(`${this.name} is saying ${noise}`);
    }
  };

  vehicle.say('brromm vroom');
```


*Explicit binding* using `call` to set the context of this
```
  function say(noise){
    console.log(`${this.name} is saying ${noise}`);
  }

  var myContext = {
    name: 'my car'
  };

  say.call(myContext, 'vroom brooom');
```

Other ways of explicit binding are using `apply` and `bind`











