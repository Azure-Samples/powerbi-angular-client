import * as pbi from 'powerbi-client';

export default class controller {
    model: pbi.IEmbedConfiguration
    title: string;
    
    static $inject = [
        'scenario1model'
    ];
    
    constructor(
        model: pbi.IEmbedConfiguration
    ) {
        this.model = angular.extend(model, {
            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo'
        });
        this.title = 'Scenario 1';
    }
}