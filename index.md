[Contract Link](https://docs.google.com/document/d/1tp4QYSD7dfjYHTd03d5IHFc6_XyA9PcVLbLC0lbu9PU/edit)

<img src="doc/uh-repcompanion-logo.png">
[UH RepCompanion Github Organization Page](https://github.com/UH-RepCompanion)

<img src="/images/uh-repcompanion.png">

UH RepCompanion is an application that allows users to:

* Make an account and connect with other people who need a workout companion


## Installation

First, [install Meteor](https://www.meteor.com/install).

Second, cd into the app/ directory of your local copy of the repo, and install third party libraries with:

```
$ meteor npm install
```

## Running the system

Once the libraries are installed, you can run the application by invoking the "start" script.

```
$ meteor npm run start
```

The first time you run the app, it will create some default users and data. Here is the output:

```
 meteor npm run start 

> meteor-application-template-react@ start /Users/carletonmoore/GitHub/ICS314/meteor-application-template-react/app
> meteor --no-release-check --exclude-archs web.browser.legacy,web.cordova --settings ../config/settings.development.json

[[[[[ ~/Documents/GitHub/digits/app ]]]]]  

=> Started proxy.                             
=> Started HMR server.                        
=> Started MongoDB.                           
I20240403-15:07:07.591(-10)? Creating the default user(s)
I20240403-15:07:07.622(-10)?   Creating user admin@foo.com.
I20240403-15:07:10.059(-10)?   Creating user john@foo.com.
I20240403-15:07:10.438(-10)? Creating default contacts.
I20240403-15:07:10.438(-10)?   Adding: Johnson (john@foo.com)
I20240403-15:07:10.595(-10)?   Adding: Casanova (john@foo.com)
I20240403-15:07:10.598(-10)?   Adding: Binsted (admin@foo.com)
=> Started your app.


=> App running at: http://localhost:3000/
```

### Viewing the running app

If all goes well, the template application will appear at [http://localhost:3000](http://localhost:3000).  You can login using the credentials in [settings.development.json](https://github.com/blakewatanabe/digits/blob/main/config/settings.development.json), or else register a new account.

### ESLint

You can verify that the code obeys our coding standards by running ESLint over the code in the imports/ directory with:

```
meteor npm run lint
```

## Walkthrough

The following sections describe the major features of this template.

#### Landing page

When you retrieve the app at http://localhost:3000, this is what should be displayed:

<img src="doc/landing-page.png">

The next step is to use the Login menu to either Login to an existing account or register a new account.

#### Login page

Clicking on the Login link, then on the Sign In menu item displays this page:

<img src="doc/login-page.png">

#### Register page

Alternatively, clicking on the Login link, if you dont have an account yet, you can click the register link to make an account:

<img src="doc/register.png">


#### Landing (after Login) page, non-Admin user

Once logged in you will be directed into the landing page with a new navbar section called Finder page.

<img src="doc/signedin-landing-page.png">

#### Profile page

After logging in, here is the page that allows you to view and edit your profile.

<img src="doc/profile-page.png">

#### Finder Page

This page allows you to see a group of students who are available for workouts, here you can view their workout for that day and request to join them. You can also filter this page by different workouts and it will only shows students who assigned their workout for that day.

<img src="doc/finder-page.png">

#### Filter list

In this section admins are able to see all the events listed in the Finder page and delete events listed in the page.

<img src="doc/filter-list.png">

#### Admin page (list all users contact)

To provide a simple example of a "super power" for Admin users, the Admin page lists shows all the users and has the authority to remove any accounts:

<img src="doc/admin-finder-page.png">

Note that non-admin users cannot get access to this page.

### Quality Assurance

#### ESLint

The application includes a [.eslintrc](https://github.com/ics-software-engineering/meteor-application-template-react/blob/main/app/.eslintrc) file to define the coding style adhered to in this application. You can invoke ESLint from the command line as follows:

```
[~/meteor-application-template-react/app]-> meteor npm run lint

> meteor-application-template-react@ lint /Users/philipjohnson/meteor-application-template-react/app
> eslint --quiet ./imports
```

ESLint should run without generating any errors.