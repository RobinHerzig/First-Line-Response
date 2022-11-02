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

firstlineresponse.onrender.com/

In emergency services, computer-aided dispatch (CAD) software is used to track calls for service and first responders.

It's utilized by 911 operators who answer incoming calls, prioritize urgency, and dispatch law enforcement, fire, or EMS personnel as required.

CAD systems are critical for the saftey and wellbeing of both first responders and the citizens they serve.

## How It's Made:

This is a full-stack project utilizing web API's sessionStorage, EJS and MongoDB.

The "New Call" button sends a POST request that adds a new document to the collection in MongoDB, which loads in the call list using EJS. When selected, client-side JavaScript references its ObjectId to iterate through the collection and populate the form. In addition, the web API sessionStorage saves the ObjectID so that it will automatically reload if the browser is refreshed.

The document may be modified while it's loaded in the form. To save it, the "Save Call" button uses method-override module to parse each of field and send the data to the server as a POST request inside MongoDB.

## Optimizations:

While department budgets towards CAD software varies, upscale variants offer a wide array of options. These include creating unit roles and groups, AVL tracking with map, automatic creation of incident reports and archives, and so much more. Given time, I may look into expanding this project to add some of these features.

In addition, one goal is to convert this into a desktop app using <a href="https://www.electronjs.org/">Electron</a>, a framework that allows developers to create native applications using web technologies.

Introducing a frontend framework, such as React, would also improve the interactivity of this application. In particular, it would allow for seamless updating of components without requiring a browser refresh.

## Lessons Learned:

This was another great lesson in Express and MongoDB, as well as how they can communicate to client-side JavaScript. Having multiple objects to iterate through also posed some challenges. 