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
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true
            },
            pageName: 'ReportSection2',
            filter
        });
    }
}