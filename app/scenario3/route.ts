import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
};
modelResolver["$inject"] = ['ReportsService'];

const state: angularuirouter.IState = {
    name: "application.scenario3",
    parent: "application",
    url: "^/scenario3",
    views: {
        'main': {
            templateUrl: "/app/scenario3/template.html",
            controller: "Scenario3Controller",
            controllerAs: "vm"
        }
    },
    resolve: {
        scenario3model: modelResolver
    }
}

export default state;