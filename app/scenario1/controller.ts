export default class controller {
    model: PowerBi.IReport;
    title: string;
    
    static $inject = [
        'scenario1model'
    ];
    
    constructor(
        model
    ) {
        this.model = model;
        this.title = 'Scenario 1';
    }
}