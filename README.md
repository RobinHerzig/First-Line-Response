# First Line Response

<p align="center">
    <img src="https://img.shields.io/static/v1?label=|&message=HTML5&color=a33550&style=plastic&logo=html5"/>
    <img src="https://img.shields.io/static/v1?label=|&message=CSS3&color=a33550&style=plastic&logo=css3"/>
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SASS&color=2b625f&style=plastic&logo=sass"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=BOOTSTRAP&color=316c5e&style=plastic&logo=bootstrap"/> -->
    <img src="https://img.shields.io/static/v1?label=|&message=JAVASCRIPT&color=35a34d&style=plastic&logo=javascript"/>
    <img src="https://img.shields.io/static/v1?label=|&message=NODE.JS&color=35a34d&style=plastic&logo=node.js"/>
    <img src="https://img.shields.io/static/v1?label=|&message=EXPRESS&color=35a34d&style=plastic&logo=express"/>
    <img src="https://img.shields.io/static/v1?label=|&message=EJS&color=35a34d&style=plastic&logo=ejs"/>
    <!-- <img src="https://img.shields.io/static/v1?label=|&message=REACT.JS&color=35a34d&style=plastic&logo=react"/> -->
    <!-- <img src="https://img.shields.io/static/v1?label=|&message=REACT.NATIVE&color=35a34d&style=plastic&logo=react"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=TYPESCRIPT&color=4a935c&style=plastic&logo=typescript"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=PYTHON&color=52985b&style=plastic&logo=python"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=JAVA&color=cdf998&style=plastic&logo=java"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SOLIDITY&color=8fbc56&style=plastic&logo=solidity"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=SELENIUM&color=cdf998&style=plastic&logo=selenium"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=AWS&color=98bf53&style=plastic&logo=amazon"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=WORDPRESS&color=cdd148&style=plastic&logo=wordpress"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=ADOBE&color=98bf53&style=plastic&logo=adobe"/> -->
    <img src="https://img.shields.io/static/v1?label=|&message=MONGO-DB&color=359ba3&style=plastic&logo=mongodb"/>
<!--     <img src="https://img.shields.io/static/v1?label=|&message=WEBPACK&color=bbb111&style=plastic&logo=webpack"/> -->
<!--     <img src="https://img.shields.io/static/v1?label=|&message=LINUX&color=bbb111&style=plastic&logo=linux"/> -->
    <img src="https://img.shields.io/static/v1?label=|&message=GIT&color=359ba3&style=plastic&logo=git"/>
<!--     <img src="https://img.shields.io/static/v1?label=|&message=FIREBASE&color=cbb148&style=plastic&logo=firebase"/> -->
</p>

<p align="center">
    <a target="_blank" href="https://firstlineresponse.onrender.com/"><img width="50%" src="https://github.com/RobinHerzig/RobinHerzig/blob/main/images/firstlineresponse.png"></a>
    <br>
    <a align="center" target="_blank" href="https://firstlineresponse.onrender.com/">First Line Response</a>
</p>

For 8 years, I worked globally in emergency service communications. In this field we use software called computer-aided dispatch (CAD), which tracks calls for service and first responders. Some systems are extremely sophisticated but smaller agencies, who can't afford them, are limited to pen and paper. Unfortunately, this is an issue because it hurts response times and reliability.

To solve this problem, I'm introducing First Line Response, a web-based CAD app. This is a straight-forward tool that provides the CAD capabilities essential to keeping citizens and first responders safe:

- Create new calls as needed.
- Swap between existing calls.
- Automatically track call create date, time, and ID.
- Save and timestamp call notes.
- Assign multiple apparatus and timestamp movements.

## How It's Made:

This is a full-stack project utilizing MongoDB, EJS, and the web API's sessionStorage, EJS.

The "New Call" button sends a POST request that creates a new document in the MongoDB collection. When that call is selected from the calls for service list, client-side JavaScript fetches the database collection and, using the call's ObjectId as a reference, iterates through the data and populates the form.

To make the experience more seamless, First Line Response uses sessionStorage to locally remember the current active call. If, for example, the browser refreshes, that call will reload automatically.

EJS is a templating language used to add data to the page server-side. It's used primary to separate HTML partials (e.g., header, navigation, CAD, and footer) to allow for DRYer code. In addition, it allows for conditional rendering, such as displaying certain menu items or notifications when logged in and logged out.

## Optimizations:

While department budgets towards CAD software varies, upscale variants offer a wide array of options. These include creating unit roles and groups, AVL tracking with map, automatic creation of incident reports and archives, and so much more. Given time, these features may be added to First Line Response. Click the "Issues" tab above for more ideas.

One goal is to convert this into a desktop app using <a href="https://www.electronjs.org/">Electron</a>, a framework that allows developers to create native applications using web technologies.

Introducing a frontend framework, such as React, would also improve the interactivity of this application.

## Installation:

1. Download or clone the repo onto your local machine.
2. In your terminal, enter `npm install` to download and install the dependencies.
3. Use MongoDB to create a database:
    1. Create an account.
    2. Create a new project.
    3. Build a database (select the free option).
    4. Create a cluster. Choose any provider and region.
    5. Enter a username and password to authenticate your connection. Save this password for later.
    6. Add your current IP to the "IP Access List" to complete the database creation process.
4. On the "Database Deployments" page in MongoDB, click Connect > Connect your application. Save the application code for later.
5. From your local project directory, enter the config folder and create a `.env` file.
6. Inside the file, paste the following: `DB_STRING = <MongoDB application code>`. Enter the application code where indicated.
7. Inside the application code is `<password>`. Replace it with the password from earlier.
8. In the terminal, enter `npm start` to run the local server. Access it via `http://localhost:8000/`.

## Feedback:

Feedback is always welcome! I invite you to message me your comments and ideas using any of the social media listed within my profile.