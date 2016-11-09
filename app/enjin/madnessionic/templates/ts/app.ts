<%= typings ? '/// <reference path="' + typings + '"/>' : null %>
((): void => {

    angular.module('<%= app %>', [
        '<%= app %>.config', 
        <%= plugins %>
    ]);

})();