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
            .then(embedConfiguration => {
                this.report = angular.extend(embedConfiguration, {
                    embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
                    id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
                    accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo'
                });
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