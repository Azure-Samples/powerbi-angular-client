import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class Controller {
    static predefinedFilter1 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
        }, "Or", 
        {
            operator: "Contains",
            value: "Direct"
        },
        {
            operator: "None",
            value: "x"
        }
    );
    static predefinedFilter2 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
        }, "Or", 
        {
            operator: "Contains",
            value: "Wash"
        },
        {
            operator: "Contains",
            value: "Park"
        }
    );
    static predefinedFilter3 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
        }, "Or", 
        {
            operator: "Contains",
            value: "Wash"
        },
        {
            operator: "Contains",
            value: "Park"
        }
    );
    $q: ng.IQService;
    $scope: ng.IScope;

    embedConfiguration: pbi.IEmbedConfiguration;
    report: pbi.Report;
    reportPages: pbi.Page[];
    selectedRemoveFiltersPage: pbi.Page;
    title: string;

    static $inject = [
        '$q',
        '$scope',
        'scenario4model',
        'PowerBiService'
    ];
    
    constructor(
      $q: ng.IQService,
      $scope: ng.IScope,
      embedConfiguration: pbi.IEmbedConfiguration,
      powerBiService: pbi.service.Service
    ) {
        this.$q = $q;
        this.$scope = $scope;

        this.title = 'Scenario 4';

        this.embedConfiguration = angular.extend(embedConfiguration, {
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true
            }
        });
    }

    onEmbedded(report: pbi.Report) {
        this.report = report;

        report.on('loaded', event => {
            console.log('report loaded');
            report.getPages()
                .then(pages => {
                    this.$scope.$apply(() => {
                        this.reportPages = pages;
                        this.selectedRemoveFiltersPage = this.reportPages[0];
                    });
                });
        });
    }

    onFilterAdded(filter: pbi.models.IBasicFilter | pbi.models.IAdvancedFilter, filterable: pbi.IFilterable) {
        console.log('onFilterAdded');
        console.log(filter, filterable);
        
        filterable.setFilters([filter]);
    }

    removeReportFiltersClicked() {
        console.log('removeReportFilters');
        this.report.removeFilters();
    }

    removePageFiltersClicked(page: pbi.Page) {
        console.log('removePagefiltes', page);
        page.removeFilters();
    }

    removeVisualFiltersClicked(visual: pbi.Visual) {
        console.log('removeVisualFilters', visual);
        // TODO: Need to return page name in order to properly reference visual
        visual.removeFilters();
    }

    predefinedFilter1Clicked() {
        this.report.setFilters([Controller.predefinedFilter1.toJSON()]);
    }

    predefinedFilter2Clicked() {
        this.report.setFilters([Controller.predefinedFilter2.toJSON()]);
    }

    predefinedFIlter3Clicked() {
        this.report.page('ReportSection2').setFilters([Controller.predefinedFilter3.toJSON()]);
    }
}