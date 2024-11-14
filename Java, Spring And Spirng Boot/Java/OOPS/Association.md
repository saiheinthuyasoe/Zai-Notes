# Association in Java with Examples

## Association

In Java (and in object-oriented programming in general), **association** refers to a relationship between two separate classes that are **connected in some way** but **do not have a strong dependency** on each other. It’s a "uses-a" or "has-a" relationship, where one class can use or be linked to another class without being a fundamental part of it.

Association is a more general form of relationship than **composition** and **aggregation** (which are specific types of associations), and it doesn’t imply ownership or strict dependency.

### Types of Associations

1. **One-to-One Association**: A single instance of one class is associated with a single instance of another class.

   - Example: A **person** and their **passport**.

2. **One-to-Many Association**: A single instance of one class is associated with multiple instances of another class.

   - Example: A **teacher** and multiple **students**.

3. **Many-to-One Association**: Multiple instances of one class are associated with a single instance of another class.

   - Example: Multiple **employees** working for a single **department**.

4. **Many-to-Many Association**: Multiple instances of one class are associated with multiple instances of another class.
   - Example: **Students** and **courses** (students can enroll in multiple courses, and each course can have multiple students).

In Java, association relationships describe how classes relate to each other. These associations are divided into:

- **IS-A Association**
- **HAS-A Association**

The **HAS-A Association** can be further classified into **Aggregation** and **Composition**.

## 1. IS-A Association (Inheritance)

The **IS-A Association** is also called **Inheritance**. This type of association creates an **"is-a"** relationship where one class inherits from another class. In Java, this is implemented using the `extends` keyword.

### Example: Vehicle and Car

In this example, `Car` is a subclass of `Vehicle`, which means a **Car IS-A Vehicle**.

```java
class Vehicle {
    void start() {
        System.out.println("Vehicle starts");
    }
}

class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives");
    }
}

public class Main {
    public static void main(String[] args) {
        Car car = new Car();
        car.start();  // Inherited from Vehicle
        car.drive();  // Defined in Car
    }
}
```

In this case:

- `Car` inherits `Vehicle`'s properties and methods.
- This IS-A association signifies that **Car IS-A type of Vehicle**.

## 2. HAS-A Association

The **HAS-A Association** defines a "whole-part" relationship, meaning one class contains or "has" a reference to another. HAS-A relationships can be further classified into **Aggregation** and **Composition**.

### 1) Aggregation (Loose HAS-A relationship)

In **Aggregation**, objects have independent lifecycles. This means that the parts can exist independently of the whole, even though one object "has" another.

### Example: Library and Book

A **Library** has many **Book** objects, but the **Book** objects can exist independently of the **Library**.

```java
import java.util.List;
import java.util.ArrayList;

class Book {
    String title;
    String author;

    Book(String title, String author) {
        this.title = title;
        this.author = author;
    }
}

class Library {
    List<Book> books;

    Library(List<Book> books) {
        this.books = books;
    }
}

public class Main {
    public static void main(String[] args) {
        Book book1 = new Book("Java Basics", "Author A");
        Book book2 = new Book("Advanced Java", "Author B");

        List<Book> books = new ArrayList<>();
        books.add(book1);
        books.add(book2);

        Library library = new Library(books);
        System.out.println("Library contains books.");
    }
}
```

In this case:

- The `Library` has a collection of `Book` objects.
- If the `Library` is deleted, the `Book` objects can still exist elsewhere, independently.

### 2) Composition (Strong HAS-A relationship)

In **Composition**, the lifecycle of parts is tied to the whole. If the "whole" object is destroyed, the "parts" are also destroyed, as they cannot exist independently.

### Example: House and Room

A **House** contains **Room** objects, but if the **House** is destroyed, the **Room** objects are also destroyed.

```java
import java.util.List;
import java.util.ArrayList;

class Room {
    String name;

    Room(String name) {
        this.name = name;
    }
}

class House {
    List<Room> rooms;

    House(List<Room> rooms) {
        this.rooms = rooms;
    }
}

public class Main {
    public static void main(String[] args) {
        Room room1 = new Room("Living Room");
        Room room2 = new Room("Bedroom");

        List<Room> rooms = new ArrayList<>();
        rooms.add(room1);
        rooms.add(room2);

        House house = new House(rooms);
        System.out.println("House contains rooms.");
    }
}
```

In this case:

- The `House` has a collection of `Room` objects.
- If the `House` is destroyed, the `Room` objects also cease to exist, as they are a part of the `House`.

## Summary

- **IS-A Association**: Represents inheritance. Example: `Car IS-A Vehicle`.
- **HAS-A Association**:
  - **Aggregation**: Loose HAS-A relationship, where parts have an independent lifecycle. Example: `Library HAS-A Book`.
  - **Composition**: Strong HAS-A relationship, where parts are dependent on the whole for their lifecycle. Example: `House HAS-A Room`.
