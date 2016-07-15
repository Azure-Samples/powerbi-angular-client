import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class controller {
    $q: ng.IQService;
    $scope: ng.IScope;

    embedConfiguration: pbi.IEmbedConfiguration;
    report: pbi.Report;
    reportPages: pbi.models.IPage[];
    selectedRemoveAllFilterPage: pbi.models.IPage;
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
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo',
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
                        this.selectedRemoveAllFilterPage = this.reportPages[0];
                    });
                });
        });
    }

    onFilterAdded(filter: pbi.models.IFilter, target?: pbi.models.ITarget) {
        console.log('onFilterAdded');
        console.log(filter, target);

        this.report.addFilter(filter, target);
    }

    removeAllReportFiltersClicked() {
        console.log('removeallreportfilters');
        this.report.removeAllFilters();
    }

    removeAllPageFiltersClicked(page: pbi.models.IPage) {
        var target: pbi.models.ITarget = {
            type: "page",
            name: page.name
        };
        console.log('removeAllpagefiltes', page);
        this.report.removeAllFilters(target);
    }

    removeAllVisualFiltersClicked(visualId: string) {
        var target: pbi.models.ITarget = {
            type: "visual",
            id: visualId
        };

        console.log('removeAllVisualFilters', visualId);
        this.report.removeAllFilters(target);
    }

    predefinedFilter1Clicked() {
        const predefinedFilter1 = new pbi.models.AdvancedFilter({
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

        this.report.addFilter(predefinedFilter1.toJSON());
    }

    predefinedFilter2Clicked() {
        const predefinedFilter2 = new pbi.models.AdvancedFilter({
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

        this.report.addFilter(predefinedFilter2.toJSON());
    }

    predefinedFIlter3Clicked() {
        const predefinedFilter3 = new pbi.models.AdvancedFilter({
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
        const predefinedTarget3: pbi.models.ITarget = {
            type: "page",
            name: "ReportSection2"
        };

        this.report.addFilter(predefinedFilter3.toJSON(), predefinedTarget3);
    }
}