This folder should contain modal templates for your app.  The Enjin can assist in making modals by using the command below.

```gulp add-modal```

This will add the following files to your project:
```
app/jade/modal/${MODAL_NAME}.jade
app/scss/modal/${MODAL_NAME}.scss
``` 

It will also copy the javascript needed in order to generate your new modal.
```js
this.$ionicModal.fromTemplateUrl('html/modal/${MODAL_NAME}.html', {
    scope: this.$scope,
    animation: 'slide-in-up',
    backdropClickToClose: true
}).then((modal) => {
    this.modal = modal;
});
```

You can find more info about modals in the Ionic Docs link below:

<a href="http://ionicframework.com/docs/api/service/$ionicModal/" target="_blank">Ionic Modal Docs</a>