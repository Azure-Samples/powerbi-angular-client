import angular from 'angular';
import angularuirouter from 'angular-ui-router';
import angularpowerbi from 'angular-powerbi';

// Needed to force ui router to be loaded.
console.log(angularuirouter);
console.log(angularpowerbi);

// Services
import reportsProvider from './services/reports.js';
import Utilities from './services/utilities.js';

// Pods
import { controller as applicationController, route as applicationRoute } from './application/module.js';
import { controller as scenario1Controller, route as scenario1Route } from './scenario1/module.js';
import { controller as scenario2Controller, route as scenario2Route } from './scenario2/module.js';

// Config
config['$inject'] = ["$stateProvider", "$urlRouterProvider", "ReportsServiceProvider"];
function config($stateProvider, $urlRouterProvider, ReportsServiceProvider) {
    
    ReportsServiceProvider.setBaseUrl('http://powerbipaasapi.azurewebsites.net/');
    
    $urlRouterProvider.otherwise('/scenario1');

    $stateProvider.state(applicationRoute);
    $stateProvider.state(scenario1Route);
    $stateProvider.state(scenario2Route);
}

angular
    .module('app', [
        'ui.router',
        'powerbi'
    ])
    .provider('ReportsService', reportsProvider)
    .service('Utilities', Utilities)
    .controller('ApplicationController', applicationController)
    .controller('Scenario1Controller', scenario1Controller)
    .controller('Scenario2Controller', scenario2Controller)
    .config(config)
    ;
