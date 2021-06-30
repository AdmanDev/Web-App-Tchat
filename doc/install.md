# Install and run

---
## Environment variables

---

To run this app, some environment variables are required. These variables are in a .env file.

This step require to create Google, Facebook, and GitHub login API keys. [See login system](login.md).

### Back-end environment variables

1. Create <code>back/env/.env</code> file.
2. Fill in the variables using the [template](../BACK/env/template.txt).

### Front-end environment variables

1. Create <code>front/env/development.env</code> file.
2. Create <code>front/env/production.env</code> file.
3. Fill in the variables in these file using the [template](../FRONT/env/template.txt).
 
---

## Install dependencies

---

Run this command in your terminal :

**Back-end :**

NPM
```
    cd .\BACK
    npm install
```

**Front-end :**

NPM
``` 
    cd .\FRONT
    npm install
```

You can use YARN if you prefer.

## Run

---

Run <code>npm install</code> command in BACK and FRONT folders.
