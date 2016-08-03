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
            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ3MDI1NTU5MiwiZXhwIjoxNDcwMjU5MTkyfQ.JYA-RrbpH-HdjP_OmqZQVfkLpZp24X0gZ6q6TH7iqa8',
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