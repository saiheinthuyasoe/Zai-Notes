## What is impl in the Service at SpringBoot?

In **Spring Boot (and Java in general)**, `impl` usually refers to a class that provides the **implementation** of a **service interface**. It’s short for **"implementation"**.

---

### 📌 What it means in Spring Boot:

When we design applications in **layers** (common in Spring Boot), we often define:

- An **interface** (e.g. `UserService`) that declares methods
- A **class** (e.g. `UserServiceImpl`) that implements those methods

This separates the **contract** from the **implementation**, allowing better testing, flexibility, and code organization.

---

### ✅ Example:

#### 1. **Service Interface**

```java
public interface UserService {
    UserResponse getUserById(Long id);
}
```

#### 2. **Service Implementation (`UserServiceImpl`)**

```java
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user.getId(), user.getName());
    }
}
```

---

### 🧠 Why use this pattern?

- **Abstraction:** Code depends on interfaces, not implementations
- **Testability:** You can mock the `UserService` interface in tests
- **Flexibility:** Easily swap or extend implementations

---
