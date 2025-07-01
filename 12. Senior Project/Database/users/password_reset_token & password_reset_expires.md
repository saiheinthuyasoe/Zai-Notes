### 🔐 **1. What is a password reset token?**

A **password reset token** is a **temporary, unique code** that allows a user to reset their password **safely** without logging in.

---

### 👤 **2. Who uses the reset token?**

The **user who requested the password reset** uses it — typically by clicking a link sent to their **email**.

---

### ⏰ **3. When does it expire?**

It usually **expires after a short time**, like **15 minutes to 1 hour**, for **security reasons**.

---

### 📍 **4. Where is it stored?**

- On the **backend/server**, usually in a **database** along with the user's email and expiration time.
- Sometimes, it’s also **hashed** before saving to prevent token theft.

---

### ❓ **5. Why do we need a reset token?**

- To **verify** the identity of the person requesting the reset.
- To **prevent unauthorized users** from changing someone else's password.

---

### 🛠️ **6. How does the password reset process work?**

1. **User requests password reset** (enters their email).
2. **Server generates a secure token** and sets an **expiration time**.
3. **Token is saved** in the database (e.g., `password_reset_tokens` table).
4. **Email is sent** to the user with a reset link (e.g., `https://yourapp.com/reset-password?token=abc123`).
5. **User clicks the link** and enters a new password.
6. **Server checks:**

   - If the token exists
   - If it hasn’t expired

7. If valid → **password is updated**, token is deleted.

---
