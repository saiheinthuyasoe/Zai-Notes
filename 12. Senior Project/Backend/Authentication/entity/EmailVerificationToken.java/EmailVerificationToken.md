## What is EmailVerificationToken?

An **EmailVerificationToken** is a security mechanism used to verify that a user actually owns the email address they provided during registration. It's a temporary, time-limited token that ensures email ownership before activating a user account.

### Purpose and Security Flow:

1. **User registers** → Account created but not verified
2. **System generates token** → Sends verification email
3. **User clicks link** → Token validates email ownership
4. **Account activated** → User can now access full features
5. **Token invalidated** → After use or expiration

This prevents fake accounts and ensures all users have valid, accessible email addresses.

## Detailed Analysis of EmailVerificationToken.java

### **1. Class Structure & Annotations:**

```java
@Entity
@Table(name = "email_verification_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
```

**Similar to EmailChangeToken:**

- Uses Spring Data JPA auditing (`@EntityListeners`)
- Maps to `email_verification_tokens` table
- Lombok annotations for boilerplate reduction

### **2. Core Fields Analysis:**

**Primary Key:**

```java
@Id
@GeneratedValue(strategy = GenerationType.UUID)
private UUID id;
```

- Consistent UUID strategy across all token entities

**User Relationship:**

```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;
```

- Links to the User entity
- Many verification tokens can belong to one user (if they request multiple verifications)

**Token Value:**

```java
@Column(nullable = false, unique = true)
private String token;
```

- The verification token (unique across all tokens)
- Used in the verification link sent to user's email

**Expiration:**

```java
@Column(name = "expires_at", nullable = false)
private LocalDateTime expiresAt;
```

- When the token becomes invalid
- Typically short lifespan (24-72 hours)

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

### **4. Business Logic Methods:**

**Expiration Check:**

```java
public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
}
```

- Checks if current time is after expiration time

**Validity Check:**

```java
public boolean isValid() {
    return !used && !isExpired();
}
```

- Token is valid if: not used AND not expired
- Simple, clear validation logic

### **5. Database Schema:**

This creates a table with columns:

- `id` (UUID, Primary Key)
- `user_id` (Foreign Key to users table)
- `token` (String, Unique)
- `expires_at` (DateTime)
- `used` (Boolean, default false)
- `created_at` (DateTime, auto-generated)
- `used_at` (DateTime, nullable)

### **6. Comparison with Other Token Entities:**

| Feature             | RefreshToken      | EmailChangeToken    | EmailVerificationToken |
| ------------------- | ----------------- | ------------------- | ---------------------- |
| **Purpose**         | Auth renewal      | Email change        | Email verification     |
| **Lifespan**        | Long (days/weeks) | Short (hours)       | Short (hours)          |
| **Usage**           | Multiple uses     | Single use          | Single use             |
| **Additional Data** | None              | New email           | None                   |
| **Revocation**      | Manual with audit | Automatic after use | Automatic after use    |
| **User State**      | Active user       | Active user         | Unverified user        |

### **7. Security Features:**

1. **Single Use**: Tokens become invalid after first use
2. **Time Limitation**: Automatic expiration prevents indefinite validity
3. **Unique Tokens**: Prevents token reuse attacks
4. **Email Verification**: Ensures user owns the provided email
5. **Audit Trail**: Tracks when tokens are created and used

### **8. Typical Usage Flow:**

```java
// 1. User registers
User user = User.builder()
    .email("user@example.com")
    .verified(false)  // Account starts unverified
    .build();

// 2. Create verification token
EmailVerificationToken token = EmailVerificationToken.builder()
    .user(user)
    .token(generateUniqueToken())
    .expiresAt(LocalDateTime.now().plusHours(24))
    .build();

// 3. Send verification email with token

// 4. User clicks link, token is validated
if (token.isValid()) {
    // Activate user account
    user.setVerified(true);
    token.setUsed(true);
    token.setUsedAt(LocalDateTime.now());
    // Save both entities
}
```

### **9. Security Benefits:**

- **Prevents fake accounts**: Only users with real emails can verify
- **Email ownership verification**: User must access email to verify
- **Time-limited**: Reduces window of opportunity for attacks
- **Single-use**: Prevents replay attacks
- **Audit trail**: Tracks all verification attempts

### **10. Key Differences from EmailChangeToken:**

**EmailVerificationToken:**

- Used for **new account verification**
- No additional data stored (just verifies existing email)
- User account starts **unverified**
- Purpose: **Activate account**

**EmailChangeToken:**

- Used for **existing account email changes**
- Stores **new email address**
- User account is **already active**
- Purpose: **Change email**

### **11. Common Use Cases:**

1. **New User Registration**: Verify email before account activation
2. **Email Re-verification**: If user changes email or needs re-verification
3. **Account Recovery**: Verify email for password reset or account recovery
4. **Compliance**: Meet regulatory requirements for email verification

This implementation provides a secure foundation for email verification workflows, ensuring that only users with legitimate email addresses can activate their accounts while maintaining proper security controls and audit capabilities.
