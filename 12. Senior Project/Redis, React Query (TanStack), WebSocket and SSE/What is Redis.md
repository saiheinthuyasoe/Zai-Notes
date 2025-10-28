## 🔹 What are queries in Redis cache?

A **query** is just a request you send to Redis to either **store**, **fetch**, or **modify** data.
Unlike SQL databases (where you use SQL queries), Redis queries are usually **simple commands** because Redis is a **key-value store**.

### ✅ Example Redis Queries

1. **Storing a value (SET command):**

```bash
SET user:101 "Alice"
```

👉 This saves `"Alice"` with the key `user:101`.

2. **Fetching a value (GET command):**

```bash
GET user:101
```

👉 This will return `"Alice"`.

3. **Working with lists (LPUSH & LRANGE):**

```bash
LPUSH messages "Hello"
LPUSH messages "How are you?"
LRANGE messages 0 -1
```

👉 This stores messages in a list and retrieves all of them.

4. **Storing structured data using hash (HSET & HGETALL):**

```bash
HSET user:102 name "Bob" age 25
HGETALL user:102
```

👉 This stores user info as fields and fetches everything.

---

## 🔹 Redis Queries vs Database Queries

| Feature       | Redis Queries                          | Database Queries (e.g., SQL)                       |
| ------------- | -------------------------------------- | -------------------------------------------------- |
| **Language**  | Simple commands (`SET`, `GET`, `HSET`) | SQL (`SELECT`, `INSERT`, `UPDATE`)                 |
| **Speed**     | Very fast (in-memory, near real-time)  | Slower (disk-based, optimized for complex queries) |
| **Data Type** | Key-value, hashes, lists, sets         | Tables, rows, columns                              |
| **Use Case**  | Caching, sessions, quick lookups       | Long-term storage, complex filtering, reporting    |
| **Example**   | `GET user:101`                         | `SELECT name FROM users WHERE id=101;`             |

---

## 🔹 Simple Analogy

- **Redis queries** are like asking:
  🗂️ “What’s in drawer #101?” → Quick answer.

- **Database queries** are like asking:
  📊 “Give me all customers from New York, age > 25, sorted by last order date.” → More complex, slower.

---

👉 So, Redis queries = **fast, simple lookups** (good for cache).
👉 Database queries = **complex data retrieval** (good for permanent storage).
