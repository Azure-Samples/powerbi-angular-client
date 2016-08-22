import * as pbi from 'powerbi-client';
import * as angularPbi from 'angular-powerbi';

interface IFiltersNode {
    name: string;
    filterable: any;
    filters: pbi.models.IFilter[];
    nodes: IFiltersNode[];
}

export default class Controller {
    static predefinedFilter1 = new pbi.models.AdvancedFilter({
        table: "Store",
        column: "Name"
    }, "Or",
        {
            operator: "Contains",
            value: "Direct"
        },
        {
            operator: "None",
            value: "x"
        }
    );
    static predefinedFilter2 = new pbi.models.AdvancedFilter({
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
    static predefinedFilter3 = new pbi.models.AdvancedFilter({
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
    $q: ng.IQService;
    $scope: ng.IScope;

    embedConfiguration: pbi.IEmbedConfiguration;
    report: pbi.Report;
    reportPages: pbi.Page[];
    filtersNode: IFiltersNode;
    selectedRemoveFiltersPage: pbi.Page;
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
            settings: {
                filterPaneEnabled: false,
                navContentPaneEnabled: true
            }
        });

        this.filtersNode = {
            name: undefined,
            filterable: null,
            filters: [],
            nodes: []
        };
    }

    onEmbedded(report: pbi.Report) {
        this.report = report;

        report.on('loaded', event => {
            console.log('report loaded');
            report.getPages()
                .then(pages => {
                    this.$scope.$apply(() => {
                        this.reportPages = pages;
                        this.selectedRemoveFiltersPage = this.reportPages[0];
                    });
                });
        });
    }

    onFilterAdded(filter: pbi.models.IBasicFilter | pbi.models.IAdvancedFilter, filterable: pbi.IFilterable) {
        console.log('onFilterAdded');
        console.log(filter, filterable);

        filterable.setFilters([filter]);
    }

    onRefreshFilters() {
        console.log('onRefreshFilters');
        this.report.getFilters()
            .then(filters => {
                this.$scope.$apply(() => {
                    this.filtersNode.filters = filters;
                });
            });

        const pageNodePromises = this.reportPages
            .map(page => {
                return page.getFilters()
                    .then(filters => {
                        let node: IFiltersNode;
                        let filteredNodes = this.filtersNode.nodes.filter(node => node.name === page.name);
                        if (filteredNodes.length === 1) {
                            node = filteredNodes[0];
                            node.filters = filters;
                        }
                        else {
                            const newNode: IFiltersNode = {
                                name: page.name,
                                filterable: null,
                                filters,
                                nodes: []
                            };

                            this.filtersNode.nodes.push(newNode);
                        }
                    });
            });

        Promise.all(pageNodePromises)
            .then(() => {
                this.$scope.$apply(() => { });
            });
    }

    onRemoveFilter(filterToRemove: pbi.models.IAdvancedFilter | pbi.models.IBasicFilter, filterableName: string): Promise<void> {
        console.log(filterToRemove, filterableName);

        let promise: Promise<void>;
        let filterable: pbi.IFilterable;
        let filtersNode: IFiltersNode;

        if (!filterableName) {
            filterable = this.report;
            filtersNode = this.filtersNode;
        }
        else {
            let filteredPages = this.reportPages.filter(page => page.name === filterableName);
            if (filteredPages.length !== 1) {
                throw new Error(`Could not find filterable object matching name: ${filterableName}.  There is likely a problem with how the filterableName is being assigned in event.`);
            }

            filterable = filteredPages[0];

            let filteredNodes = this.filtersNode.nodes.filter(node => node.name === filteredPages[0].name);
            if (filteredNodes.length !== 1) {
                throw new Error(`Could not find node matching name: ${filteredPages[0].name}.`);
            }

            filtersNode = filteredNodes[0];
        }

        return filterable.getFilters()
            .then(filters => {
                let index = -1;
                filters.some((filter, i) => {
                    if (this.areFiltersEqual(filter, filterToRemove)) {
                        index = i;
                        return true;
                    }
                });

                if (index !== -1) {
                    filters.splice(index, 1);
                    return filterable.setFilters(filters)
                        .then(() => {
                            this.$scope.$apply(() => {
                                filtersNode.filters = filters;
                            });
                        });
                }

                return Promise.reject(new Error('Could not find filter'));
            });
    }

    removeReportFiltersClicked() {
        console.log('removeReportFilters');
        this.report.removeFilters();
    }

    removePageFiltersClicked(page: pbi.Page) {
        console.log('removePagefiltes', page);
        page.removeFilters();
    }

    removeVisualFiltersClicked(visual: pbi.Visual) {
        console.log('removeVisualFilters', visual);
        // TODO: Need to return page name in order to properly reference visual
        visual.removeFilters();
    }

    predefinedFilter1Clicked() {
        this.report.setFilters([Controller.predefinedFilter1.toJSON()]);
    }

    predefinedFilter2Clicked() {
        this.report.setFilters([Controller.predefinedFilter2.toJSON()]);
    }

    predefinedFIlter3Clicked() {
        this.report.page('ReportSection2').setFilters([Controller.predefinedFilter3.toJSON()]);
    }

    private areFiltersEqual(
        filterA: (pbi.models.IAdvancedFilter | pbi.models.IBasicFilter),
        filterB: (pbi.models.IAdvancedFilter | pbi.models.IBasicFilter)
    ) {
        let filterAType = pbi.models.getFilterType(filterA);
        let filterATarget: any = filterA.target;
        let advancedFilterA: pbi.models.IAdvancedFilter;
        let basicFilterA: pbi.models.IBasicFilter;
        let filterBType = pbi.models.getFilterType(filterB);
        let filterBTarget: any = filterB.target;
        let advancedFilterB: pbi.models.IAdvancedFilter;
        let basicFilterB: pbi.models.IBasicFilter;

        if (filterAType === pbi.models.FilterType.Advanced) {
            advancedFilterA = <pbi.models.IAdvancedFilter>filterA;
        }
        else if (filterAType === pbi.models.FilterType.Basic) {
            basicFilterA = <pbi.models.IBasicFilter>filterA;
        }

        if (filterBType === pbi.models.FilterType.Advanced) {
            advancedFilterB = <pbi.models.IAdvancedFilter>filterB;
        }
        else if (filterBType === pbi.models.FilterType.Basic) {
            basicFilterB = <pbi.models.IBasicFilter>filterB;
        }

        const areTargetsEqual = filterATarget.table === filterBTarget.table
            && filterATarget.column === filterBTarget.column
            && filterATarget.hierarchy === filterBTarget.hierarchy
            && filterATarget.hierarchyLevel === filterBTarget.hierarchyLevel
            && filterATarget.measure === filterBTarget.measure
            ;

        if (!areTargetsEqual) {
            return false;
        }

        if (advancedFilterA && advancedFilterB) {
            return advancedFilterA.logicalOperator === advancedFilterB.logicalOperator
                && advancedFilterA.conditions.every(condition => {
                    return advancedFilterB.conditions.some(conditionB => {
                        return condition.operator === conditionB.operator
                            && condition.value === conditionB.value
                            ;
                    });
                })
                ;
        }
        else if (basicFilterA && basicFilterB) {
            return basicFilterA.operator === basicFilterB.operator
                && basicFilterA.values.every(value => {
                    return basicFilterB.values.some(valueB => valueB === value)
                });
        }

        return false;
    }
}