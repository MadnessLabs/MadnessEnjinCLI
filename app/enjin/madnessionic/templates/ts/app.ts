((): void => {

    angular.module('<%= app %>', [
        '<%= app %>.config', 
        <%= plugins %>
    ]);

})();