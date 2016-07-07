import * as angular from 'angular';
import * as angularuirouter from 'angular-ui-router';
import * as angularpowerbi from 'angular-powerbi';

// Services
import reportsProvider from './services/reports';
import Utilities from './services/utilities';

// Pods
import { controller as applicationController, route as applicationRoute } from './application/module';
import { controller as scenario1Controller, route as scenario1Route } from './scenario1/module';
import { controller as scenario2Controller, route as scenario2Route } from './scenario2/module';

// Config
config['$inject'] = ["$stateProvider", "$urlRouterProvider", "ReportsServiceProvider"];
function config($stateProvider: angularuirouter.IStateProvider, $urlRouterProvider: angularuirouter.IUrlRouterProvider, ReportsServiceProvider: any) {
    
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
