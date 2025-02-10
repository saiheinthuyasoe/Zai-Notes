// Generics are a way to make components more reusable. They allow you to write a function or a class that can work with any data type.
var func = function (arg) {
    return arg;
};
// The <T> syntax is used to declare a generic type T. This type can be any data type, and it is used to define the type of the argument and the return value of the function.
// You can call the function with any data type, and TypeScript will infer the type based on the argument you pass.
var value = func(123); // value is number
var value2 = func('hello'); // value is string
var value3 = func(true); // value is boolean
var value4 = func({ name: 'John' }); // value is {name: string}
var value5 = func(['a', 'b', 'c']); // value is string[]
var value6 = func("john"); // value is number[]
console.log(value, value2, value3, value4, value5, value6);
