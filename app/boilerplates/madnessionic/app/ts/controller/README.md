This folder should contain page controllers for your app.  The Enjin can assist in making pages by using the command below.

```gulp add-page```

This will add the following files to your project:
```
app/jade/page/${PAGE_NAME}.jade
app/scss/page/${PAGE_NAME}.scss
app/ts/controller/${PAGE_NAME}.ts
``` 

It will also create a route in your enjin.json to allow you to navigate to your new state:
```
URL: localhost:3000/#/${PAGE_NAME}
SREF: ui-sref="${PAGE_NAME}"
```

## - OR - 

If you just need a controller then you can use the following command.

```gulp add-controller```