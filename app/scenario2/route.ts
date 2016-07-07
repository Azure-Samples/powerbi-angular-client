import * as angularuirouter from 'angular-ui-router';

const state: angularuirouter.IState = {
    name: "application.scenario2",
    parent: "application",
    url: "^/scenario2",
    views: {
        'main': {
            templateUrl: "/app/scenario2/template.html",
            controller: "Scenario2Controller",
            controllerAs: "vm"
        }
    }
}

export default state;