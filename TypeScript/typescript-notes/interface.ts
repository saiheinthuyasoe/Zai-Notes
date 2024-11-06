/*
Object literals in JavaScript and TypeScript expect properties (or methods) to be assigned using :. 
When you use =, it looks like you're trying to perform an assignment inside the object, 
which isn't allowed because object literals define properties, not assignments.
*/

// Initialize interface
interface Player {
  currentSong: string;
  currentSongDuration: number;
  play: () => void;
  pause: () => void;
  next: () => void;
  previous: () => void;
}

// create object with interface
const player: Player = {
  currentSong: "Stay",
  currentSongDuration: 50_000, // 50000 means 50 seconds
  play: () => {
    console.log("Playing " + this.currentSong);
  },
  pause: () => {
    console.log("Paused" + this.currentSong);
  },
  next: () => {
    console.log("Next song");
  },
  previous: () => {
    console.log("Previous song");
  },
};

// implement interface with class
class AudioPlayer implements Player {
  currentSong: string;
  currentSongDuration: number; // 50000 means 50 seconds
  constructor(songInfo: { name: string; duration: number }) {
    this.currentSong = songInfo.name;
    this.currentSongDuration = songInfo.duration;
  }

  play = () => {
    console.log("Playing " + this.currentSong);
  };
  pause = () => {
    console.log("Paused" + this.currentSong);
  };
  next = () => {
    console.log("Next song");
  };
  previous = () => {
    console.log("Previous song");
  };
}

// create object with class
const player1 = new AudioPlayer({ name: "Stay", duration: 50_000 });
const player2 = new AudioPlayer({ name: "Happier", duration: 30_000 });

// print object
console.log(player1.currentSong, player1.currentSongDuration);
console.log(player2.currentSong, player2.currentSongDuration);

/*

Difference between interface and type in TypeScript

In TypeScript, both `interface` and `type` are used to define the shape of objects, but they have some differences in terms of capabilities, syntax, and how they are used. Here's a detailed breakdown of the differences between `interface` and `type`:

### 1. **Basic Syntax and Usage**

- **`interface`**: Used primarily to describe the shape of an object, but can also define functions, arrays, classes, etc.
  
  ```typescript
  interface Person {
    name: string;
    age: number;
  }

  const person: Person = {
    name: "John",
    age: 30,
  };
  ```

- **`type`**: Can also define the shape of an object, but has broader capabilities beyond just objects (e.g., union types, primitives, function types, etc.).

  ```typescript
  type Person = {
    name: string;
    age: number;
  };

  const person: Person = {
    name: "John",
    age: 30,
  };
  ```

### 2. **Extensibility (Declaration Merging)**

- **`interface` supports declaration merging**: You can declare an `interface` multiple times, and TypeScript will merge them into a single interface.

  ```typescript
  interface Person {
    name: string;
  }

  interface Person {
    age: number;
  }

  const person: Person = {
    name: "John",
    age: 30,
  };
  ```

  This is helpful when you need to extend an existing interface or modify it in a different file.

- **`type` does not support declaration merging**: You cannot define the same `type` multiple times; doing so will result in an error.

  ```typescript
  type Person = {
    name: string;
  };

  // This will cause an error because you cannot redeclare a type
  type Person = {
    age: number;
  };
  ```

### 3. **Union and Intersection Types**

- **`type` supports union and intersection types**: This is one of the powerful features of the `type` keyword, allowing you to create complex types by combining multiple types.

  - **Union types**:
    ```typescript
    type Status = "success" | "error" | "pending";

    let responseStatus: Status = "success"; // valid
    ```

  - **Intersection types**:
    ```typescript
    type Drivable = {
      drive(): void;
    };

    type Flyable = {
      fly(): void;
    };

    type FlyingCar = Drivable & Flyable; // Intersection type

    const myFlyingCar: FlyingCar = {
      drive() { console.log("Driving"); },
      fly() { console.log("Flying"); }
    };
    ```

- **`interface` does not directly support union types**: You cannot use `interface` to represent a union of multiple types, but it can represent intersection types via `extends`.

  - To define an intersection using `interface`:
    ```typescript
    interface Drivable {
      drive(): void;
    }

    interface Flyable {
      fly(): void;
    }

    interface FlyingCar extends Drivable, Flyable {}

    const myFlyingCar: FlyingCar = {
      drive() { console.log("Driving"); },
      fly() { console.log("Flying"); }
    };
    ```

### 4. **Function Signatures**

Both `interface` and `type` can be used to define function signatures, but the syntax is slightly different.

- **Using `interface` to define a function signature**:
  ```typescript
  interface Add {
    (a: number, b: number): number;
  }

  const add: Add = (a, b) => a + b;
  ```

- **Using `type` to define a function signature**:
  ```typescript
  type Add = (a: number, b: number) => number;

  const add: Add = (a, b) => a + b;
  ```

### 5. **Classes**

Both `interface` and `type` can be used to define the shape of classes.

- **Using `interface`**:
  ```typescript
  interface Person {
    name: string;
    age: number;
  }

  class Student implements Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

- **Using `type`**:
  ```typescript
  type Person = {
    name: string;
    age: number;
  };

  class Student implements Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }
  ```

### 6. **Other Key Differences**

- **Primitive Types**:
  - **`type`** can be used to create aliases for primitive types, unions, tuples, etc., whereas `interface` cannot be used for these purposes.

    ```typescript
    type StringAlias = string;
    type NumberOrString = number | string;
    ```

    You cannot do this with `interface`:
    ```typescript
    // Invalid
    interface StringAlias = string; // ❌
    ```

- **Mapped Types**:
  - **`type`** can be used with mapped types to create new types based on existing types. This is something that `interface` cannot do.

    ```typescript
    type ReadonlyPerson = {
      readonly [K in keyof Person]: Person[K];
    };
    ```

### 7. **Recommendation**

- **Use `interface` when defining the shape of an object or class**: Interfaces are generally preferred when you're describing the structure of an object or working with class-like designs. They support declaration merging and are more easily extendable in complex systems.

- **Use `type` for more complex type scenarios**: Use `type` when you need features like union types, intersection types, mapped types, or when you're dealing with types that aren't strictly objects (e.g., primitives, functions, or tuples).

### Conclusion

- **`interface`**: Best for defining object shapes and supporting inheritance through `extends`. It supports declaration merging, making it ideal for working with large codebases or libraries.
  
- **`type`**: More versatile and can handle not just object shapes but also unions, intersections, primitives, and more. It's great for complex type manipulations.

The choice depends on your specific needs, but they are often interchangeable for simple object definitions.

*/
