## Madness Enjin CLI v1.1.5

The Enjin is an application development assistant to make cross platform coding simpler and more fun. The enjin is meant to be completely opt-in, not required but will make your life easier.

---
# Install

To install the enjin just run the command below in your terminal.  Once you do, you will be able to use the new commands with the enjin command.

```npm install -g madnessenjin```

---

# Commands

## start

- REPO - Link to git repo you are cloning (If using github you can use user/repo format)
- NAME - The name of the application / folder
- EDITOR - (Optional) The code editor to open your project in (code = VS Code, code-insiders = VS Code Insiders)

This will clone the repo and then run npm install for you. You can use short links for GitHub, like MadnessLabs/Animadness.  You can also pass in credentials for private repos in the short link style using the convention, user:password@MadnessLabs/Animadness. If you pass in the 4th argument it will open the project in your code editor.

Example:

```enjin start <REPO> <NAME> [EDITOR]```

```enjin start ionic-team/stencil-starter MyStencilApp code```

---


## add component (ac - for shorthand)

- NAME - The name of the component (Must contain a -)
- PROPS (Optional) - The props you wish to use inside your new component (Comma separated and : to set types)

This will create a new component folder with an SCSS and TSX file with props passed.  It will read end edit your stencil.config.js as well.

Example:

```enjin add component <NAME> [PROPS...]```

```enjin ac your-name first:string,last:string```

---


## remove component (rc - for shorthand)

- NAME - The name of the component (Must contain a -)

This will create a new component folder with an SCSS and TSX file with props passed.  It will read end edit your stencil.config.js as well.

Example:

```enjin remove component <NAME>```

```enjin rc your-name```

---

## init

- WITH [package / prompts] (Optional) - To create your enjin file with package or prompts

This will create an enjin.json in the current directory using either prompts or a package.json file.

Example:

```enjin init [WITH]```

---

## env

- [NAME] - The name of the environment

This will create an environment (enjin.[NAME].json) file in the directory.

Example:

```enjin env [NAME]```