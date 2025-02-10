// Generics are a way to make components more reusable. They allow you to write a function or a class that can work with any data type.
const func = <T>(arg: T): T => {
    return arg;
}
// The <T> syntax is used to declare a generic type T. This type can be any data type, and it is used to define the type of the argument and the return value of the function.

// You can call the function with any data type, and TypeScript will infer the type based on the argument you pass.
const value = func<number>(123); // value is number
const value2 = func<String>('hello'); // value is string
const value3 = func<boolean>(true); // value is boolean
const value4 = func<{name: string}>({name: 'John'}); // value is {name: string}
const value5 = func<string[]>(['a', 'b', 'c']); // value is string[]

// You can also use generics with interfaces to define the shape of a generic type.
interface Song {}
const value6 = func<Song>("john"); // value is number[]

console.log(value, value2, value3, value4, value5, value6);