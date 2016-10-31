/// <reference path="../../typings/index.d.ts"/>
module <%= app %> {
    'use strict';

    class <%= name %>Controller {
        constructor(
            <% _.each(dependencies, function(dependency, key) { %>protected <%= dependency %><%= key === dependencies.length - 1 ? '' : ',\n\t\t\t' %><% }); %>
        ) {
            // ON LOAD       
        }
    }

    angular.module('<%= app %>')
           .controller('<%= app %>.<%= name %>Controller', <%= name %>Controller);
}