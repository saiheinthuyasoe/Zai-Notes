Here’s a detailed guide on how to create a basic server in **Node.js** using the HTTP module. This guide will walk you through the steps for creating a simple server that serves HTML files and handles basic routes.

---

## Step-by-Step Guide: Creating a Server in Node.js

### 1. Create a New Project Directory and File

In **VSCode** or your terminal, follow these steps:

- Create a project directory and navigate into it:

  ```bash
  mkdir my-server
  cd my-server
  ```

- Create a file named `server.js` where your server code will reside:

  ```bash
  touch server.js
  ```

---

### 2. Write the Server Code

In your `server.js` file, add the following code:

```js
const http = require("http"); // Import the HTTP module to create a web server
const fs = require("fs"); // Import the File System module to handle file operations
const port = 3000; // Define the port number where the server will listen

// Create the server object
const server = http.createServer((req, res) => {
  console.log(req.url, req.method); // Log the requested URL and method to the console
  let path = "./views/"; // Set the base path to the views directory
  res.setHeader("Content-Type", "text/html"); // Set the response header to indicate the content type is HTML

  // Route handling based on the requested URL
  switch (req.url) {
    case "/":
      path += "index.html"; // Serve the index.html file for the root URL
      res.statusCode = 200; // Set status code to 200 (OK)
      break;
    case "/about":
      path += "about.html"; // Serve the about.html file for the /about URL
      res.statusCode = 200; // Set status code to 200 (OK)
      break;
    case "/about-me":
      res.setHeader("Location", "/about"); // Redirect from /about-me to /about
      res.statusCode = 301; // Set status code to 301 (Moved Permanently)
      res.end(); // End the response after redirecting
      return; // Avoid further processing for this case
    default:
      path += "404.html"; // Serve the 404.html file for any unrecognized URL
      res.statusCode = 404; // Set status code to 404 (Not Found)
      break;
  }

  // Read the file from the file system and send it as the response
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err); // Log any error that occurs during file reading
      res.statusCode = 500; // Set status code to 500 (Internal Server Error)
      res.end(); // End the response
    } else {
      res.write(data); // Write the file data to the response
      res.end(); // End the response after writing the data
    }
  });
});

// Start the server and listen for requests on the specified port
server.listen(port, "localhost", () => {
  console.log(`Listening for requests on port ${port}`); // Log that the server is listening
});
```

---

### 3. Create the Views Directory and HTML Files

In the project root, create a directory named `views` and add the necessary HTML files.

- **Create the `views/` directory**:

  ```bash
  mkdir views
  ```

- Inside the `views/` folder, create the following HTML files:

#### `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 - Page Not Found</title>
  </head>
  <body>
    <h1>404 - Page Not Found</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
  </body>
</html>
```

---

### 4. Start the Server

Now that the server is set up, you can start it by running the following command in your terminal:

```bash
node server.js
```

You should see the message:

```bash
Listening for requests on port 3000
```

### 5. Test the Server

- Open your browser and go to `http://localhost:3000/`. You should see the content from `index.html`.
- Visit `http://localhost:3000/about` to see the `about.html` page.
- Visit any non-existent route (e.g., `http://localhost:3000/nonexistent`) to see the custom `404.html` page.
- Visit `http://localhost:3000/about-me` to test the redirection to the `/about` page.

---

### Summary

With this setup, you have:

- A basic server created using Node.js and the **HTTP** module.
- The server serves different HTML files depending on the route and redirects certain requests.
- The server also handles 404 errors for undefined routes.
