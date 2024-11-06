// Any type can be used to define the shape of a class, but `interface` is more commonly used for this purpose.
// Don't use any type

// assign type to variable
type id = any;

// assign value to variable
const userId: id = 123;
const userName: id = 'John Doe';
const userAge: id = 25;

// assign type and value to variable
const shape: any = "circle";

console.log(userId, userName, userAge, shape);

