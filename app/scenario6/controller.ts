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