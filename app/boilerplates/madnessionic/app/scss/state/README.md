This folder should contain state stylesheets for your app.  The Enjin can assist in making pages by using the command below.

```gulp add:state```

This will add the following files to your project:
```
app/jade/state/${STATE_NAME}.jade
app/scss/state/${STATE_NAME}.scss
app/ts/state/${STATE_NAME}.ts
``` 

It will also create a route in your enjin.json to allow you to navigate to your new state:
```
URL: localhost:3000/#/${STATE_NAME}
SREF: ui-sref="${STATE_NAME}"
```