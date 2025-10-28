Here’s the content you shared converted into **Markdown (md) format**:

````markdown
# Install the Stripe CLI

From the command line, use an install script or download and extract a versioned archive file for your operating system to install the CLI.

---

## Docker

The Stripe CLI is also available as a Docker image.  
To install the latest version, run:

```bash
docker run --rm -it stripe/stripe-cli:latest
````

---

## Log in to the CLI

Log in and authenticate your Stripe user account to generate a set of restricted keys.
To learn more, see [Stripe CLI keys and permissions](https://stripe.com/docs/stripe-cli).

```bash
stripe login
```

Press the **Enter** key on your keyboard to complete the authentication process in your browser.

### Output

```
Your pairing code is: enjoy-enough-outwit-win
This pairing code verifies your authentication with Stripe.
Press Enter to open the browser or visit https://dashboard.stripe.com/stripecli/confirm_auth?t=THQdJfL3x12udFkNorJL8OF1iFlN8Az1 (^C to quit)
```

---

### Authenticate without a browser

Optionally, if you don’t want to use a browser, use the `--interactive` flag to authenticate with an existing API secret key or restricted key.
This is helpful when authenticating to the CLI without a browser, such as in a **CI/CD pipeline**.

```bash
stripe login --interactive
```

You can also use the `--api-key` flag to specify your API secret key inline each time you send a request:

```bash
stripe login --api-key sk_test_51RlTx0Q4PmDpP62kywBBuI3qzDmJ1M1aEKMpO9EIInyl1L7Boq0glm0WsZoxdqw5KjinLl4rhZDinJ6hqkOtBPXa008aMSBgT1
```

```

Do you want me to also generate this as a **.md file** you can download directly?
```
