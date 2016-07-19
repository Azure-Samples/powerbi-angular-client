import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class controller {
    $q: ng.IQService;
    $scope: ng.IScope;

    embedConfiguration: pbi.IEmbedConfiguration;
    report: pbi.Report;
    title: string;
    filterPaneEnabled: boolean = false;
    navContentPaneEnabled: boolean = false;

    static $inject = [
        '$q',
        '$scope',
        'scenario6model'
    ];
    
    constructor(
      $q: ng.IQService,
      $scope: ng.IScope,
      embedConfiguration: pbi.IEmbedConfiguration
    ) {
        this.$q = $q;
        this.$scope = $scope;

        this.title = 'Scenario 6';
        this.embedConfiguration = angular.extend(embedConfiguration, {
            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?unmin=false',
            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODk2MDQ4NywiZXhwIjoxNDY4OTY0MDg3fQ.pKPa21LKUESwd5gFu4P-zheW-XaACqEL8peEcrmmpPI',
            settings: {
                filterPaneEnabled: this.filterPaneEnabled,
                navContentPaneEnabled: this.navContentPaneEnabled
            }
        });
    }

    onEmbedded(report: pbi.Report) {
      console.log('embedded settings report');
      this.report = report;
    }

    toggleFilterPaneClicked() {
      console.log('toggleFilterPaneClicked');
      this.filterPaneEnabled = !this.filterPaneEnabled;
      this.report.updateSettings({
        filterPaneEnabled: this.filterPaneEnabled
      });
    }

    toggleNavContentPaneClicked() {
      console.log('toggleNavContentPaneClicked');
      this.navContentPaneEnabled = !this.navContentPaneEnabled;
      this.report.updateSettings({
        navContentPaneEnabled: this.navContentPaneEnabled
      });
    }
}