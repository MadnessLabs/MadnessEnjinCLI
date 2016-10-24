# Madness Ionic by Madness Labs
The build process used by Madness Labs to build Ionic hybrid apps

* [Dependencies](#dependencies)
    * [References](#references)
    * [Install Instructions](#instructions)
* [Installation](#installation)
* [Start Building](#getting-started)
    * [Sublime Text](#sublime)
    * [Other RTE](#other-rte)
* [Testing](#testing)
* [Credits / License](#credits)

---


### <a name="dependencies"></a> Dependencies

This sections starts with a reference list of all of the dependencies so that you can understand what each of these peices do.  Then there is step-by-step instructions on how to install the dependencies.

#### <a name="references"></a> REFERENCES

Below is a list of resources to help understand the software stack better.  Keep scrolling or [click for the step-by-step instructions](#instructions).

* <a href="https://nodejs.org/" target="_blank">NodeJS</a> - For spinning up local JavaScript driven server
* <a href="http://gulpjs.com/" target="_blank">GulpJS</a> - For running local, JavaScript driven, command line tasks
* <a href="http://www.browsersync.io/" target="_blank">Browser Sync</a> - For viewing changes live in the browser without having to leave your IDE
* <a href="http://ionicframework.com" target="_blank">Ionic</a> - For wrapping your app for Mobile (iOS & Android) and stock UI with icons.
* <a href="http://sass-lang.com/" target="_blank">SASS</a> - For writting cleaner and variable capable CSS.
* <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> - For using ES6 with static typing.
* <a href="https://pugjs.org/" target="_blank">Pug</a> - For writing cleaner and variable capable HTML.

#### <a name="instructions"></a> SETUP ENVIRONMENT INSTRUCTIONS

1. **Install NodeJS** by clicking the "Install" button on their <a href="https://nodejs.org/" target="_blank">Home Page</a> and following the instructions
2. **Open Shell** and run the following command  
```npm install -g cordova ionic browser-sync gulp jade typescript typings jadelint sass-lint```


After you Have installed all of the dependencies using the step by step above you can install project using the [installation instructions](#installation). Then you are ready to start hacking with the platform. 

---

## <a name="installation"></a> Installation

Installation is required if you wish to view the application.  This assumes you have installed all of the **[Dependencies](#dependencies)**. Run the command below to install the build dependencies, build the web root from source files, and start a [Browser Sync](http://www.browsersync.io/) session in the default browser, to begin building.

```
git clone https://github.com/MadnessLabs/MadnessIonic.git <APP NAME>
cd <APP NAME>
npm install
``` 

Now watch your console go crazy and wait for it to ask you some questions about your app.  Answer the questions, then it will finish the install and open your new app in the browser, ready to be worked on. 

---

## <a name="getting-started"></a> Start Building

We have tried to make developing applications as easy as possible.  We use [Sublime Text 3](http://www.sublimetext.com/3) to do all of our projects, but this is by no means exclusive to that program. If you aren't using Sublime Text then skip to the [Other RTE](#other-rte) section.


### <a name="sublime"></a> Sublime Text  

1. Open Sublime Text project file located in root. ( <PROJECT NAME>.sublime-project )
2. Select "Tools" -> "Build" (Ctrl + B) to start build with GulpJS.
3. Open browser to project and click the Live Reload extension making sure the black dot fills in on the icon.

That's it! Now when you make changes to the files in src/ directory, the browser will reload to show changes auto-magically.

### <a name="other-rte"></a> Other RTE

Open Shell to project's root and run
 ```
 gulp
 ```
That's it! Now when you make changes to the files in src/ directory, the browser will reload to show changes auto-magically.


---

## <a name="credits"></a> Credits

This app structure was made by the good people at <a href="http://madnesslabs.net" target="_blank">Madness Labs</a> and is **OPEN SOURCE**.  What good is making a brilliant application development process if you don't let others use it.  Enjoy! ^_^
