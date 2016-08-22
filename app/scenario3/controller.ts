import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

export default class controller {
    $q: ng.IQService;
    $scope: ng.IScope;
    $interval: ng.IIntervalService;

    activePage: pbi.Page;
    cycleIntervalPromise: ng.IPromise<void>;
    cycleIsEnabled = false;
    embedConfiguration: pbi.IEmbedConfiguration;
    pages: pbi.Page[];
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

    pageClicked(page: pbi.Page) {
        page.setActive();
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
                        if (pages.length > 0) {
                            this.activePage = pages[0];
                        }
                    });
                });
        });

        report.on<{ newPage: pbi.Page }>('pageChanged', event => {
            const page = event.detail.newPage;
            this.$scope.$apply(() => {
                this.updateActivePage(page);
            });
        });
    }

    updateActivePage(newPage: pbi.Page) {
        this.activePage = newPage;
    }

    private changePage(forwards: boolean = false) {
        let activePageIndex = -1;
        this.pages
            .some((page, i) => {
                if (page.name === this.activePage.name) {
                    activePageIndex = i;
                    return true;
                }
            });

        if (forwards) {
            activePageIndex += 1;
        }
        else {
            activePageIndex -= 1;
        }

        if (activePageIndex > this.pages.length - 1) {
            activePageIndex = 0;
        }
        if (activePageIndex < 0) {
            activePageIndex = this.pages.length - 1;
        }

        this.pages
            .some((page, i) => {
                if (activePageIndex === i) {
                    page.setActive();
                    return true;
                }
            });
    }

    private toggleCycle() {
        if (this.cycleIsEnabled) {
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