import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
};
modelResolver["$inject"] = ['ReportsService'];

const state: angularuirouter.IState = {
    name: "application.scenario1",
    parent: "application",
    url: "^/scenario1",
    views: {
        'main': {
            templateUrl: "/app/scenario1/template.html",
            controller: "Scenario1Controller",
            controllerAs: "vm"
        }
    },
    resolve: {
        scenario1model: modelResolver
    }
}

export default state;