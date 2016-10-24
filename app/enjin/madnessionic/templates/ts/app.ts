/// <reference path="../typings/index.d.ts"/>
((): void => {

    angular.module('<%= app %>', [
        '<%= app %>.config', 
        <%= plugins %>
    ]);

})();