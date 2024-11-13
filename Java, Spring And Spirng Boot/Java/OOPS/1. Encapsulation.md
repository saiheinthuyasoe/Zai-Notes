# Encapsulation in JAVA

### Simple Explanation
Imagine a **capsule pill**. Inside the capsule, there’s medicine that you need, but you don’t directly handle the ingredients. Instead, the capsule provides a safe way for you to take the medicine without having to see or mix its contents.

In programming, **encapsulation** works the same way:
- **The capsule (class)** contains the data (like variables) and behavior (like methods) together.
- **The data inside** is hidden from direct access, which means you can’t change it randomly from outside.
- Instead, **you interact with the capsule** by taking it, which is like calling specific methods that let you use the object safely.

### What is Encapsulation in Java?

In Java, **encapsulation** is one of the four fundamental principles of **object-oriented programming (OOP)**, alongside **inheritance**, **polymorphism**, and **abstraction**. Encapsulation is a technique of wrapping data (attributes) and methods (functions) that operate on that data into a single unit, typically a **class**. It restricts direct access to certain parts of an object’s internal state, allowing only specific, controlled access through methods. This helps protect data integrity and provides a more organized and modular structure to the code.

The core idea of encapsulation is to keep the data **hidden from outside access** and to provide public methods that let other parts of the program interact with that data in a controlled way. Java achieves this by using **access modifiers** like `private`, `protected`, and `public` to control visibility.

### Key Components of Encapsulation in Java

1. **Private Variables**: Fields within a class are usually marked as `private` to restrict direct access from outside the class.
2. **Public Getter and Setter Methods**: Public methods provide controlled access to private fields. These are often referred to as **getter** and **setter** methods.
3. **Access Modifiers**: Java provides keywords like `private`, `protected`, `public`, and `default` (no modifier) to control access to fields and methods. `private` hides the field from other classes, while `public` exposes methods to the outside world, allowing controlled access.

### Why Use Encapsulation?

Encapsulation in Java offers several benefits:
- **Data Security**: By making fields private, Java prevents unauthorized modification of an object’s state from outside the class.
- **Control**: Getter and setter methods provide controlled access, allowing you to impose conditions on how fields can be modified.
- **Easier Maintenance and Flexibility**: The internal structure of the class can be changed without affecting the external code that interacts with the class, as long as the public methods remain consistent.
- **Modularity**: It makes the code modular, meaning that each class is a self-contained unit with its own data and behavior. This improves code readability and reusability.

### How Encapsulation Works in Java

Let’s use a simple example of a `BankAccount` class to illustrate how encapsulation is implemented in Java.

#### Step 1: Define Private Fields
First, we declare the fields of the class as `private` to prevent direct access from outside the class.

```java
public class BankAccount {
    private String accountNumber;  // Encapsulated fields
    private double balance;
}
```

#### Step 2: Create Getter and Setter Methods
To allow controlled access to these private fields, we define **getter** and **setter** methods. These methods provide a public interface for interacting with private data.

```java
public class BankAccount {
    private String accountNumber;
    private double balance;

    // Constructor to initialize account
    public BankAccount(String accountNumber) {
        this.accountNumber = accountNumber;
        this.balance = 0.0; // start with zero balance
    }

    // Getter method for balance
    public double getBalance() {
        return balance;
    }

    // Method to deposit money (a "setter" for balance)
    public void deposit(double amount) {
        if (amount > 0) { // Only allow positive deposit amounts
            balance += amount;
        } else {
            System.out.println("Deposit amount must be positive.");
        }
    }

    // Method to withdraw money (another setter)
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) { // Prevent overdrafts
            balance -= amount;
        } else {
            System.out.println("Invalid withdraw amount.");
        }
    }
}
```

#### Explanation of Code

1. **Private Fields**: `accountNumber` and `balance` are marked `private`, preventing them from being accessed directly from outside the `BankAccount` class.
  
2. **Getter for Balance**: `getBalance()` allows controlled, read-only access to the balance.

3. **Deposit and Withdraw Methods (Setters)**:
   - `deposit(double amount)` and `withdraw(double amount)` act as setters for the `balance` field, but they include logic to check the validity of the amount (like no negative deposits or withdrawals beyond the current balance).
   - These methods protect the integrity of the `balance` field and prevent invalid operations.

#### Step 3: Use Encapsulated Class in Code

Here’s how the encapsulated `BankAccount` class would be used in another class:

```java
public class Main {
    public static void main(String[] args) {
        // Create a new BankAccount object
        BankAccount myAccount = new BankAccount("12345");

        // Access and modify balance using public methods only
        myAccount.deposit(1000);  // Deposits $1000
        System.out.println("Balance: " + myAccount.getBalance());

        myAccount.withdraw(200);  // Withdraws $200
        System.out.println("Balance: " + myAccount.getBalance());

        // Attempting an invalid operation
        myAccount.withdraw(1000); // Will not work because balance is insufficient
    }
}
```

### Key Observations

- **Data Protection**: The actual fields `accountNumber` and `balance` are hidden from direct access. The only way to interact with the `balance` is through `deposit` and `withdraw` methods, which include checks.
- **Controlled Access**: The `deposit` and `withdraw` methods ensure that only valid operations are allowed. This prevents the balance from being accidentally set to an incorrect value.

### Benefits of Encapsulation in the Example

1. **Security**: The `balance` field cannot be directly changed by external code, ensuring that unauthorized or unintended changes don’t occur.
2. **Validation**: The `deposit` and `withdraw` methods enforce rules, such as disallowing overdrafts. Direct access would bypass these checks.
3. **Encapsulation Supports Abstraction**: Users of `BankAccount` do not need to know how `balance` is managed internally; they just interact through public methods.

### Access Modifiers and Their Role in Encapsulation

Java provides several access modifiers to control visibility, which are critical in encapsulation:

1. **Private**: The most restrictive. Only accessible within the class itself.
2. **Default (Package-Private)**: Accessible within the same package but not from outside.
3. **Protected**: Accessible within the same package and by subclasses.
4. **Public**: Accessible from any other class.

In encapsulation, `private` is often used for fields to hide them from other classes, while `public` is used for methods that provide controlled access.

### Example Summary

In summary, encapsulation in Java is all about:
- **Hiding fields** with `private` access modifiers.
- **Exposing functionality** through public methods (like getters and setters).
- **Maintaining control** over how data is accessed or modified, ensuring data integrity and security.

### Additional Example: Encapsulation in a `Person` Class

Here’s another example with a `Person` class where age is encapsulated and validated.

```java
public class Person {
    private String name;
    private int age;

    // Constructor
    public Person(String name, int age) {
        this.name = name;
        setAge(age);  // Using setter to ensure validation
    }

    // Getter and Setter for age with validation
    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0 && age <= 150) { // Age must be reasonable
            this.age = age;
        } else {
            System.out.println("Invalid age.");
        }
    }

    // Getter for name
    public String getName() {
        return name;
    }
}
```

Using this class:

```java
Person john = new Person("John Doe", 30);
john.setAge(-5);   // Outputs "Invalid age."
john.setAge(35);   // Sets age correctly
System.out.println("John's age: " + john.getAge()); // Outputs 35
```

### Final Summary

Encapsulation in Java:
1. **Wraps data and behavior** together in a class.
2. **Uses access modifiers** to hide fields and expose only necessary functionality.
3. **Provides public methods** (getters and setters) to control access to the data.
4. **Enhances data integrity**, prevents misuse, and makes code modular and maintainable.

By keeping internal states private and controlling access, encapsulation ensures that each object is used correctly and consistently, protecting both the data and the integrity of your code.