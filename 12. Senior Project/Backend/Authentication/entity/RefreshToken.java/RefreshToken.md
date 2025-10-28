## What is a Refresh Token?

A **refresh token** is a special type of token used in authentication systems to obtain new access tokens without requiring the user to log in again. Here's how it works:

### Purpose and Flow:
1. **Access Token**: Short-lived (usually 15-60 minutes) - used for API requests
2. **Refresh Token**: Long-lived (days/weeks) - used to get new access tokens
3. When an access token expires, the client uses the refresh token to get a new access token
4. This provides better security while maintaining user convenience

### Security Benefits:
- **Reduced exposure**: Access tokens are short-lived
- **Automatic renewal**: Users don't need to re-authenticate frequently
- **Revocation capability**: Refresh tokens can be invalidated to force re-login
- **Session management**: Better control over active sessions

## Detailed Analysis of RefreshToken.java

Let me break down this JPA entity class:

Read file: nomanweb_backend/src/main/java/com/app/nomanweb_backend/entity/RefreshToken.java
### Class Structure Analysis:

#### **1. Annotations & Framework Setup:**
```java
@Entity
@Table(name = "refresh_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
```
- **`@Entity`**: JPA entity for database persistence
- **`@Table`**: Maps to `refresh_tokens` table
- **Lombok annotations**: Reduces boilerplate code
  - `@Data`: Generates getters, setters, toString, equals, hashCode
  - `@Builder`: Provides builder pattern
  - `@NoArgsConstructor` & `@AllArgsConstructor`: Constructor generation

#### **2. Core Fields:**

**Primary Key:**
```java
@Id
@GeneratedValue(strategy = GenerationType.UUID)
private UUID id;
```
- Uses UUID for primary key (better for distributed systems)

**Token Value:**
```java
@Column(nullable = false, unique = true)
private String token;
``` 
- The actual refresh token string
- Must be unique across all tokens

**User Relationship:**
```java
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;
```
- Links to the User entity
- `LAZY` loading for performance
- Many refresh tokens can belong to one user

**Timestamps:**
```java
@Column(nullable = false)
private LocalDateTime expiresAt;

@Column(nullable = false)
private LocalDateTime createdAt;
```
- `expiresAt`: When the token becomes invalid
- `createdAt`: When the token was generated

#### **3. Security & Audit Fields:**

**Revocation Tracking:**
```java
@Column(nullable = false)
private boolean revoked = false;

@Column(name = "revoked_at")
private LocalDateTime revokedAt;

@Column(name = "revoked_by_ip")
private String revokedByIp;

@Column(name = "revoked_by_user_agent")
private String revokedByUserAgent;
```
- `revoked`: Whether token was manually invalidated
- `revokedAt`: When revocation occurred
- `revokedByIp` & `revokedByUserAgent`: Audit trail for security

#### **4. Lifecycle Methods:**

**Automatic Creation Timestamp:**
```java
@PrePersist
protected void onCreate() {
    createdAt = LocalDateTime.now();
}
```
- Automatically sets creation time when entity is persisted

**Validation Methods:**
```java
public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
}

public boolean isValid() {
    return !revoked && !isExpired();
}
```
- `isExpired()`: Checks if token has passed its expiration time
- `isValid()`: Comprehensive validity check (not revoked AND not expired)

**Revocation Method:**
```java
public void revoke(String ip, String userAgent) {
    this.revoked = true;
    this.revokedAt = LocalDateTime.now();
    this.revokedByIp = ip;
    this.revokedByUserAgent = userAgent;
}
```
- Marks token as revoked with audit information
- Useful for security incidents or user logout

### **Database Schema:**
This entity creates a table with these columns:
- `id` (UUID, Primary Key)
- `token` (String, Unique)
- `user_id` (Foreign Key to users table)
- `expires_at` (DateTime)
- `created_at` (DateTime)
- `revoked` (Boolean)
- `revoked_at` (DateTime, nullable)
- `revoked_by_ip` (String, nullable)
- `revoked_by_user_agent` (String, nullable)

### **Security Features:**
1. **Expiration**: Automatic invalidation after time limit
2. **Revocation**: Manual invalidation capability
3. **Audit Trail**: Tracks who/what revoked tokens
4. **Unique Tokens**: Prevents token reuse
5. **User Association**: Links tokens to specific users

This implementation provides a robust foundation for secure token-based authentication with proper lifecycle management and security auditing capabilities.