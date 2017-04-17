## Madness Enjin CLI

The Enjin is an application development assistant to make cross platform coding simpler and more fun.

---
# Install

Sorry for the long list of global components, we hope to solve this on a future update.

```npm install -g madnessenjin cordova ionic browser-sync gulp jade typescript typings jadelint sass-lint rimraf```

---

# Commands

## start

- NAME - The name of the application / folder

This will copy the boilerplate from http://github.com/madnesslabs/madnessionic into a folder with the APP_NAME provided and then run the install for you.

Example:

```enjin start NAME```

---
## install

- REPO - The link to the repo you wish to reinstall
- [NAME] - The name you wish to give the folder / project

This will clone the repo and then run the install for you. You can use short links for GitHub, like MadnessLabs/Animadness.  You can also pass in credentials for private repos in the short link style using the convention, user:password@MadnessLabs/Animadness.

Example:

```enjin install REPO [NAME]```

---

## env

- [NAME] - The name of the environment

This will create an environment (enjin.[NAME].json) file in the directory.

Example:

```enjin env [NAME]```

---

## plugin

- NAME - The name of the plugin to install

This will install a plugin and any plugins it depends on into your project.

Example:

```enjin plugin NAME```

---

## android

- ENVIRONMENT - The environment to build for
- KEYSTORE - The path to your projects keystore for Android
- KEYSTORE_PASSWORD - The password for your keystore
- ALIAS - The alias for the App on the keystore

This will build an Android APK from your project.

Example:

```android [ENVIRONMENT] [KEYSTORE] [KEYSTORE_PASSWORD] [ALIAS]```

---