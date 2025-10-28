### 🔒 **Refresh Token Issue Summary**

- **Problem**: Refresh token only works once **per endpoint**.

- **Scenario**:

  1. After 35s → Go to `/dashboard/my-stories` → Access token is expired → Refresh token works → New access & refresh tokens generated → cookies updated.
  2. After another 35s → Go to `/profile` → Refresh token works again → New tokens generated → cookies updated.
  3. After another 35s → Go **back** to `/dashboard/my-stories` → **Refresh token does NOT work** → No new tokens generated → cookies did not updated.

- **Key Issue**: When revisiting a previously visited endpoint, even after token expiration, the refresh token **fails** to regenerate tokens again.

- **Suspected Cause**:

  - Refresh logic might be **endpoint-state-dependent** or **cached**.
  - Possibly missing token refresh trigger if browser/page assumes it's already valid for that endpoint.

---

Found the issue! The React Query configuration has:

1. **`staleTime: 5 minutes`** - Data is considered fresh for 5 minutes
2. **`retry: 1`** - Only retries failed requests once
3. **`refetchOnWindowFocus: false`** - Doesn't refetch when window regains focus

This means when you navigate back to a page:

- React Query thinks the data is still fresh (within 5 minutes)
- It doesn't make a new API call
- The refresh token logic never gets triggered
- You get stale/cached data instead of fresh data

---

#### **1. Backend JWT Configuration Updated:**

```properties
# Before: 30 seconds access, 1 minute refresh
app.jwt.expiration=30000
app.jwt.refresh-expiration=60000

# After: 1 day access, 7 days refresh
app.jwt.expiration=86400000        # 24 hours in milliseconds
app.jwt.refresh-expiration=604800000 # 7 days in milliseconds
```

#### **2. Frontend React Query Optimized:**

```typescript
// More reasonable caching for longer tokens
staleTime: 5 * 60 * 1000, // 5 minutes (was 0)
gcTime: 10 * 60 * 1000,   // 10 minutes cache
```

#### **3. Auth Query Hook Updated:**

```typescript
// 2 minutes stale time for auth-sensitive queries
staleTime: 2 * 60 * 1000, // 2 minutes (was 0)
```
