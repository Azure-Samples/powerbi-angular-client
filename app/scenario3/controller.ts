import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class controller {
    $q: ng.IQService;
    $scope: ng.IScope;
    $interval: ng.IIntervalService;

    activePage: pbi.models.IPage;
    cycleIntervalPromise: ng.IPromise<void>;
    cycleIsEnabled = false;
    embedConfiguration: pbi.IEmbedConfiguration;
    pages: pbi.models.IPage[];
    report: pbi.Report;
    title: string;

    static $inject = [
        '$q',
        '$scope',
        '$interval',
        'scenario3model',
        'PowerBiService'
    ];
    
    constructor(
      $q: ng.IQService,
      $scope: ng.IScope,
      $interval: ng.IIntervalService,
      embedConfiguration: pbi.IEmbedConfiguration,
      powerBiService: pbi.service.Service
    ) {
        this.$q = $q;
        this.$scope = $scope;
        this.$interval = $interval;

        this.pages = [];
        this.title = 'Scenario 3';

        this.embedConfiguration = angular.extend(embedConfiguration, {
            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2NzkyODE1NywiZXhwIjoxNDY3OTMxNzU3fQ.L6CV_W22is_TtFRRPvop94i6tgGQoKweOD8hcX9ROMc',
            settings: {
                navContentPaneEnabled: false
            }
        });
    }

    cyclePageClicked() {
        console.log(`cyclePageClicked`);
        this.toggleCycle();
    }

    nextPageClicked() {
        console.log(`nextPageClicked`);
        this.changePage(true);
    }

    pageClicked(page: pbi.models.IPage) {
        this.report.setPage(page.name);
    }

    previousPageClicked() {
        console.log(`previousPageClicked`);
        this.changePage(false);
    }

    onEmbedded(report: pbi.Report) {
        console.log(`Report embedded: `, report);
        this.report = report;

        report.on<any>('loaded', event => {
            report.getPages()
                .then(pages => {
                    this.$scope.$apply(() => {
                        this.pages = pages;
                        if(pages.length > 0) {
                            this.activePage = pages[0];
                        }
                    });
                });
        });

        report.on<{ newPage: pbi.models.IPage }>('pageChanged', event => {
            const page = event.detail.newPage;
            this.$scope.$apply(() => {
                this.updateActivePage(page);
            });
        });
    }

    updateActivePage(newPage: pbi.models.IPage) {
        this.activePage = newPage;
    }

    private changePage(forwards: boolean = false) {
        let activePageIndex = -1;
    	this.pages
            .some((page, i) => {
                if(page.name === this.activePage.name) {
                    activePageIndex = i;
                    return true;
                }
            });

        if(forwards) {
            activePageIndex += 1;
        }
        else {
        activePageIndex -= 1;
        }

        if(activePageIndex > this.pages.length - 1) {
            activePageIndex = 0;
        }
        if(activePageIndex < 0) {
            activePageIndex = this.pages.length - 1;
        }

        this.pages
            .some((page, i) => {
                if(activePageIndex === i) {
                    this.report.setPage(page.name);
                    return true;
                }
            });
    }

    private toggleCycle() {
        if(this.cycleIsEnabled) {
            this.cycleIsEnabled = false;
            this.$interval.cancel(this.cycleIntervalPromise);
        }
        else {
            this.cycleIsEnabled = true;
            this.cycleIntervalPromise = this.$interval(() => {
                console.log('interval called');
                this.changePage(true);
            }, 2000);
        }
    }
}