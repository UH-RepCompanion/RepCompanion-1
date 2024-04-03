<img src="doc/Landing.png" alt="#">

Digits is an application that allows users to:

<div>
  <ul>
    <li>Register an account.</li>
    <li>Create and manage a set of contacts.</li>
    <li>Add a set of timestamped notes regarding their interactions with each contact.</li>
  </ul>
</div>

Installation
First, install [Meteor](https://docs.meteor.com/install.html)

Second, download a copy of [Digits](https://github.com/bksnelson/digits/tree/main). 

Third, cd into the app directory install the required libraries with:
```$ meteor npm install```
Once the libraries are installed, you can run the application by invoking:
```$ meteor npm run start```
The first time you run the app, it will create some default users and data. Here is the output:
```% meteor npm run start

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

If all goes well, the template application will appear at http://localhost:3000. You can login using the credentials in settings.development.json, or else register a new account.

Lastly, you can run ESLint over the code in the imports/ directory with:
```meteor npm run lint```