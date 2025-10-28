## What is AuthService?

The **AuthService** is a comprehensive service class that handles all authentication and user management operations in the application. It's the central hub for user registration, login, email verification, password management, and account security features.

## Detailed Analysis of AuthService.java

### **1. Class Structure & Dependencies:**

```java
@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AuthService {
```

**Key Annotations:**

- **`@Service`**: Spring service component
- **`@RequiredArgsConstructor`**: Lombok generates constructor for final fields
- **`@Slf4j`**: Lombok logging annotation
- **`@Transactional`**: All methods run in database transactions

**Dependencies:**

```java
private final UserRepository userRepository;
private final EmailVerificationTokenRepository emailVerificationTokenRepository;
private final EmailChangeTokenRepository emailChangeTokenRepository;
private final PasswordEncoder passwordEncoder;
private final JwtUtil jwtUtil;
private final EmailService emailService;
private final RefreshTokenService refreshTokenService;
```

### **2. Configuration Properties:**

```java
@Value("${app.email.verification.expiry:48}")
private int emailVerificationExpiryHours;

@Value("${app.email.change.expiry:24}")
private int emailChangeExpiryHours;
```

- Configurable token expiration times
- Default values: 48 hours for verification, 24 hours for email change

### **3. Core Authentication Methods:**

#### **Login Method:**

```java
public LoginResponse login(LoginRequest request) {
    // 1. Find user by email or username
    User user = userRepository.findByEmailOrUsername(request.getEmail(), request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

    // 2. Verify password
    if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
        throw new RuntimeException("Invalid credentials");
    }

    // 3. Check account status
    if (!user.isActive()) {
        throw new RuntimeException("Account is not active");
    }

    // 4. Check email verification (skip for OAuth users)
    if (!user.getEmailVerified() && !user.canUseOAuthEndpoints()) {
        throw new RuntimeException("Please verify your email address before logging in.");
    }

    // 5. Update last login and generate tokens
    user.setLastLoginAt(LocalDateTime.now());
    userRepository.save(user);

    String accessToken = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());
    RefreshToken refreshToken = refreshTokenService.createRefreshTokenForLogin(user);

    return LoginResponse.builder()
            .user(user)
            .token(accessToken)
            .refreshToken(refreshToken.getToken())
            .build();
}
```

**Security Features:**

- Password hashing verification
- Account status validation
- Email verification requirement
- OAuth user exception handling
- Last login tracking
- JWT + Refresh token generation

#### **Registration Method:**

```java
public LoginResponse register(RegisterRequest request) {
    // 1. Check for existing email/username
    if (userRepository.existsByEmail(request.getEmail())) {
        throw new RuntimeException("Email already exists");
    }
    if (userRepository.existsByUsername(request.getUsername())) {
        throw new RuntimeException("Username already exists");
    }

    // 2. Create new user
    User user = User.builder()
            .email(request.getEmail())
            .username(request.getUsername())
            .displayName(request.getDisplayName())
            .passwordHash(passwordEncoder.encode(request.getPassword()))
            .role(User.Role.USER)
            .status(User.Status.ACTIVE)
            .emailVerified(false)
            .build();

    user = userRepository.save(user);

    // 3. Generate and send verification email
    String verificationToken = generateEmailVerificationToken(user);
    emailService.sendVerificationEmail(user, verificationToken);

    // 4. Return response without tokens (until email verified)
    return LoginResponse.builder()
            .user(user)
            .token(null)
            .refreshToken(null)
            .build();
}
```

**Key Features:**

- Duplicate email/username prevention
- Password hashing
- Email verification requirement
- No immediate login (security-first approach)

### **4. Email Verification System:**

#### **Email Verification:**

```java
public void verifyEmail(String token) {
    EmailVerificationToken verificationToken = emailVerificationTokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Invalid verification token"));

    if (!verificationToken.isValid()) {
        throw new RuntimeException("Verification token has expired or already been used");
    }

    User user = verificationToken.getUser();
    user.setEmailVerified(true);
    userRepository.save(user);

    // Mark token as used
    verificationToken.setUsed(true);
    verificationToken.setUsedAt(LocalDateTime.now());
    emailVerificationTokenRepository.save(verificationToken);

    // Send welcome email
    emailService.sendWelcomeEmail(user);
}
```

#### **Resend Verification:**

```java
public void resendVerificationEmail(String email) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    if (user.getEmailVerified()) {
        throw new RuntimeException("Email is already verified");
    }

    // Delete existing tokens and create new one
    emailVerificationTokenRepository.deleteAllByUser(user);
    String verificationToken = generateEmailVerificationToken(user);
    emailService.sendVerificationEmail(user, verificationToken);
}
```

### **5. Password Management:**

#### **Password Change:**

```java
public void changePassword(UUID userId, String currentPassword, String newPassword) {
    User user = getCurrentUser(userId);

    if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
        throw new RuntimeException("Current password is incorrect");
    }

    user.setPasswordHash(passwordEncoder.encode(newPassword));
    user.setLastPasswordChange(LocalDateTime.now());
    userRepository.save(user);

    emailService.sendPasswordChangeNotification(user);
}
```

#### **Forgot Password:**

```java
public void forgotPassword(String email, String ipAddress, String userAgent) {
    try {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        String resetToken = UUID.randomUUID().toString();
        user.setPasswordResetToken(resetToken);
        user.setPasswordResetExpires(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user, resetToken);
    } catch (RuntimeException e) {
        // Security: Don't reveal if email exists
        log.warn("Password reset attempt failed for email: {} from IP: {} - {}", email, ipAddress, e.getMessage());
        throw e;
    }
}
```

**Security Features:**

- IP address logging
- Current password verification
- Time-limited reset tokens
- Email enumeration protection

### **6. Token Management:**

#### **Refresh Token:**

```java
public LoginResponse refreshToken(String refreshTokenValue, String clientIp, String userAgent) {
    RefreshToken newRefreshToken = refreshTokenService.rotateRefreshToken(refreshTokenValue, clientIp, userAgent);

    if (newRefreshToken == null) {
        throw new RuntimeException("Invalid or expired refresh token");
    }

    User user = newRefreshToken.getUser();
    String newAccessToken = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole().name());

    return LoginResponse.builder()
            .user(user)
            .token(newAccessToken)
            .refreshToken(newRefreshToken.getToken())
            .build();
}
```

#### **Logout:**

```java
public void logout(String refreshTokenValue, String clientIp, String userAgent) {
    try {
        refreshTokenService.revokeRefreshToken(refreshTokenValue, clientIp, userAgent);
        log.info("User logged out successfully");
    } catch (Exception e) {
        log.warn("Error during logout: {}", e.getMessage());
    }
}
```

### **7. Email Change System:**

#### **Regular Email Change:**

```java
public void changeEmail(UUID userId, String currentPassword, String newEmail, String ipAddress, String userAgent) {
    User user = getCurrentUser(userId);

    // Verify current password
    if (!passwordEncoder.matches(currentPassword, user.getPasswordHash())) {
        throw new RuntimeException("Current password is incorrect");
    }

    // Validate new email
    if (newEmail.equalsIgnoreCase(user.getEmail())) {
        throw new RuntimeException("New email must be different from current email");
    }
    if (userRepository.existsByEmail(newEmail)) {
        throw new RuntimeException("Email address is already in use");
    }

    // Generate and send verification
    emailChangeTokenRepository.deleteAllByUser(user);
    String changeToken = generateEmailChangeToken(user, newEmail);
    emailService.sendEmailChangeVerificationEmail(user, newEmail, changeToken);
}
```

#### **OAuth Email Change:**

```java
public void changeEmailOAuth(UUID userId, String newEmail, String ipAddress, String userAgent) {
    User user = getCurrentUser(userId);

    // Verify OAuth user (no password hash)
    if (user.getPasswordHash() != null) {
        throw new RuntimeException("This endpoint is only for OAuth users.");
    }

    // Same validation as regular email change
    // ...
}
```

### **8. Username Management:**

Similar pattern for username changes with both regular and OAuth variants.

### **9. Security Features Summary:**

1. **Password Security:**

   - Bcrypt hashing
   - Current password verification
   - Password change notifications

2. **Email Security:**

   - Verification required for login
   - Change verification process
   - OAuth user handling

3. **Token Security:**

   - JWT + Refresh token system
   - Token rotation
   - Revocation capability
   - IP/user agent tracking

4. **Account Security:**

   - Duplicate prevention
   - Status validation
   - Audit logging
   - Email enumeration protection

5. **OAuth Integration:**
   - Separate endpoints for OAuth users
   - Password hash validation
   - Flexible verification requirements

### **10. Error Handling:**

- **Consistent error messages**: Generic "Invalid credentials" for security
- **Proper exception handling**: Logging with context
- **Transaction management**: Automatic rollback on errors
- **Security-first approach**: Don't reveal sensitive information

### **11. Audit & Logging:**

- **Comprehensive logging**: All operations logged with context
- **IP tracking**: Security incident investigation
- **User agent tracking**: Device/browser information
- **Timestamps**: All changes tracked

This `AuthService` provides a robust, security-focused authentication system with comprehensive user management capabilities, proper separation of concerns, and extensive audit trails.
