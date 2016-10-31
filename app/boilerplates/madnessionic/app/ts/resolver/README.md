This folder should contain resolves for your routes.  The Enjin can assist in making resolves by using the command below.

```gulp add:resolve```

This will add the following file to your project:
```
app/ts/resolve/${RESOLVE_NAME}.ts
``` 

It can now be called in the enjin.json file under a route using resolve.
```
[
    {
        "state": "home",
        "url": "/home",
        "templateUrl": "html/page/home.html",
        "controller": "Animadness.HomeController",
        "controllerAS": "ctrl",
        "resolve": "${RESOLVE_NAME}"
    }, {
    ...
]
```