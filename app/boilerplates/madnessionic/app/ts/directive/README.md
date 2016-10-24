This folder should contain angular directives (components) for your app.  The Enjin can assist in making components by using the command below.

```gulp add-component```

This will add the following files to your project:
```
app/jade/directive/${COMPONENT_NAME}.jade
app/scss/directive/${COMPONENT_NAME}.scss
app/ts/directive/${COMPONENT_NAME}.ts
``` 

## - OR - 

If you need a directive without a template and styles, then you can use the following command.

```gulp add-directive```


You can find more info about directives in the Angular Docs link below:

<a href="https://docs.angularjs.org/guide/directive" target="_blank">Angular Directive Docs</a>