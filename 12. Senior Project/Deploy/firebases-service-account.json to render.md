# How to add firsebase-service-account.json to Render

```properties
firebase.service-account-key=${FIREBASE_SERVICE_ACCOUNT_KEY:firebase-service-account.json}
```

This means:

- Spring will use the environment variable `FIREBASE_SERVICE_ACCOUNT_KEY` **if it's set**
- If it's **not set**, it will fall back to `firebase-service-account.json` in your local project folder

---

## ✅ To Deploy This Safely to Render:

### 🔐 1. **Do NOT push `firebase-service-account.json` to GitHub**

Add it to `.gitignore`:

```gitignore
firebase-service-account.json
```

---

### 📁 2. **Upload the secret file to Render as a Secret File**

1. Go to your **Render service**
2. Click **“Environment” → “Secret Files”**
3. Click **“Add Secret File”**
4. Upload `firebase-service-account.json`
5. Set the **path** to:

   ```
   /etc/secrets/firebase-service-account.json
   ```

---

### 🌍 3. **Set the environment variable in Render**

Now go to:

1. **Environment → Environment Variables**
2. Add a variable:

   ```bash
   Key: FIREBASE_SERVICE_ACCOUNT_KEY
   Value: /etc/secrets/firebase-service-account.json
   ```

This will override the property in your `application.properties`:

```properties
firebase.service-account-key=${FIREBASE_SERVICE_ACCOUNT_KEY:firebase-service-account.json}
```

So in **local development**, it uses the file in the project folder, and in **Render**, it uses the file you uploaded securely.

---

### 🛠️ 4. **Use in Your Spring Boot App**

```java
@Configuration
public class FirebaseConfig {

    @Value("${firebase.service-account-key}")
    private String serviceAccountPath;

    @PostConstruct
    public void initFirebase() throws IOException {
        FileInputStream serviceAccount = new FileInputStream(serviceAccountPath);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        if (FirebaseApp.getApps().isEmpty()) {
            FirebaseApp.initializeApp(options);
        }
    }
}
```

---
