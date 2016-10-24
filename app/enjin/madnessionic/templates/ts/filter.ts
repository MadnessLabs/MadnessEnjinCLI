/// <reference path="../../typings/index.d.ts"/>

module <%= app %> {
    class <%= name %> {
        constructor(input, all) {
            return '';
        };
    }

    angular.module('<%= app %>').filter('<%= name %>', function(){
        return <%= name %>;
    });
}
