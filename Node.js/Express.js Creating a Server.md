# Express.js Server Setup with Nodemon

This guide demonstrates how to set up a simple Express.js server, serve static HTML files, handle redirects, and return a custom 404 page. The server is managed with **Nodemon** for easier development.

## Steps to Set Up the Server

### 1. Create a Project Directory

Start by creating a new directory for your Express.js project:

```bash
mkdir my-express-app
cd my-express-app
```

### 2. Create the `index.js` or `app.js` File

Create the main server file where your Express.js code will live. You can name it `index.js` or `app.js`.

```bash
touch index.js
```

### 3. Initialize NPM

Initialize the project with NPM. This will create a `package.json` file to manage your project dependencies.

```bash
npm init -y
```

### 4. Install Express.js

Next, install **Express.js**, which is a lightweight Node.js framework for building web applications.

```bash
npm install express
```

### 5. Write the Server Application

In the `index.js` (or `app.js`) file, write the following code to create a basic server:

```js
// Import express
const express = require('express');

// Create an express app
const app = express();

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Serve index.html on the root path
app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname });
});

// Serve about.html on the /about path
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname });
});

// Redirect /about-me to /about
app.get('/about-me', (req, res) => {
    res.redirect('/about');
});

// Handle 404 errors and serve a custom 404.html page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
});
```

### 6. Create HTML Files

In your project directory, create a `views/` folder where you will place your HTML files:

```bash
mkdir views
```

Then, inside the `views/` folder, create the following files:

#### `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
</head>
<body>
    <h1>Welcome to the Home Page</h1>
    <p>This is the main page of the site.</p>
</body>
</html>
```

#### `about.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About</title>
</head>
<body>
    <h1>About Us</h1>
    <p>This is the about page.</p>
</body>
</html>
```

#### `404.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found</title>
</head>
<body>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
</body>
</html>
```

### 7. Start the Server

To automatically restart the server when file changes are detected, install **Nodemon**:

```bash
npm install --save-dev nodemon
```

Now, you can start your server with the following command:

```bash
npx nodemon index.js
```

The server will run on `http://localhost:3000/`. You can test the following routes:

- `/` - Displays the `index.html` page.
- `/about` - Displays the `about.html` page.
- `/about-me` - Redirects to `/about`.
- Any other route will display the custom `404.html` page.

### 8. Optional: Add Nodemon to `package.json` Scripts

To make it easier to run the server, you can add a script to your `package.json` file so you don't have to type `npx nodemon` every time.

In `package.json`, modify the `scripts` section:

```json
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

Now, you can run the server in development mode using:

```bash
npm run dev
```

### Project Structure

Your final project structure should look like this:

```
my-express-app/
├── index.js
├── package.json
├── views/
│   ├── index.html
│   ├── about.html
│   └── 404.html
└── node_modules/
```

## Key Features

- **Static HTML Files**: Serve static HTML files for different routes.
- **Redirects**: Automatically redirect from `/about-me` to `/about`.
- **Custom 404 Page**: Serve a custom 404 page for unhandled routes.

## Tools Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **Nodemon**: Tool to automatically restart the server when file changes are detected.

## License

This project is licensed under the MIT License.
```

This `README.md` file includes everything from setting up the server to running it with **Nodemon**, along with the project structure, example HTML files, and instructions for managing your project scripts.

Let me know if you need further improvements or additional details!