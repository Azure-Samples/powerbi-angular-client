import * as pbi from 'powerbi-client';

export class ReportsService {
    $http: ng.IHttpService
    baseUrl: string;

    static $inject = [
        '$http'
    ];

    constructor($http: ng.IHttpService, baseUrl: string) {
        this.$http = $http;
        this.baseUrl = baseUrl;
    }

    findAll(): ng.IPromise<pbi.IEmbedConfiguration[]> {
        return this.$http.get(`${this.baseUrl}/api/reports`)
            .then(response => response.data)
            .then((reports: pbi.IEmbedConfiguration[]) => reports.map(this.normalizeReport))
            ;
    }

    findById(id: string, dxt: boolean = false): ng.IPromise<pbi.IEmbedConfiguration> {
        const url = dxt ? `${this.baseUrl}/api/dxt/reports/${id}` : `${this.baseUrl}/api/reports/${id}`;

        return this.$http.get(url)
            .then(response => response.data)
            .then(this.normalizeReport)
            ;
    }

    findByName(search: string): ng.IPromise<pbi.IEmbedConfiguration[]> {
        return this.$http.get(`${this.baseUrl}/api/reports?query=${search}`)
            .then(response => response.data)
            .then((reports: pbi.IEmbedConfiguration[]) => reports.map(this.normalizeReport))
            ;
    }

    private normalizeReport(report: pbi.IEmbedConfiguration) {
        report.type = "report";
        return report;
    }
}

export default function ReportsServiceProvider() {
    var baseUrl = '';

    return {
        setBaseUrl(url: string) {
            baseUrl = url;
        },

        $get: ['$http', function ($http: ng.IHttpService) {
            return new ReportsService($http, baseUrl);
        }]
    };
}
