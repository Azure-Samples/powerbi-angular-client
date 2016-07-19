import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
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