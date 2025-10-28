# Unidirectional vs Bidirectional (SSE vs WebSocket)

**clear comparison between SSE (Server-Sent Events)** and **WebSockets**, focusing on **unidirectional vs bidirectional** communication:

---

### 🔁 Direction of Communication

| Feature         | **SSE (Server-Sent Events)**              | **WebSockets**                         |
| --------------- | ----------------------------------------- | -------------------------------------- |
| Communication   | **Unidirectional**<br>(Server → Client)   | **Bidirectional**<br>(Server ⇄ Client) |
| Client → Server | ❌ Not supported (except initial request) | ✅ Fully supported                     |
| Server → Client | ✅ Yes                                    | ✅ Yes                                 |

---

### 🧠 Concept Summary

- **SSE:**

  - Think of it like **radio** – the **server is the DJ**, pushing messages out, and the **client just listens**.
  - Great for **live feeds**, **notifications**, etc.

- **WebSocket:**

  - Like a **phone call** – both **server and client** can **speak and listen** at any time.
  - Ideal for **chats**, **real-time games**, **collaboration tools**, etc.

---

### ⚙️ Technical Comparison

| Feature                 | **SSE**                           | **WebSocket**                          |
| ----------------------- | --------------------------------- | -------------------------------------- |
| Protocol                | HTTP (EventStream)                | Custom over TCP (ws\:// / wss\://)     |
| Browser Support         | Good (no IE/Edge Legacy)          | Very Good (even IE11+)                 |
| Built-in Reconnect      | ✅ Yes                            | ❌ Must handle manually                |
| Keep-alive/Heartbeat    | ✅ Yes (automatic)                | ❌ Must implement manually             |
| Supports Custom Headers | ❌ No (on initial request only)   | ✅ Yes                                 |
| Load Balancer Friendly  | ✅ Yes                            | ⚠️ Sometimes problematic               |
| Best Use Case           | Push-only: Notifications, Updates | Real-time apps: Chat, Multiplayer, etc |

---

### 🧪 Example Use Cases

| Use Case                      | SSE | WebSocket |
| ----------------------------- | --- | --------- |
| Live news feed / stock prices | ✅  | ✅        |
| Chat app                      | ❌  | ✅        |
| Notification system           | ✅  | ✅        |
| Multiplayer game              | ❌  | ✅        |
| Live sports scoreboard        | ✅  | ✅        |

---

### 🧭 TL;DR

| If you need...                     | Use           |
| ---------------------------------- | ------------- |
| Only server → client communication | **SSE**       |
| Two-way communication (real-time)  | **WebSocket** |

---
