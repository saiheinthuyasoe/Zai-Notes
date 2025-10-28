## What is EmailChangeToken?

An **EmailChangeToken** is a security mechanism used to verify and authorize email address changes in user accounts. It's a temporary, time-limited token that ensures only the legitimate account owner can change their email address.

### Purpose and Security Flow:

1. **User requests email change** → System generates a token
2. **Token sent to new email** → User clicks link with token
3. **Token validation** → System verifies token and updates email
4. **Token becomes invalid** → After use or expiration

This prevents unauthorized email changes and ensures the new email address is actually accessible to the user.

## Detailed Analysis of EmailChangeToken.java

### **1. Class Structure & Annotations:**

```java
@Entity
@Table(name = "email_change_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
```

**Key differences from RefreshToken:**

- **`@EntityListeners(AuditingEntityListener.class)`**: Enables Spring Data JPA auditing
- Maps to `email_change_tokens` table
- Uses Spring's auditing for automatic timestamp management

### **2. Core Fields Analysis:**

**Primary Key:**

```java
@Id
@GeneratedValue(strategy = GenerationType.UUID)
private UUID id;
```

- Same UUID strategy as RefreshToken for consistency

**User Relationship:**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;
```

- Links to the User entity
- Many email change tokens can belong to one user (if they request multiple changes)

**Token & New Email:**

```java
@Column(nullable = false, unique = true)
private String token;

@Column(name = "new_email", nullable = false)
private String newEmail;
```

- **`token`**: The verification token (unique across all tokens)
- **`newEmail`**: The email address the user wants to change to
- This is a key difference from RefreshToken - it stores the target email

**Expiration:**

```java
@Column(name = "expires_at", nullable = false)
private LocalDateTime expiresAt;
```

- When the token becomes invalid
- Typically shorter lifespan than refresh tokens (hours vs days)

### **3. Usage Tracking Fields:**

**Usage Status:**

```java
@Column(name = "used")
@Builder.Default
private Boolean used = false;

@Column(name = "used_at")
private LocalDateTime usedAt;
```

- **`used`**: Whether the token has been consumed (defaults to false)
- **`usedAt`**: When the token was used (for audit purposes)

**Creation Timestamp:**

```java
@CreatedDate
@Column(name = "created_at", nullable = false, updatable = false)
private LocalDateTime createdAt;
```

- **`@CreatedDate`**: Spring Data JPA automatically sets this
- **`updatable = false`**: Cannot be modified after creation
- More sophisticated than RefreshToken's `@PrePersist` approach

### **4. Business Logic Methods:**

**Expiration Check:**

```java
public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
}
```

- Same logic as RefreshToken
- Checks if current time is after expiration

**Validity Check:**

```java
public boolean isValid() {
    return !used && !isExpired();
}
```

- **Key difference**: Checks `!used` instead of `!revoked`
- Token is valid if: not used AND not expired
- Simpler than RefreshToken (no revocation tracking)

### **5. Database Schema:**

This creates a table with columns:

- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users table)
- `token` (String, Unique)
- `new_email` (String)
- `expires_at` (DateTime)
- `used` (Boolean, default false)
- `created_at` (DateTime, auto-generated)
- `used_at` (DateTime, nullable)

### **6. Comparison with RefreshToken:**

| Feature             | RefreshToken                 | EmailChangeToken               |
| ------------------- | ---------------------------- | ------------------------------ |
| **Purpose**         | Authentication renewal       | Email change verification      |
| **Lifespan**        | Long (days/weeks)            | Short (hours)                  |
| **Usage**           | Multiple uses                | Single use                     |
| **Revocation**      | Manual revocation with audit | Automatic after use            |
| **Additional Data** | None                         | Stores new email               |
| **Auditing**        | Manual `@PrePersist`         | Spring Data JPA `@CreatedDate` |

### **7. Security Features:**

1. **Single Use**: Tokens become invalid after first use
2. **Time Limitation**: Automatic expiration prevents indefinite validity
3. **Unique Tokens**: Prevents token reuse attacks
4. **Email Verification**: Ensures user owns the new email address
5. **Audit Trail**: Tracks when tokens are created and used

### **8. Typical Usage Flow:**

```java
// 1. User requests email change
EmailChangeToken token = EmailChangeToken.builder()
    .user(user)
    .token(generateUniqueToken())
    .newEmail("newemail@example.com")
    .expiresAt(LocalDateTime.now().plusHours(24))
    .build();

// 2. Token is saved and email sent

// 3. User clicks link, token is validated
if (token.isValid()) {
    // Update user's email
    user.setEmail(token.getNewEmail());
    token.setUsed(true);
    token.setUsedAt(LocalDateTime.now());
    // Save both entities
}
```

### **9. Security Benefits:**

- **Prevents unauthorized email changes**: Only token holder can change email
- **Verifies email ownership**: User must access the new email to use token
- **Time-limited**: Reduces window of opportunity for attacks
- **Single-use**: Prevents replay attacks
- **Audit trail**: Tracks all email change attempts

This implementation provides a secure, user-friendly way to handle email address changes while maintaining proper security controls and audit capabilities.
