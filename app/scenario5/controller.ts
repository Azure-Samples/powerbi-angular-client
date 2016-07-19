import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class controller {
    $q: ng.IQService;
    $scope: ng.IScope;

    embedConfiguration: pbi.IEmbedConfiguration;
    report: pbi.Report;
    title: string;

    static $inject = [
        '$q',
        '$scope',
        'scenario5model'
    ];
    
    constructor(
      $q: ng.IQService,
      $scope: ng.IScope,
      embedConfiguration: pbi.IEmbedConfiguration
    ) {
        this.$q = $q;
        this.$scope = $scope;

        this.title = 'Scenario 5';
        const filter = new pbi.models.AdvancedFilter({
            table: "Store",
            column: "Name"
          }, "Or", {
            operator: "Contains",
            value: "Wash"
          },
          {
            operator: "Contains",
            value: "Park"
          });

        this.embedConfiguration = angular.extend(embedConfiguration, {
            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo',
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true
            },
            page: 'ReportSection2',
            filter
        });
    }
}