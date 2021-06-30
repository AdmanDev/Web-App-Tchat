# Login system

User can login with these services

* **Google** [API](https://developers.google.com/identity/sign-in/web/sign-in)
    * Back-end library
        * [google-auth-library](https://www.npmjs.com/package/google-auth-library)

    * Front-end library
        * [react-google-login](https://www.npmjs.com/package/react-google-login)

* **Facebook** [API](https://developers.facebook.com/docs/facebook-login/web)
    * Front-end library
        * [react-facebook-login](https://www.npmjs.com/package/react-facebook-login)
    
* **GitHub** [API](https://docs.github.com/en/rest/guides/basics-of-authentication)
    * Front-end library
        * [react-login-github](https://www.npmjs.com/package/react-login-github)

![Login system](../doc/images/login_system.svg)

## **Step 1 :**

Client calls login service API to get access token. In this step, user enter his login and password.

## **Step 2 :**

If the entered login and password are good, the API returns an access token to allows get user informations.

## **Step 3 :**

Client send login request to the server.

<u>Message to the server :</u>

* *name* : "login"
* *data* : JS object that contains :
  * *token* : access token
  * *service* : name of login service (Google, Facebook, GitHub...)

## **Step 4 :**

HTTP Request to verify access token

## **Step 5 :**

The API returns user infos if access token is good

## **Step 6 :**

Server answers the client.

<u>Message to the client :</u>

* *name* : "loginResponse"
* *data* : JS object that contains :
  * *isLogged* : *true if user is logged successfuly*
  * *loginInfo* : JS object that contains :
    * *token* : access token
    * *service* : name of login service (Google, Facebook, GitHub...)
  * *user* : JS object that contains :
    * *name* : username
    * *picture* url of user profile picture

**Note :**

After the first login, token will be saved on cookie browser and will be used to login automatically so the step 1 and 2 will be skiped.
