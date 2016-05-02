import { ReportsService } from '../services/reports.js';

const modelResolver = (ReportsService: ReportsService): ng.IPromise<PowerBi.IReport> => {
    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
};
modelResolver["$inject"] = ['ReportsService'];

export default {
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