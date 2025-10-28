## What is Entity in SpringBoot?

In **Spring Boot**, an **entity** is a **Java class that maps to a database table** using **JPA (Java Persistence API)**. It represents a data model or real-world object that you want to store in the database — such as `User`, `Product`, or `Post`.

---

### ✅ Key Points about Entities:

- **Annotated with `@Entity`** from `jakarta.persistence` or `javax.persistence`
- Fields in the class represent **columns in a table**
- Must have a **primary key** marked with `@Id`
- Often used with **Spring Data JPA** for database operations

---

### 🧱 Example:

```java
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;

    // Constructors, Getters, Setters
}
```

This `User` entity maps to a table called `user` in the database.

---

### 🛠️ How it Works with Spring Boot:

1. **Spring Boot + Spring Data JPA** auto-detects the entity.
2. You can create a **repository interface** like:

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
```

3. Then you can do operations like:

```java
userRepository.save(new User(...));
List<User> users = userRepository.findAll();
```

---

### ⚠️ Requirements:

- Annotated with `@Entity`
- Must have a **no-arg constructor** (can be implicit)
- Must be a **class** (not interface or enum)
- Must not be final (so proxies can be created)

---
