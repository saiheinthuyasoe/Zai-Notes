Here is the complete step-by-step guide, including connecting MongoDB Atlas with Mongoose and performing operations such as adding, retrieving, and fetching single users.

---

# Step-by-Step Guide: Set Up MongoDB Atlas with Mongoose

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Once logged in, click on **Create a New Project** and name your project (e.g., "AU Connect Project").
3. After creating the project, click on **Build a Cluster**.

---

## Step 2: Create a Cluster

1. **Choose the Free Tier**:
   - For development purposes, choose the free tier (shared cluster).
   - Select your preferred cloud provider (AWS, Google Cloud, Azure). For the free tier, **AWS** is commonly used.
   - Choose a region that’s geographically close to you for lower latency.
2. Click **Create Cluster**.
   - It might take a few minutes to create the cluster.

---

## Step 3: Create a Database User

1. Once your cluster is ready, click on the **Database Access** tab in the left-hand menu.
2. Click on **Add New Database User**.
3. Create a new user with a username and password.
   - Example:
     - **Username**: `auconnectadmin`
     - **Password**: `password123` (Use a strong password!)
   - Save this username and password, as you'll need them for your connection string.
4. Set the user’s permissions to **Atlas Admin** for now, so they can manage the whole cluster.

---

## Step 4: Whitelist Your IP Address

1. Click on the **Network Access** tab on the left menu.
2. Click **Add IP Address**.
3. You can either:
   - Add your current IP address by selecting **Add Current IP Address**.
   - Allow access from anywhere by using `0.0.0.0/0` (fine for development, not recommended for production).
4. Click **Confirm**.

---

## Step 5: Get the Connection String

1. Go back to the **Clusters** tab in your MongoDB Atlas dashboard.
2. Click on **Connect** next to your cluster name.
3. In the Connection Wizard:

   - Choose **Connect your application**.
   - Copy the connection string provided by MongoDB, which looks something like this:

   ```text
   mongodb+srv://<username>:<password>@cluster0.mongodb.net/au-connect?retryWrites=true&w=majority
   ```

4. Replace `<username>` and `<password>` in the connection string with the user credentials you created earlier:

   - For example:

   ```text
   mongodb+srv://auconnectadmin:password123@cluster0.mongodb.net/au-connect?retryWrites=true&w=majority
   ```

---

## Step 6: Connect to Mongoose

1. Install Mongoose in your project:

   ```bash
   npm install mongoose
   ```

2. In your server file (e.g., `index.js` or `app.js`), connect to MongoDB using Mongoose:

   ```js
   const mongoose = require("mongoose");

   const dbURI =
     "mongodb+srv://auconnectadmin:password123@cluster0.mongodb.net/au-connect?retryWrites=true&w=majority";

   mongoose
     .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
     .then((result) =>
       app.listen(3000, () => console.log("Server is running on port 3000"))
     )
     .catch((err) => console.log(err));
   ```

   - This will establish a connection to your MongoDB cluster and start your server on port 3000.

---

## Step 7: Create Mongoose Models

1. **Create a `models/` folder**:

   ```bash
   mkdir models
   ```

2. Inside the `models/` folder, create a file for each model. For example, create `user.js`:

   ```bash
   touch models/user.js
   ```

3. Define the user schema in `user.js`:

   ```js
   const mongoose = require("mongoose");
   const Schema = mongoose.Schema;

   const userSchema = new Schema(
     {
       username: {
         type: String,
         required: true,
       },
       email: {
         type: String,
         required: true,
         unique: true,
       },
       password: {
         type: String,
         required: true,
       },
     },
     { timestamps: true }
   );

   const User = mongoose.model("User", userSchema);

   module.exports = User;
   ```

   - This defines a `User` model with `username`, `email`, and `password` fields.

---

## Step 8: Add Data to the Database

### 1. Add a new user to the database:

```js
app.get("/user-add", (req, res) => {
  const User = require("./models/user"); // Import the User model

  // Create a new user instance
  const user = new User({
    username: "zai12",
    email: "zai12@gmail.com",
    password: "123",
  });

  // Save the user to the database
  user
    .save()
    .then((result) => res.send(result)) // Send saved user data as response
    .catch((err) => console.log(err)); // Handle errors
});
```

- When you visit `http://localhost:3000/user-add`, a new user will be added to the MongoDB database.

---

## Step 9: Get All Users from the Database

```js
app.get("/all-users", (req, res) => {
  const User = require("./models/user"); // Import the User model

  // Find all users in the database
  User.find()
    .then((result) => res.send(result)) // Send the list of users as response
    .catch((err) => console.log(err)); // Handle errors
});
```

- This route fetches all users in the `users` collection and sends them as a response when you visit `http://localhost:3000/all-users`.

---

## Step 10: Get a Single User by ID

```js
app.get("/single-user", (req, res) => {
  const User = require("./models/user"); // Import the User model

  // Find a user by their unique ObjectId
  User.findById("66dbc4239b394e4b4ffd04c6")
    .then((result) => res.send(result)) // Send the user as response
    .catch((err) => console.log(err)); // Handle errors
});
```

- Replace `'66dbc4239b394e4b4ffd04c6'` with an actual user ID from your MongoDB database to fetch that specific user when you visit `http://localhost:3000/single-user`.

---

## Summary

With this guide, you have:

1. Set up a **MongoDB Atlas cluster**.
2. Created a **Mongoose connection**.
3. Defined a **User model**.
4. Added **data to MongoDB**.
5. Retrieved **all users** and **single users** from MongoDB.
