// Object type (object)

// create type for object
type user = {
    name: string,
    age: number,
}

// use type for object
let user1 : user;

// assign value to object
user1 = {
    name: 'John Doe',
    age: 25
}

// create type for object with optional variable
type userx = {
    name: string,
    age: number,
    gender?
}

// use type for object with optional variable
let user2 : userx;

// assign value to object including optional variable
user2 = {
    name: 'John Doe',
    age: 25,
    gender : "male"
}

// assign value to object with const
// if you use const, you must assign value to all variable
const user3 : user = {
    name: 'John Doe',
    age: 25
}


//  object type variable and assign values with const
const usery : {
    name: string,
    age: number
} = {
    name: 'John Doe',
    age: 25
}

// array of object type variable and assign array values with const
const users: {
    name: string,
    age: number
}[] = [usery, usery]


// array of object type variable and assign array values with const more clean
const users1: user[] = [usery, usery]
