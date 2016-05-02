// TODO: Fix typing information from base
interface IEmbedable {
    name: string;
    type: string;
    accessToken: string;
    embedUrl: string;
}

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
    
    findAll(): ng.IPromise<IEmbedable[]> {
        return this.$http.get(`${this.baseUrl}/api/reports`)
            .then(response => response.data)
            .then((reports: IEmbedable[]) => reports.map(this.normalizeReport))
            ;
    }
    
    findById(id: string): ng.IPromise<IEmbedable> {
        return this.$http.get(`${this.baseUrl}/api/reports/${id}`)
            .then(response => response.data)
            .then(this.normalizeReport)
            ;
    }
    
    findByName(search: string): ng.IPromise<IEmbedable[]> {
        return this.$http.get(`${this.baseUrl}/api/reports?query=${search}`)
            .then(response => response.data)
            .then((reports: IEmbedable[]) => reports.map(this.normalizeReport))
            ;
    }
    
    private normalizeReport(report: IEmbedable) {
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
    
        $get: ['$http', function ($http) {
            return new ReportsService($http, baseUrl);
        }]
    };
}
