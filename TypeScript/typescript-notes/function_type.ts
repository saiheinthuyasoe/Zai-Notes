/* This is usual defining of Arrow function 

 const hello = (name) => {
    return "Hello" + name;
  };

*/

// This is defining of Arrow function with primitive type
const hello = (name: string): string => {
  return "Hello" + name + "!";
};

console.log(hello("World"));

// This is defining of Arrow function with primitive type
const calculateAge = (age: number): number => {
  return new Date(Date.now()).getFullYear() - age;
};

console.log(calculateAge(2001));

// This is defining of Arrow function with object type
const hello1 = (userInfo: { name: string; age: string }): string => {
  return "Hello! Name is " + userInfo.name + " and Age is " + userInfo.age;
};

console.log(hello1({ name: "John Doe", age: "25" }));
