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
        this.model = model;
        this.title = 'Scenario 1';
    }
}