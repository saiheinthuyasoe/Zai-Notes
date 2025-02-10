// Run: tsc primitive_type.ts
// Run: tsc --noEmitOnError primitive_type.ts
// Run: primitive_type.js (node hello.js) in primitive_type.js file directory

// Primitive type variable (string, number, boolean, null, undefined, symbol, bigint)
type hello = string;
let greeting : hello;
let userName: string | number;
let age: number;

// assign value to variable
greeting = 'Hello, ';
userName = 'John Doe';
age = 25;

// Output: My name is John Doe and I am 25 years old.
console.log(greeting + "My name is " + userName + " and I am " + age + " years old.");





