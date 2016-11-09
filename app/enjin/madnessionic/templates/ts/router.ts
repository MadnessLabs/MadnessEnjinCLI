<%= typings ? '/// <reference path="' + typings + '"/>' : null %>
module <%= app %> {
    'use strict';

    class <%= app %>Router {
        constructor($stateProvider, $urlRouterProvider) {
            $stateProvider
                <% _.each(routes, function(route) { %>.state('<%= route.state %>', {
                    'url': '<%= route.url %>'<%= route.templateUrl ? ",\n\t\t\t\t\t'templateUrl': '" + route.templateUrl + "'" : ''  %><%= route.controller ? ",\n\t\t\t\t\t'controller': '" + route.controller + "'" : ''  %><%= route.controllerAs ? ",\n\t\t\t\t\t'controllerAs': '" + route.controllerAs + "'" : ''  %><%= route.resolve ? ",\n\t\t\t\t\t'resolve': new " + route.resolve : ''  %><%= route.abstract ? ",\n\t\t\t\t\t'abstract': " + route.abstract : ''  %><% if(route.views) { %>,
                    'views': {
                        <% _.each(route.views, function(view, key) { %>'<%= key %>': {
                            'templateUrl': '<%= view.templateUrl %>'<% if (view.controller) { %>,
                            'controller': '<%= view.controller %>'<% } if (view.controllerAs) { %>,
                            'controllerAs': '<%= view.controllerAs %>'<% } if (view.resolve) { %>,
                            'resolve': new <%= view.resolve %><% } %>
                        }<%= view !== route.views[Object.keys(route.views)[Object.keys(route.views).length - 1]] ? ', \n\t\t\t\t\t\t' : '' %><% }); %>
                    }<% } %>
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