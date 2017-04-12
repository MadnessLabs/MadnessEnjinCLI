/// <reference path="../typings/index.d.ts"/>
module <%= app %> {
    'use strict';

    class AppRunner {
        constructor(
            $rootScope, 
            enjin, 
            $state, 
            $ionicLoading, 
            Platform
        ) {
            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
                $state.previous = fromState;
            });

            $rootScope.$on('loading:show', function() {
                $ionicLoading.show();
            });

            $rootScope.$on('loading:hide', function() {
                $ionicLoading.hide();
            });

            Platform.run();
        }
    }
    angular.module('<%= app %>').run(AppRunner);
}