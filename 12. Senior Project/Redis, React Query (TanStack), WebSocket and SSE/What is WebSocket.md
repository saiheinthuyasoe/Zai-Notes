## 🔹 What is WebSocket?

WebSocket is a **two-way communication channel** between client (browser/app) and server.

- Unlike HTTP (request → response), WebSocket allows the **server to push data to the client** in real time.
- Great for **chat apps, live notifications, stock prices, online games, dashboards**.

---

## 🔹 Example of WebSocket

### Server (Node.js + ws)

```js
const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.send("Welcome!");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});
```

### Client (Browser)

```js
const socket = new WebSocket("ws://localhost:8080");

socket.onopen = () => socket.send("Hello Server!");
socket.onmessage = (event) => console.log("Message:", event.data);
```

👉 Now, the client and server can **send messages anytime**, not just request/response.

---

## 🔹 WebSocket vs React Query vs Redis vs Database

| Feature       | **WebSocket**              | **React Query**                   | **Redis**              | **Database**          |
| ------------- | -------------------------- | --------------------------------- | ---------------------- | --------------------- |
| **Purpose**   | Real-time communication    | Fetch/cache API data in React     | Fast server-side cache | Persistent storage    |
| **Direction** | Two-way (server ↔ client)  | Client → API                      | App ↔ Cache            | App ↔ DB              |
| **Speed**     | Instant push (real-time)   | Depends on API fetch              | Very fast (in-memory)  | Slower (disk)         |
| **Example**   | Chat messages, live scores | `useQuery(['users'], fetchUsers)` | `GET user:101`         | `SELECT * FROM users` |

---

## 🔹 How They Work Together

Imagine a **chat app**:

1. **Database** (Postgres/MySQL/MongoDB): Stores all chat history permanently.
2. **Redis**: Caches the latest messages for fast retrieval.
3. **WebSocket**: Sends new incoming messages to all connected clients instantly.
4. **React Query**: Fetches initial chat history via API and manages cached data in the UI.

---

## 🔹 Simple Analogy

- **Database** = The full library archive 📚 (permanent storage).
- **Redis** = Librarian’s desk 📑 (fast access to hot books).
- **React Query** = Your personal sticky notes 📝 (what you already borrowed/cached in UI).
- **WebSocket** = The librarian calling you 📞 when a new book arrives (real-time updates).

---

👉 Together, they make systems **fast**, **real-time**, and **user-friendly**.
