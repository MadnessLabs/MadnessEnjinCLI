/// <reference path="../typings/index.d.ts"/>

declare var ionic;

module <%= app %> {
    'use strict';

    class AppRunner {
        constructor(
            $ionicPlatform, 
            $cordovaKeyboard, 
            $cordovaSplashscreen, 
            $rootScope, 
            enjin, 
            $state, 
            $ionicLoading, 
            $ionicSideMenuDelegate,
            $http
        ) {
            $rootScope.host = {
                api: enjin.db.api.host.slice(0, -3),
                apiFull: enjin.db.api.host,
                url: enjin.url
            };

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
                $rootScope.showSidebar = true;
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState) {
                $state.previous = fromState;
            });

            $rootScope.$on('loading:show', function() {
                $ionicLoading.show({ template: '<img src="./img/loader.gif" />' });
            });

            $rootScope.$on('loading:hide', function() {
                $ionicLoading.hide();
            });

            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                if (window.cordova) {
                    $cordovaSplashscreen.hide();

                    $rootScope.$watch(function() {
                        return $cordovaKeyboard.isVisible();
                    }, function(value) {
                        $rootScope.keyboardOpen = value;
                    });
                }

                $rootScope.toggleMenu = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };
            });
        }
    }
    angular.module('<%= app %>').run(AppRunner);
}