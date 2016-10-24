/// <reference path="../../typings/index.d.ts"/>
module <%= app %> {
    'use strict';

    class <%= name %>Controller {
        constructor() {
            // ON LOAD       
        }
    }

    angular.module('<%= app %>')
           .controller('<%= app %>.<%= name %>Controller', <%= name %>Controller);
}