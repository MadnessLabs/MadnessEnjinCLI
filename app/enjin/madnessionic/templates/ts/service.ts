/// <reference path="../../typings/index.d.ts"/>

module <%= app %> {
    class <%= name %>Service {

        constructor() {
            // ON LOAD
        }
    }

    angular.module('<%= app %>').service('<%= name %>', <%= name %>Service);
}

