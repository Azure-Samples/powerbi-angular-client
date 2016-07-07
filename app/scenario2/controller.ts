import { ReportsService } from '../services/reports';
import Utilities from '../services/utilities';
import * as pbi from 'powerbi-client';

export default class controller {
    $q: ng.IQService;
    report: pbi.Embed;
    ReportsService: ReportsService;
    reports: any[];
    searchInput: string;
    title: string;
    
    static $inject = [
        '$q',
        '$scope',
        'ReportsService',
        'Utilities'
    ];
    
    constructor($q: ng.IQService, $scope: ng.IScope, ReportsService: ReportsService, Utilities: Utilities) {
        this.$q = $q;
        this.ReportsService = ReportsService;
        this.title = 'Scenario 2';
        this.reports = [];
        
        const debouncedSearchInput = Utilities.debounce(this.searchInputDidChange.bind(this), 500);
         
        $scope.$watch(() => this.searchInput, (searchInput, oldInput) => {
            // Guard against initializer
            if(searchInput === oldInput) {
                return;
            }
            
            debouncedSearchInput(searchInput);
        });
    }
    
    embedReport(report: pbi.IEmbedConfiguration): void {
        const reportPromise: ng.IPromise<any> = new this.$q((resolve, reject) => {
            if(!report.accessToken) {
                resolve(this.ReportsService.findById(report.id));
            }
            else {
                resolve(report);
            }
        });
        
        reportPromise
            .then(reportWithToken => {
                angular.extend(report, reportWithToken);
                this.report = reportWithToken;
            });
    }
    
    resetClicked() {
        this.report = null;
    }
    
    searchInputDidChange(input: string): void {
        this.ReportsService.findByName(input)
            .then(reports => {
                this.reports = reports;
            });
    }
    
    showAllClicked() {
        this.ReportsService.findAll()
            .then(reports => {
            this.reports = reports;
        });
    }
}