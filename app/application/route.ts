import * as angularuirouter from 'angular-ui-router';

const state: angularuirouter.IState = {
    name: "application",
    abstract: true,
    templateUrl: "/app/application/template.html",
    controller: "ApplicationController",
    controllerAs: "vm"
}

export default state;