import * as pbi from 'powerbi-client';
import * as angularuirouter from 'angular-ui-router';
import { ReportsService } from '../services/reports';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<pbi.IEmbedConfiguration> => {
    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
};
modelResolver["$inject"] = ['ReportsService'];

const state: angularuirouter.IState = {
    name: "application.scenario4",
    parent: "application",
    url: "^/scenario4",
    views: {
        'main': {
            templateUrl: "/app/scenario4/template.html",
            controller: "Scenario4Controller",
            controllerAs: "vm"
        }
    },
    resolve: {
        scenario4model: modelResolver
    }
}

export default state;