import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('c4d31ef0-7b34-4d80-9bcb-5974d1405572', true);
};
modelResolver["$inject"] = ['ReportsService'];

const state: angularuirouter.IState = {
    name: "application.scenario6",
    parent: "application",
    url: "^/scenario6",
    views: {
        'main': {
            templateUrl: "/app/scenario6/template.html",
            controller: "Scenario6Controller",
            controllerAs: "vm"
        }
    },
    resolve: {
        scenario6model: modelResolver
    }
}

export default state;