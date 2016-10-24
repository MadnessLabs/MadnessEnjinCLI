This folder should contain popover templates for your app.  The Enjin can assist in making popovers by using the command below.

```gulp add-popover```

This will add the following files to your project:
```
app/jade/popover/${POPOVER_NAME}.jade
app/scss/popover/${POPOVER_NAME}.scss
``` 

It will also copy the javascript needed in order to generate your new popover.
```js
this.$ionicPopover.fromTemplateUrl('html/popover/${POPOVER_NAME}.html', {
    scope: this.$scope,
    'backdropClickToClose': true
}).then((popover) => {
    this.popover = popover;
});
```

You can find more info about popovers in the Ionic Docs link below:

<a href="http://ionicframework.com/docs/api/service/$ionicPopover/" target="_blank">Ionic Popover Docs</a>