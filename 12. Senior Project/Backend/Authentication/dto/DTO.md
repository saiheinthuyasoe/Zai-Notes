## What is DTO?

In **Spring Boot**, a **DTO** (Data Transfer Object) is a **plain Java object** used to **transfer data** between layers of an application — especially between the backend (controller/service) and the client (like a frontend or API consumer).

---

### ✅ What is a DTO?

- DTO stands for **Data Transfer Object**
- It **does not contain any business logic or persistence logic**
- It's mainly used to:

  - Shape the response or request body
  - Limit or customize what data is sent over the network
  - Protect internal entity structure (hide sensitive info)
  - Improve performance by reducing unnecessary fields

---

### 💡 Why not use Entity directly?

Using JPA entities directly in API responses or requests can lead to:

- **Security issues** (e.g., exposing passwords or IDs)
- **Over-posting attacks** (e.g., changing fields like `isAdmin`)
- **Tightly coupled layers** (e.g., changing DB affects API)

---

### 🧱 Example:

#### 🎯 Entity (connected to database)

```java
@Entity
public class User {
    @Id
    private Long id;
    private String username;
    private String email;
    private String password; // sensitive!
}
```

#### 📦 DTO (used for API)

```java
public class UserDTO {
    private String username;
    private String email;
}
```

#### 🔄 Mapping (manual or using ModelMapper/MapStruct)

```java
public UserDTO convertToDTO(User user) {
    UserDTO dto = new UserDTO();
    dto.setUsername(user.getUsername());
    dto.setEmail(user.getEmail());
    return dto;
}
```

---

### 🚀 Usage in Controller

```java
@GetMapping("/users/{id}")
public UserDTO getUser(@PathVariable Long id) {
    User user = userService.findById(id);
    return convertToDTO(user);
}
```

---

### 🔁 Tools to Map Entity ↔ DTO:

- ✅ **Manual mapping**
- ⚙️ **ModelMapper** (automatic mapping library)
- ⚡ **MapStruct** (compile-time mapping tool, very fast)

---

### ✅ Summary:

| **Entity**                                | **DTO**                       |
| ----------------------------------------- | ----------------------------- |
| Used to represent DB tables               | Used to transfer data in APIs |
| Managed by JPA/Hibernate                  | Not managed by JPA            |
| Might contain sensitive fields            | Exposes only necessary fields |
| Can have relationships (e.g., @OneToMany) | Usually flat and lightweight  |
