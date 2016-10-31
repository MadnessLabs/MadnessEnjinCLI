<% if(resolves) { %>declare var <%= resolves %>;<% } %>

module <%= app %> {
    'use strict';

    class <%= app %>Router {
        constructor($stateProvider, $urlRouterProvider) {
            $stateProvider
                <% _.each(routes, function(route) { %>.state('<%= route.state %>', {
                    'url': '<%= route.url %>'<%= route.templateUrl ? ",\n\t\t\t\t\t'templateUrl': '" + route.templateUrl + "'" : ''  %><%= route.controller ? ",\n\t\t\t\t\t'controller': '" + route.controller + "'" : ''  %><%= route.controllerAs ? ",\n\t\t\t\t\t'controllerAs': '" + route.controllerAs + "'" : ''  %><%= route.resolve ? ",\n\t\t\t\t\t'resolve': new " + route.resolve : ''  %><%= route.abstract ? ",\n\t\t\t\t\t'abstract': " + route.abstract : ''  %><%= route.views ? ",\n\t\t\t\t\t'views': " + JSON.stringify(route.views, null, 4).split('"').join("'") : ''  %>
                })<% }); %>;

            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('<%= defaultRoute %>');
            });
        }
    }

    angular.module('<%= app %>')
           .config(<%= app %>Router);
}