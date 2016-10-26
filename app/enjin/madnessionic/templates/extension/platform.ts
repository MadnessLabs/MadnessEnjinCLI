/// <reference path="../typings/index.d.ts"/>

module <%= app %> {
    class PlatformService {

        constructor(
            protected enjin
        ) {
            // INJECT DEPENDENCIES ONLY
            // USE run() INSTEAD
        }

        run() {
            // ON LOAD
        }
    }

    angular.module('<%= app %>').service('Platform', PlatformService);
}

