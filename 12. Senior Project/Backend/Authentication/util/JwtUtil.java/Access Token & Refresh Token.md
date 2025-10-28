# Token Management Notes

### 1. **Access Token**

- Short-lived token (e.g., 30 sec, 15 min).
- Used to authorize every API request while user is active (active --> refreshing page or normal API calls or route to pages).
- Stored in memory, cookie, or localStorage.
- When expired → API calls fail with `401 Unauthorized`.

### 2. **Refresh Token**

- Long-lived token (e.g., 1 min, 7 days).
- Used **only when** access token expires.
- Sent to backend to get new access token (and often new refresh token).
- Stored securely (httpOnly cookie recommended).
- Rotation: each time a refresh token is used, backend issues a **new refresh token** with a fresh expiration, invalidating the old one.
- Expires if user is **inactive** past its expiration time or revoked.

### 3. **Token Expiration and Rotation Flow**

- User logs in → receives access_token + refresh_token.
- Access token expires (short life).
- Client uses refresh token to get new access token + new refresh token → expiry time resets every time refresh token is used.
- This cycle repeats **as long as the user remains active**.
- If the user becomes inactive(close browser or log out or close website) and refresh token expires, user must log in again.
- Optional: Maximum session duration can be enforced to limit total login time.

### 4. **Summary of Behavior**

| Situation                               | Action Taken                                                      |
| --------------------------------------- | ----------------------------------------------------------------- |
| Access token expired                    | Use refresh token to get new tokens                               |
| Refresh token expired                   | User must log in again                                            |
| Refresh token rotated                   | New refresh token issued with reset expiry; old token invalidated |
| User inactive past refresh token expiry | Session ends, login required                                      |
| User actively refreshing                | Session can last indefinitely (if max session limit not enforced) |

---

```sql
User Logs In
   │
   ▼
Server issues:
  - access_token (short life, e.g. 30 sec)
  - refresh_token (longer life, e.g. 1 min)
   │
   ▼
User interacts with website
   │
   ▼
Client sends access_token with API requests
   │
   ▼
ACCESS TOKEN EXPIRES (after 30 sec)
   │
   ▼
Client detects expired access_token (e.g., receives 401 Unauthorized)
   │
   ▼
Client sends refresh_token to /auth/refresh endpoint
   │
   ▼
Server checks refresh_token
   ├─ If valid and not expired:
   │    - Issues NEW access_token (resets short life)
   │    - Issues NEW refresh_token (resets longer life)
   │    - Invalidates old refresh_token (rotation)
   │
   └─ If invalid or expired:
        - Responds with 401 Unauthorized
        - User must log in again
   │
   ▼
Client stores new tokens and retries original request
   │
   ▼
User continues interacting, cycle repeats
   │
   ▼
IF USER STOPS ACTIVITY (no refresh token sent)
   │
   ▼
REFRESH TOKEN EXPIRES (after 1 min of inactivity)
   │
   ▼
User must log in again (session expired)
```

---

### Extra details:

- **Access token** is for frequent use, short expiry to limit risk if stolen.
- **Refresh token** is for longer-term use, only sent when needed.
- **Rotation** means every time you use refresh token, you get a new one and old one stops working.
- This helps protect against stolen refresh tokens being reused.
- **Session can continue indefinitely** if user stays active and refreshes tokens before expiry.
- You can add a **maximum session limit** (e.g., 30 minutes or days) to force login after a certain time regardless.

---
