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
import { controller as scenario3Controller, route as scenario3Route } from './scenario3/module';
import pageNavigationComponent from './components/powerbi-page-navigation/component';

// Config
config['$inject'] = ["$stateProvider", "$urlRouterProvider", "ReportsServiceProvider"];
function config($stateProvider: angularuirouter.IStateProvider, $urlRouterProvider: angularuirouter.IUrlRouterProvider, ReportsServiceProvider: any) {
    
    ReportsServiceProvider.setBaseUrl('http://powerbipaasapi.azurewebsites.net/');
    
    $urlRouterProvider.otherwise('/scenario1');

    $stateProvider.state(applicationRoute);
    $stateProvider.state(scenario1Route);
    $stateProvider.state(scenario2Route);
    $stateProvider.state(scenario3Route);
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
    .controller('Scenario3Controller', scenario3Controller)
    .directive('powerbiPageNavigation', () => new pageNavigationComponent())
    .config(config)
    ;
