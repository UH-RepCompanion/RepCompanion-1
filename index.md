<img src="doc/Landing.png" alt="">

Digits is an application that allows users to:

- Register an account.
- Create and manage a set of contacts.
- Add a set of timestamped notes regarding their interactions with each contact


## *Installation*

First, install [Meteor](https://docs.meteor.com/install.html)

Second, download a copy of [Digits](https://github.com/bksnelson/digits/tree/main). 

Third, cd into the app directory install the required libraries with:

```$ meteor npm install```

Once the libraries are installed, you can run the application by invoking:

```$ meteor npm run start```

The first time you run the app, it will create some default users and data. Here is the output:

```
% meteor npm run start

> meteor-application-template-react@ start /Users/brandonnelson/GitHub/bksnelson/digits/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/GitHub/bksnelson/digits/app ]]]]]     

=> Started proxy.                             
=> Started HMR server.                        
=> Started MongoDB.                           
I20240402-16:44:35.552(-10)? Creating the default user(s)
I20240402-16:44:35.590(-10)?   Creating user admin@foo.com.
I20240402-16:44:35.868(-10)?   Creating user john@foo.com.
I20240402-16:44:36.018(-10)? Creating default contacts.
I20240402-16:44:36.018(-10)?   Adding: Johnson (john@foo.com)
I20240402-16:44:36.057(-10)?   Adding: Casanova (john@foo.com)
I20240402-16:44:36.059(-10)?   Adding: Binsted (admin@foo.com)
=> Started your app.

=> App running at: http://localhost:3000/
```

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000). You can login using the credentials in settings.development.json, or else register a new account.

Lastly, you can run ESLint over the code in the imports/ directory with:

```meteor npm run lint```

# User Interface Walkthrough

### Landing Page

When you first bring up the application, you will see the landing page that provides a brief introduction to the capabilities of Digits:

<img src="doc/Landing.png" alt="">

### Register

If you do not yet have an account on the system, you can register by clicking on “Login”, then “Sign Up”:

<img src="doc/Register.png" alt="">

### Sign in

Click on the Login link, then click on the Signin link to bring up the Sign In page which allows you to login:

<img src="doc/Login.png" alt="">

### User home page

After successfully logging in, the system takes you to your home page. It is just like the landing page, but the NavBar contains links to list contact and add new contacts:

<img src="doc/Loggedin.png" alt="">

### List Contacts

Clicking on the List Contacts link brings up a page that lists all of the contacts associated with the logged in user:

<img src="doc/ListContacts.png" alt="">

This page also allows the user to add timestamped “notes” detailing interactions they’ve had with the Contact. For example:

<img src="doc/Note.png" alt="">

### Edit Contacts

From the List Contacts page, the user can click the “Edit” link associated with any Contact to bring up a page that allows that Contact information to be edited:

<img src="doc/EditContact.png" alt="">

### Admin mode

It is possible to designate one or more users as “Admins” through the settings file. When a user has the Admin role, they get access to a special NavBar link that retrieves a page listing all Contacts associated with all users:

<img src="doc/ListContactsAdmin.png" alt="">
