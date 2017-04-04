* [Welcome](#welcome)
* [Dependencies](#dependencies)
    * [References](#references)
    * [Setup Instructions](#instructions)
* [Installation](#installation)
* [Start Building](#getting-started)
    * [Sublime Text](#sublime)
    * [Other RTE](#other-rte)
* [Commands](#commands)
    * [Add Commands](#add-commands)
    * [Config Commands](#config-commands)
    * [CSS Commands](#css-commands)
    * [Font Commands](#font-commands)
    * [HTML Commands](#html-commands)
    * [Image Commands](#img-commands)
    * [JS Commands](#js-commands)
    * [Remove Commands](#remove-commands)
    * [Custom Commands](#custom-commands)
* [Credits / License / Patreon](#credits)

---


# <a name="welcome"></a> Welcome

This project is being built with the [Madness Enjin](https://github.com/MadnessLabs/MadnessEnjinCLI), so it helps to understand some basic concepts of the tool.  All of the variables for your application are stored in ```enjin.json``` file.  You also have a ```.env``` files to overwrite variables set in enjin.json or add new values per environment.  Then all the commands accept a ```-e``` flag that you can use to set the environment.  So an example would be I create the following file in the root or run ```enjin env app``` to have it created for you.

### .env-app

```
{
    "mobile": true,
    "local": false,
    "debug": true,
    "enjinPath": "C:/xampp/htdocs/EnjinCLI/",
    "type": "madnessionic",
    "android": {
        "keystorePassword": "YOUR ANDROID KEYSTORE PASSWORD"
    }
}
```

Now you can run ```gulp android -e app``` to run a build on android using the ```.env-app``` file you created.  This is a very powerful concept that could make any variable change per environment.  You could have colors set to signify each environment, pages that are environment exclusive, or it's also a great place to store sensitive information as shown above with the Android keystore password because it shouldn't be synced with the repo.

The other huge part of the Enjin is the [Commands](#commands) that allow you to generate code, automate dumb tasks, and maintain code quality.  This README should serve as a guide on how to use all of these wonderful tools.  Enjoy and if we have helped you out in any way then please [Support us on Patreon](https://www.patreon.com/madnesslabs) so we can continue to development on Madness Enjin.

# <a name="dependencies"></a> Dependencies

This sections starts with a reference list of all of the dependencies so that you can understand what each of these peices do.  Then there is step-by-step instructions on how to install the dependencies.

### <a name="references"></a> REFERENCES

Below is a list of resources to help understand the software stack better.  Keep scrolling or [click for the step-by-step instructions](#instructions).

* <a href="https://github.com/MadnessLabs/MadnessEnjinCLI" target="_blank">Madness Enjin CLI</a> - Project building assistant
* <a href="https://nodejs.org/" target="_blank">NodeJS</a> - For spinning up local JavaScript driven server
* <a href="http://gulpjs.com/" target="_blank">GulpJS</a> - For running local, JavaScript driven, command line tasks
* <a href="http://www.browsersync.io/" target="_blank">Browser Sync</a> - For viewing changes live in the browser without having to leave your IDE
* <a href="http://ionicframework.com" target="_blank">Ionic</a> - For wrapping your app for Mobile (iOS & Android) and stock UI with icons.
* <a href="http://sass-lang.com/" target="_blank">SASS</a> - For writting cleaner and variable capable CSS.
* <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> - For using ES6 with static typing.
* <a href="https://pugjs.org/" target="_blank">Pug</a> - For writing cleaner and variable capable HTML.

### <a name="instructions"></a> SETUP ENVIRONMENT INSTRUCTIONS

1. **Install NodeJS** by clicking the "Install" button on their <a href="https://nodejs.org/" target="_blank">Home Page</a> and following the instructions
2. **Open Shell** and run the following command  
```npm install -g madnessenjin cordova ionic browser-sync gulp jade typescript typings jadelint sass-lint```


After you Have installed all of the dependencies using the step by step above you can install project using the [installation instructions](#installation). Then you are ready to start hacking with the platform. 

---

# <a name="installation"></a> Installation

Installation is required if you wish to view the application.  This assumes you have installed all of the **[Dependencies](#dependencies)**. Run the command below to install the build dependencies, build the web root from source files, and start a [Browser Sync](http://www.browsersync.io/) session in the default browser, to begin building.

FOR PUBLIC REPOS

```
enjin install [GITHUB_REPO]
```

OR FOR PRIVATE REPOS

```
enjin install [GITHUB_USERNAME]:[GITHUB_PASSWORD]@[GITHUB_REPO]
```

OR OLD FASHIONED WAY

```
git clone https://github.com/[GITHUB_REPO].git
Password: [GITHUB_PASSWORD]
cd dexsphere
npm install
``` 

Now watch your console go crazy and wait for it to ask you some questions about your app.  Answer the questions, then it will finish the install and open your new app in the browser, ready to be worked on. 

---

# <a name="getting-started"></a> Start Building

We have tried to make developing applications as easy as possible.  We create a project file for [Sublime Text 3](http://www.sublimetext.com/3), but this is by no means exclusive to that program. If you aren't using Sublime Text then skip to the [Other RTE](#other-rte) section.


### <a name="sublime"></a> SUBLIME TEXT  

1. Open Sublime Text project file located in root. ( <PROJECT NAME>.sublime-project )
2. Select "Tools" -> "Build" (Ctrl + B) to start build with GulpJS.
3. Open browser to project and click the Live Reload extension making sure the black dot fills in on the icon.

That's it! Now when you make changes to the files in src/ directory, the browser will reload to show changes auto-magically.

### <a name="other-rte"></a> OTHER EDITOR

Open Shell to project's root and run
 ```
 gulp
 ```
That's it! Now when you make changes to the files in src/ directory, the browser will reload to show changes auto-magically.

---

# <a name="commands"></a> Commands

Enjin commands allow us to automate the repetitive tasks that come with scaling a project. Here is a list of the commands available in this repo along with a short description of what they do and the list of flags that they accept.  The flags are not required, but they allow you to get somewhere quicker if you know what you want rather than answering a bunch of prompts.

### **gulp**
- -e [ENVIRONMENT] => This is the environment you would like to build for

General command for building and running a live reloading server.

### **gulp android**
- -e [ENVIRONMENT] => This is the environment you would like to build for

Build, package APK and run Android app on emulator or device .

### **gulp deploy**
- -e [ENVIRONMENT] => This is the environment you would like to build for
- -n [NOTE] => The note you would like on the deploy

A wrapper for Ionic Deploy that builds and deploys to selected environment.

### **gulp install**

This command will be run on a brand new project in order to setup your enjin.json and get the project ready to be worked on.

### **gulp ios**
- -e [ENVIRONMENT] => This is the environment you would like to build for

Build and package app so that it may be deployed via xCode.

### **gulp lint**
- -e [ENVIRONMENT] => This is the environment you would like to build for

Check formatting of all the files in the project.

### **gulp minify**
- -e [ENVIRONMENT] => This is the environment you would like to build for

Minify CSS and JS files

### **gulp reinstall**

This command will be run on project that is already setup to reconfigure enjin.json and get the project ready to be worked on.

### **gulp router**

Generate app/ts/router.ts file from enjin.json routes.

### **gulp typings**

Install typings for project (TypeScript uses typings to catch errors before the code is compiled).

### **gulp watch**

The file watcher that runs builds for each type of file (This task is auto-run with gulp).

---

# <a name="add-commands"></a> Add Commands

These commands allow quick adding of different peices of the application.  The flags are not required, they just make it faster if you know what you want.  If no flags are passed it will prompt you to answer questions.

### **gulp add:component**
- -n [NAME] => The name of the new component (Name should be Camel Case - Ex: feedCard)
- -a [ATTRIBUTES] => The list of attributes for the directive (Comma Separated)
- -r [RESTRICT] => Type of directive (Default: AE)

Creates a component, which is a directive that consists of a .ts, .pug, and .scss files, then copies a snippet to your clipboard. This should be used for anything that you want to use multiple places in the app like the FeedCard.

### **gulp add:controller**
- -n [NAME] => The name of the new controller (Name should be Camel Case - Ex: feedCard)
- -d [DEPENDENCIES] => The list of dependencies that need to be injected (Comma Separated)

Creates a controller and should only be used when needing a controller standing alone. Controllers are automagically created with adding of a state, page, or component and are the preferred commands for getting a controller.

### **gulp add:directive**
- -n [NAME] => The name of the new directive (Name should be Camel Case - Ex: feedCard)
- -a [ATTRIBUTES] => The list of attributes for the directive (Comma Separated)
- -t [TEMPLATE PATH] => The path to the template you would like to use
- -r [RESTRICT] => Type of directive (Default: AE)

Creates a stand-alone directive and copies a snippet to your clipboard. A component should be preferred as it will create the template (.pug) and stylesheet (.scss).

### **gulp add:filter**
- -n [NAME] => The name of the new filter (Name should be Camel Case - Ex: feedCard)

Creates a filter

### **gulp add:modal**
- -n [NAME] => The name of the new modal (Name should be Camel Case - Ex: feedCard)

Creates an Ionic modal and then copies the snippet to implement it to the clipboard.

### **gulp add:page**
- -n [NAME] => The name of the new page (Name should be Camel Case - Ex: feedCard)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a page, which consists of a controller (.ts), resolver (.ts), route (enjin.json), view (.pug), and stylesheet (.scss).

### **gulp add:popover**
- -n [NAME] => The name of the new popover (Name should be Camel Case - Ex: feedCard)

Creates an Ionic popover and then copies the snippet to implement it to the clipboard.

### **gulp add:resolver**
- -n [NAME] => The name of the new resolver (Name should be Camel Case - Ex: feedCard)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a resolver that can be applied to a route in order to force them to resolve a list of dependencies before the route loads.

### **gulp add:route**
- -n [NAME] => The name of the new route state (Name should be Camel Case - Ex: feedCard)
- -u [URL] => The URL of the page (Beginning with /)
- -t [TEMPLATE PATH] => The path to the template you would like to use
- -c [CONTROLLER] => The name of the controller to use for this route
- -r [RESOLVER] => The name of the resolver to use on this route

Creates a new route in the enjin.json and in turn in app/router.ts. Routes automagically get created with states and pages.

### **gulp add:service**
- -n [NAME] => The name of the new service (Name should be Camel Case - Ex: feedCard)
- -t [TYPE] => The type of service (Choices: Empty / Rest)

Creates a new service that is used to pass data around your application.  It can also be used to create a contract so that you avoid vendor locking.

### **gulp add:state**
- -n [NAME] => The name of the new state (Name should be Camel Case - Ex: feedCard)
- -v [VIEW] => The name of the ui-view to inject state into (Default: tab)
- -r [RESOLVES] => The list of things to resolve before the route can load (Comma Separated)

Creates a state, which consists of a controller (.ts), resolver (.ts), route (enjin.json), view (.pug), and stylesheet (.scss). If the state is named feedState and there is a feed page then the feed page will be set to abstract in enjin.json / router.ts.

---

# <a name="config-commands"></a> Config Commands

These commands allow quick configuration of different peices of the application.  The flags are not required, they just make it faster if you know what you want.  If no flags are passed it will prompt you to answer questions.

### **gulp config**
- -e [ENVIRONMENT] => This is the environment you would like to build for

Copies configuration variables from your enjin.json to various other project files.

### **gulp config:build**

Runs the config and a runs a build of the html and css.

### **gulp config:cordova**

Creates a Cordova config.xml file based off the enjin.json variable.

### **gulp config:css**

Creates app/scss/_variables.scss which contains all of the theme variables from enjin.json.

### **gulp config:ionic**

Creates ionic config file based off the enjin.json

### **gulp config:js**

Creates config file that allows access to your enjin variables inside your JavaScript (.ts) files.

### **gulp config:node**

Creates a package.json based off of the enjin.json file

### **gulp config:platform**

Creates app/ts/platform.ts file based off of the enjin.json file

### **gulp config:run**

Creates app/ts/run.ts file based off of the enjin.json file

### **gulp config:sublime**

Creates Sublime Text project file based off of the enjin.json file

---

# <a name="css-commands"></a> CSS Commands

These commands control the CSS build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp css:build**

Runs a build of the .scss files into www/css/build.css and a minified build to www/css/build.min.css

### **gulp css:compile**

Compiles the .scss files to CSS in the build/css folder.

### **gulp css:concat**

Concats together all of the css files in build/css folder and creates www/css/build.css file.

### **gulp css:import**

Creates app/scss/libraries.scss that contains all the libraries (.scss files) in the enjin.json {```css.libraries```}.

### **gulp css:libraries**

Builds app/scss/libraries.scss into build/css/libraries.css so we can combine that at the top of our built css file.

### **gulp css:lint**

Lints the .scss files in app/scss for formatting issues.  Clean code makes happier coders! ^_^

### **gulp css:minify**

Minifies www/css/build.css into www/css/build.min.css for production.

---

# <a name="font-commands"></a> Font Commands

These commands manage fonts on a project.

### **gulp font:copy**

Copies all font files specified in enjin.json {```fonts.watch```} into the {```fonts.dir```} directory.

---

# <a name="html-commands"></a> HTML Commands

These commands control the HTML build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp html:build**

Runs a build of the .pug files into www/html

### **gulp html:compile**

Runs a build of the .pug files into www/html with linting.

### **gulp html:lint**

Lint the .pug files in app/pug for formatting issues.  Clean code makes happier coders! ^_^

### **gulp html:template**

Compiles src/pug/app.pug file into the frame for our app store in www/index.html file.

---

# <a name="img-commands"></a> Image Commands

These commands manage images on a project.

### **gulp img:icon**

Creates favicons and icon file for the application from resources/icon.png file.

---

# <a name="js-commands"></a> JS Commands

These commands control the JS build process.  The only flag is the ```-e [Environment]``` to control which .env file you are using to overwrite enjin.json variables. These will almost never be used as the general commands run these for you, but they are here if needed.

### **gulp js:app**

Creates src/ts/app.ts file from enjin.json file.

### **gulp js:build**

Runs a build of the .ts files into www/js/build.js and a minified build to www/js/build.min.js

### **gulp js:compile**

Compiles the .ts files to JS in the build/js folder.

### **gulp js:concat**

Concats together all of the .js files in build/js folder and creates www/js/build.js file.

### **gulp js:lint**

Lints the .ts files in app/ts for formatting issues.  Clean code makes happier coders! ^_^

### **gulp js:minify**

Minifies www/js/build.js into www/js/build.min.js for production.

---

# <a name="remove-commands"></a> Remove Commands

These commands allow quick removal of different peices of the application.  The flags are not required, they just make it faster if you know what you want.  If no flags are passed it will prompt you to answer questions.

### **gulp remove:component**
- -n [NAME] => The name of the new component (Name should be Camel Case - Ex: feedCard)

Removes all traces of a component from the project.

### **gulp remove:controller**
- -n [NAME] => The name of the new controller (Name should be Camel Case - Ex: feedCard)

Removes all traces of a controller from the project.

### **gulp remove:directive**
- -n [NAME] => The name of the new directive (Name should be Camel Case - Ex: feedCard)

Removes all traces of a directive from the project.

### **gulp remove:filter**
- -n [NAME] => The name of the new filter (Name should be Camel Case - Ex: feedCard)

Removes all traces of a filter from the project.

### **gulp remove:modal**
- -n [NAME] => The name of the new modal (Name should be Camel Case - Ex: feedCard)

Removes all traces of a modal from the project.

### **gulp remove:page**
- -n [NAME] => The name of the new page (Name should be Camel Case - Ex: feedCard)

Removes all traces of a page from the project.

### **gulp remove:popover**
- -n [NAME] => The name of the new popover (Name should be Camel Case - Ex: feedCard)

Removes all traces of a popover from the project.

### **gulp remove:resolver**
- -n [NAME] => The name of the new resolver (Name should be Camel Case - Ex: feedCard)

Removes all traces of a resolver from the project.

### **gulp remove:route**
- -n [NAME] => The name of the new route state (Name should be Camel Case - Ex: feedCard)

Removes all traces of a route from the project.

### **gulp remove:service**
- -n [NAME] => The name of the new service (Name should be Camel Case - Ex: feedCard)

Removes all traces of a service from the project.

### **gulp remove:state**
- -n [NAME] => The name of the new state (Name should be Camel Case - Ex: feedCard)

Removes all traces of a state from the project.

---

# <a name="custom-commands"></a> Custom Commands

If you looked at the gulpfile.js you may have noticed that it doesn't include any of these tasks?!? This is because the build tasks are stored globally so that they can be updated and improved.

If you need your own custom tasks for your project just create a folder named "tasks" under the root and create a new .js file for each new task as shown below.

### tasks/example.js
```javascript
module.exports = function(gulp, callback) {
    return gulp.src('file.txt')
        .pipe(gulp.dest('newLocation/folder'));
};
```
And to run I would just use ```gulp example``` because of the filename.  You can also use folders to organize your tasks.  So you could make a folder named "example" and fill it with tasks and run them like this ```gulp example:taskOne``` .

---

## <a name="credits"></a> Credits

This app structure was made by the good people at <a href="http://madnesslabs.net" target="_blank">Madness Labs</a> and is **OPEN SOURCE**.  What good is making a brilliant application development process if you don't let others use it. If this has helped you please return the favor by donating to <a href="https://www.patreon.com/madnesslabs">Madness Labs on Patreon</a> so we can keep making your life wwesome.  Enjoy! ^_^
