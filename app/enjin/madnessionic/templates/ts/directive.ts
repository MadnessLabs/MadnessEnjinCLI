/// <reference path="../../typings/index.d.ts"/>

angular.module('<%= app %>').directive('<%= name %>', function() {
    return {
        restrict: <%= restrict %>,<%= template %>
        scope: <%= attrs %>,
        link: function($scope:any, element, attrs) {
            //On Load
        }
    };
});