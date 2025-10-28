# SSE Connection

**SSE** stands for **Server-Sent Events**, a **unidirectional** communication method where the **server pushes real-time updates** to the client (browser) over **HTTP**.

---

### 🔧 How it works:

1. **Client (Browser)** sends an HTTP request to the server to start the connection.
2. **Server** keeps the HTTP connection open and sends updates whenever needed.
3. The **client receives automatic updates** via events, no need to poll repeatedly.

---

### 📦 Example (JavaScript Client)

```js
const eventSource = new EventSource("/sse-endpoint");

eventSource.onmessage = function (event) {
  console.log("New message:", event.data);
};
```

---

### 🧠 Key Features:

| Feature     | Details                                   |
| ----------- | ----------------------------------------- |
| Protocol    | Uses regular **HTTP**                     |
| Direction   | **Server ➜ Client** only (unidirectional) |
| Persistent? | Yes, long-lived HTTP connection           |
| Reconnects? | Yes, built-in automatic reconnects        |
| Format      | `text/event-stream` MIME type             |

---

### ✅ When to Use SSE:

- Real-time **notifications**
- **Live scoreboards**, **logs**
- **Stock price updates**
- Lightweight real-time updates

---

### ❌ When _Not_ to Use SSE:

- If you need **bidirectional** communication → use **WebSockets**
- For **non-browser** environments with limited support

---

### 🧪 Browser Support:

Most modern browsers support SSE — but **not IE or Edge (Legacy)**.

---
