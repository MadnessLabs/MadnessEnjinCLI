## Madness Enjin CLI

The Enjin is an application development assistant to make cross platform coding simpler and more fun.

---
# Install

Sorry for the long list of global components, we hope to solve this on a future update.

```npm install -g madnessenjin cordova ionic browser-sync gulp jade typescript typings jadelint sass-lint```

---

# Commands

## start

- APP_NAME - The name of the application / folder

This will copy the boilerplate from http://github.com/madnesslabs/madnessionic into a folder with the APP_NAME provided and then run the install for you.

Example:

```enjin start APP_NAME```

---
## install

- REPO_LINK - The link to the repo you wish to reinstall
- FOLDER_NAME - The name you wish to give the folder

This will clone the repo and then run the install for you. You can use short links for GitHub, like MadnessLabs/Animadness.  You can also pass in credentials for private repos in the short link style using the convention, user:password@MadnessLabs/Animadness.

Example:

```enjin install REPO_LINK [FOLDER_NAME]```

---

## env

- ENVIRONMENT - The name of the environment

This will create an environment (.env) file in the directory.

Example:

```enjin env [ENVIRONMENT]```

---