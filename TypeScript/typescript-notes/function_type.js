/* This is usual defining of Arrow function

 const hello = (name) => {
    return "Hello" + name;
  };

*/
// This is defining of Arrow function with primitive type
var hello = function (name) {
    return "Hello" + name + "!";
};
console.log(hello("World"));
// This is defining of Arrow function with primitive type
var calculateAge = function (age) {
    return new Date(Date.now()).getFullYear() - age;
};
console.log(calculateAge(2001));
// This is defining of Arrow function with object type 
var hello1 = function (userInfo) {
    return "Hello! Name is " + userInfo.name + " and Age is " + userInfo.age;
};
console.log(hello1({ name: "John Doe", age: "25" }));
