# WebSocket Connection

**WebSocket connection** is a **full-duplex (bidirectional), persistent** connection between a **client (usually browser)** and a **server**, allowing both to **send and receive data at any time**, **in real-time**.

---

### 🧠 In Simple Terms:

> **WebSocket = Always open pipe** between browser and server
> → You can send **data both ways** without reloading, polling, or reconnecting.

---

### 🔄 Key Features

| Feature               | Description                                 |
| --------------------- | ------------------------------------------- |
| **Protocol**          | `ws://` (or `wss://` for secure)            |
| **Persistent**        | Stays open until closed manually            |
| **Bidirectional**     | ✅ Client ⇄ Server                          |
| **Real-time**         | ✅ Yes (low-latency)                        |
| **Transport**         | Over TCP (not HTTP after handshake)         |
| **Initial Handshake** | Starts as HTTP, then upgrades to WebSocket  |
| **Use Case**          | Chat apps, online games, live collaboration |

---

### 📦 WebSocket Connection Flow

1. **Client (Browser)** initiates an HTTP request to upgrade to WebSocket:

   ```
   GET /chat HTTP/1.1
   Upgrade: websocket
   Connection: Upgrade
   ```

2. **Server** responds and switches the protocol.
3. Now both client and server can send messages **anytime** until connection is closed.

---

### 🧪 JavaScript Example (Browser)

```js
const socket = new WebSocket("ws://localhost:3000");

socket.onopen = () => {
  console.log("Connected!");
  socket.send("Hello from client!");
};

socket.onmessage = (event) => {
  console.log("Server says:", event.data);
};

socket.onclose = () => {
  console.log("Connection closed.");
};
```

---

### 🧠 Why WebSockets?

- Faster and more efficient than HTTP polling
- Reduces overhead: no need for repeated HTTP headers
- Perfect for real-time, interactive apps

---

### ✅ Use Cases

- 💬 **Chat apps**
- 🎮 **Multiplayer games**
- 📊 **Live dashboards**
- 🛠️ **Real-time collaboration tools (like Google Docs)**
- 📈 **Stock tickers and trading platforms**

---
