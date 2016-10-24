/// <reference path="../typings/index.d.ts"/>
declare var chrome;

module <%= app %> {
    'use strict';

    class ExtensionBackgroundService {

        constructor() {
            // ON LOAD
            // This file runs in the background as long as the user has chrome open (usually always open)
            // DOCS: https://developer.chrome.com/extensions/event_pages
        }
    }   
    
    new ExtensionBackgroundService;
}