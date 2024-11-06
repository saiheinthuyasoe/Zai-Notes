Here’s a comprehensive overview and breakdown of **Node.js Basics** based on the topics you provided. This guide covers key features of Node.js, including the global object, modules, file system interactions, and streams.

---

## Node.js Basics to Know

### 1. **Print to Console**
In Node.js, you can easily print to the console using `console.log()`.

```js
const name = 'Zai';
console.log(`Hello ${name}`);
```

---

### 2. **Global Object**
Unlike the browser where `window` is the global object, Node.js uses its own global object.

- **Examples in Node.js**:

  1. **Global Timers**:
     - `setTimeout()` – Runs a function once after a specified delay (in milliseconds).
     - `setInterval()` – Repeatedly calls a function at specified intervals.

     ```js
     setTimeout(() => {
         console.log('Hi after 3 seconds');
     }, 3000);

     setInterval(() => {
         console.log('Repeating Hello every 3 seconds');
     }, 3000);

     // To clear intervals, you use clearInterval().
     const intervalId = setInterval(() => console.log('Running'), 1000);
     clearInterval(intervalId); // Stops the interval
     ```

  2. **Global Directory and Filename**:
     - `__dirname` – The directory name of the current module.
     - `__filename` – The full path to the current file.

     ```js
     console.log(__dirname); // Outputs the directory path
     console.log(__filename); // Outputs the full file path
     ```

---

### 3. **Modules & Require**

Node.js uses **CommonJS** module system to export and import values between files.

- **Exporting Values**:
  
  Exporting a single value or multiple values from a module:

  ```js
  // Exporting a single value
  module.exports = someValue;

  // Exporting multiple values
  module.exports = { value1, value2, value3 };
  ```

- **Importing Values**:
  
  Importing modules into another file:

  ```js
  const xyz = require('./path/to/module'); // For single exports

  // For multiple exports (destructuring)
  const { people, age } = require('./path/to/module');
  ```

- **Built-in Modules**:
  Node.js comes with several built-in modules. For example, the `os` module provides operating system-related utilities.

  ```js
  const os = require('os');
  console.log(os.platform(), os.homedir()); // Outputs the platform and home directory
  ```

  For more details on the `os` module, refer to [Node.js OS Module Documentation](https://nodejs.org/docs/latest/api/os.html).

---

### 4. **File System (FS) Module**

The `fs` module provides functions to interact with the file system.

- **Reading Files**:
  
  ```js
  const fs = require('fs');

  fs.readFile('./docs/blog1.txt', 'utf-8', (err, data) => {
      if (err) {
          console.log(err);
      }
      console.log(data); // Outputs the file content
  });
  ```

- **Writing Files**:
  
  ```js
  fs.writeFile('./docs/blog2.txt', 'Hello, again', () => {
      console.log('File was written');
  });
  ```

- **Creating Directories**:
  
  ```js
  fs.mkdir('./assets', (err) => {
      if (err) {
          console.log(err);
      }
      console.log('Folder created');
  });
  ```

- **Deleting Directories**:
  
  ```js
  fs.rmdir('./assets', (err) => {
      if (err) {
          console.log(err);
      }
      console.log('Folder deleted');
  });
  ```

- **Conditional Folder Creation and Deletion**:
  
  ```js
  if (!fs.existsSync('./assets')) {
      fs.mkdir('./assets', (err) => {
          if (err) {
              console.log(err);
          }
          console.log('Folder created');
      });
  } else {
      fs.rmdir('./assets', (err) => {
          if (err) {
              console.log(err);
          }
          console.log('Folder deleted');
      });
  }
  ```

- **Deleting Files**:
  
  ```js
  if (fs.existsSync('./docs/deleteme.txt')) {
      fs.unlink('./docs/deleteme.txt', (err) => {
          if (err) {
              console.log(err);
          }
          console.log('File deleted');
      });
  }
  ```

  For more details on the `fs` module, refer to [Node.js FS Module Documentation](https://nodejs.org/docs/latest/api/fs.html).

---

### 5. **Streams & Buffers**

Streams allow Node.js to handle reading/writing data in chunks instead of all at once. This is useful for large files.

- **Example of Reading and Writing Streams**:
  
  ```js
  const fs = require('fs');

  const readStream = fs.createReadStream('./docs/randomtexts.txt');
  const writeStream = fs.createWriteStream('./docs/randomtexts2.txt');

  readStream.on('data', (chunk) => {
      console.log('----- NEW CHUNK -----');
      console.log(chunk); // Log the chunk of data
      writeStream.write('\nNEW CHUNK\n');
      writeStream.write(chunk); // Write the chunk to the writeStream
  });

  // Pipe the readStream directly into the writeStream
  readStream.pipe(writeStream);
  ```

  - **Streams** allow for efficient data handling, especially when dealing with large files.
  - **Piping** streams makes it easy to transfer data from one stream to another.

---

### Recap of Node.js File System Operations

- **Read Files**
- **Write Files**
- **Delete Files**
- **Create and Delete Directories**

This guide provides a solid understanding of the basic operations you will use frequently in Node.js development.

