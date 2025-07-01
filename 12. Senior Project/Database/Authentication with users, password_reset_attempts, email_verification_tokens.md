Sure! Let's break down your **user management tables** step by step so you understand how **password resets**, **email verification**, and **user security tracking** work using these tables.

---

## 🧑‍💻 `users` Table — Main User Information

This is your main user table. Each row represents a user.

### Key Columns:

| Column                               | Purpose                                                                    |
| ------------------------------------ | -------------------------------------------------------------------------- |
| `id`                                 | Unique ID for each user (UUID).                                            |
| `email`, `username`                  | User login or identification fields. Both must be unique.                  |
| `display_name`                       | The name shown on the platform (can be different from username).           |
| `password_hash`                      | Stores the encrypted password (nullable for OAuth users like Google/LINE). |
| `profile_image_url`, `bio`           | Optional profile data.                                                     |
| `role`                               | Either `'user'` or `'admin'`.                                              |
| `status`                             | Tracks account status: `'active'`, `'suspended'`, or `'banned'`.           |
| `coin_balance`, `total_earned_coins` | For your credit system (reading coins, etc.).                              |
| `line_user_id`, `google_id`          | For OAuth login (external ID links).                                       |
| `email_verified`                     | Tracks whether the user's email is verified.                               |
| `password_reset_token`               | Token used for resetting the password.                                     |
| `password_reset_expires`             | Expiry time for the password reset token.                                  |
| `last_password_change`               | Records the last time the user changed their password.                     |
| `last_login_at`                      | Records the last time the user logged in.                                  |
| `created_at`, `updated_at`           | Timestamps for record creation/update.                                     |

✅ **Indexes** help speed up search queries on important fields (email, username, etc.).

---

## 🔐 How Password Reset Works Using `users` Table

### Step-by-Step:

1. **User requests password reset** → Enters their email.
2. **Backend checks if email exists** in the `users` table.
3. **Generates a secure token** (e.g. UUID or random string).
4. **Sets the token and expiration**:

   - `password_reset_token` = `'abc123'`
   - `password_reset_expires` = `NOW() + INTERVAL '30 minutes'`

5. **Sends an email** to the user with the reset link:

   ```
   https://yourapp.com/reset-password?token=abc123
   ```

6. **User clicks the link**, enters a new password.
7. **Backend verifies token**:

   - Token matches `users.password_reset_token`
   - Current time is before `password_reset_expires`

8. If valid:

   - Hash and update the new password in `password_hash`
   - Clear `password_reset_token` and `password_reset_expires`
   - Update `last_password_change`

---

## 👀 `password_reset_attempts` Table — Security Tracking

This table **logs all password reset attempts**, whether successful or not.

### Why?

- Helps detect **suspicious activity** (e.g., brute force).
- Useful for **rate limiting** or **blocking abusive IPs**.

| Column            | Purpose                                   |
| ----------------- | ----------------------------------------- |
| `id`              | Unique UUID for each reset attempt.       |
| `email`           | Email entered by the user.                |
| `ip_address`      | IP of the requester.                      |
| `user_agent`      | Browser/device info.                      |
| `token_generated` | True if a reset token was issued.         |
| `success`         | True if reset was completed successfully. |
| `created_at`      | When the attempt happened.                |

✅ **Use this data for security analytics and fraud prevention.**

---

## 📧 `email_verification_tokens` Table — Email Confirmation System

Used to verify new users' emails or reverify if changed.

### Step-by-Step:

1. **User signs up** (or changes email).
2. System **creates a token** like `'verify_123'`, stores in this table:

   - `token` = `'verify_123'`
   - `user_id` = `users.id`
   - `expires_at` = `NOW() + INTERVAL '1 day'`

3. Sends a link to the user:

   ```
   https://yourapp.com/verify-email?token=verify_123
   ```

4. User clicks the link.
5. **Backend checks**:

   - Token exists and hasn’t expired.
   - `used = false`

6. If valid:

   - Update `users.email_verified = true`
   - Mark token as `used = true`, set `used_at = NOW()`

---

## 🔁 Summary of Interactions

| Feature                | Uses                   | Table(s)                           |
| ---------------------- | ---------------------- | ---------------------------------- |
| **Sign Up / Login**    | Auth fields, roles     | `users`                            |
| **Password Reset**     | Token + expiry         | `users`, `password_reset_attempts` |
| **Email Verification** | Email token system     | `email_verification_tokens`        |
| **OAuth Integration**  | Google/LINE support    | `users`                            |
| **Security Logging**   | Brute-force protection | `password_reset_attempts`          |

---
