import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
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