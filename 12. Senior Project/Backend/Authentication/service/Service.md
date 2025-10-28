## What is service in SpringBoot?

In **Spring Boot**, a **Service** is a class that contains the **business logic** of your application. It's part of the **Service Layer** in a typical **3-layer architecture**:

```
Controller (API layer) → Service (business logic) → Repository (database)
```

---

### ✅ What is a Service?

- A **Java class** annotated with `@Service`
- It holds core **logic**, **rules**, or **processing steps** that aren't just database operations
- It acts as a **middle layer** between the controller and the repository

---

### 🧱 Example Structure

#### 🧩 Entity:

```java
@Entity
public class User {
    @Id
    private Long id;
    private String name;
    private String email;
}
```

#### 🗃️ Repository:

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

#### 🧠 Service:

```java
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // More business logic can go here
}
```

#### 📡 Controller:

```java
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
```

---

### 🔍 Why use `@Service`?

- **Organizes logic cleanly**
- **Encapsulates business rules**
- Enables **easy testing** (mock service logic)
- Makes code more **modular** and **maintainable**

---

### ✅ Summary:

| Layer       | Responsibility                    | Annotation        |
| ----------- | --------------------------------- | ----------------- |
| Controller  | Handle HTTP/API requests          | `@RestController` |
| **Service** | Business logic (decisions, rules) | `@Service`        |
| Repository  | Interact with the database (CRUD) | `@Repository`     |

---
