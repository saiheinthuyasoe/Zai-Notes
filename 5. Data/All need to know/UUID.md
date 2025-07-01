A **UUID (Universally Unique Identifier)** is a 128-bit identifier used to uniquely label information in computer systems. It is designed to be globally unique, meaning the probability of two UUIDs being the same is extremely low, even when generated independently.

### **Key Features of UUID:**
1. **128-bit (16-byte) value** – Typically represented as a 36-character string in hexadecimal format, divided by hyphens (e.g., `123e4567-e89b-12d3-a456-426614174000`).
2. **Standardized** – Defined by **RFC 4122** and used across various systems.
3. **Uniqueness** – Generated using a combination of timestamp, random numbers, and hardware details (depending on the version).
4. **Versions** – Different algorithms (versions 1–8) for generating UUIDs.

### **Common UUID Versions:**
| Version | Method | Use Case |
|---------|--------|----------|
| **v1** | Timestamp + MAC address | Unique but exposes machine details |
| **v4** | Random numbers | Most common, high randomness |
| **v5** | SHA-1 hash of a namespace + name | Deterministic (same input → same UUID) |
| **v7** | Timestamp-based | Sortable (newer standard) |

### **Example UUIDs:**
- **v4 (Random):** `f47ac10b-58cc-4372-a567-0e02b2c3d479`  
- **v1 (Time-based):** `6ba7b810-9dad-11d1-80b4-00c04fd430c8`  
- **v5 (SHA-1):** `a6c7c7b0-5b8a-5e3d-8c0d-8e3b3b3b3b3b`  

### **Where Are UUIDs Used?**
- Database primary keys (instead of auto-increment integers)
- Distributed systems (to avoid ID conflicts)
- Session IDs, file names, API keys
- Blockchain, IoT devices, and more

### **Advantages:**
✅ No central authority needed (unlike sequential IDs)  
✅ Hard to guess (unlike incremental numbers)  
✅ Works across distributed systems  

### **Disadvantages:**
⚠ Larger storage size (16 bytes vs. 4-byte integer)  
⚠ Not human-readable (compared to simple numbers)  

Would you like a code example for generating UUIDs in a specific language (e.g., Python, JavaScript, Java)?