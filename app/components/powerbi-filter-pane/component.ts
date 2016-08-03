import * as pbi from 'powerbi-client';

export class Controller {
  private $scope: ng.IScope;
  onAddFilter: Function;

  report: pbi.Report;
  reportTargets: string[] = [
    "Report",
    "Page",
    "Visual"
  ];
  pages: pbi.Page[];
  selectedPage: pbi.Page;
  selectedReportTarget: string = this.reportTargets[0];

  targetTypes: string[] = [
    'Column',
    'Hierarchy',
    'Measure'
  ];
  selectedTargetType: string = this.targetTypes[0];

  filterTypes: string[] = [
    'Basic',
    'Advanced'
  ]
  selectedFilterType: string = this.filterTypes[0];

  basicOperators: string[] = [
    'In',
    'NotIn'
  ];
  selectedBasicOperator: string = this.basicOperators[0];

  logicalOperators: string[] = [
    'And',
    'Or'
  ];
  selectedLogicalOperator: string = this.logicalOperators[0];

  value1: string;
  value2: string;

  conditionalOperators: string[] = [
    'None',
    'LessThan',
    'LessThanOrEqual',
    'GreaterThan',
    'GreaterThanOrEqual',
    'Contains',
    'DoesNotContain',
    'StartsWith',
    'DoesNotStartWith',
    'Is',
    'IsNot',
    'IsBlank',
    'IsNotBlank'
  ];
  valueA: string;
  conditionalOperatorA: string;
  valueB: string;
  conditionalOperatorB: string;

  table: string;
  column: string;
  hierarchy: string;
  hierarchyLevel: string;
  measure: string;

  static $inject = [
    '$scope'
  ]

  constructor(
    $scope: ng.IScope
  ) {
    this.$scope = $scope;

    this.$scope.$watch(() => this.pages, (pages, oldPages) => {
      if (pages === oldPages) {
        return;
      }

      if (Array.isArray(pages) && pages.length > 0) {
        this.selectedPage = pages[0];
      }
    });
  }

  onSubmit() {
    console.log('submit');

    const data: any = {
      target: this.getFilterTypeTarget(),
      operator: this.getFilterOperatorAndValues(),
      filterable: this.getFilterableTarget() 
    };

    let filter: pbi.models.BasicFilter | pbi.models.AdvancedFilter;

    if (data.operator.type === "Basic") {
      filter = new pbi.models.BasicFilter(data.target, data.operator.operator, data.operator.values);
    }
    else if (data.operator.type === "Advanced") {
      filter = new pbi.models.AdvancedFilter(data.target, data.operator.operator, data.operator.values);
    }

    this.onAddFilter({ $filter: filter.toJSON(), $target: data.filterable });
  }
  
  private getFilterTypeTarget() {
    const target: any = {
      table: this.table
    };

    if (this.selectedTargetType === "Column") {
      target.column = this.column;
    }
    else if (this.selectedTargetType === "Hierarchy") {
      target.hierarchy = this.hierarchy;
      target.hierarchyLevel = this.hierarchyLevel;
    }
    else if (this.selectedTargetType === "Measure") {
      target.measure = this.measure;
    }

    return target;
  }

  private getFilterOperatorAndValues() {
      const operatorAndValues: any = {
        type: this.selectedFilterType
      };

      if (this.selectedFilterType === "Basic") {
        operatorAndValues.operator = this.selectedBasicOperator;
        operatorAndValues.values = [this.value1, this.value2];
      }
      else if (this.selectedFilterType === "Advanced") {
        operatorAndValues.operator = this.selectedLogicalOperator;
        operatorAndValues.values = [
          {
            operator: this.conditionalOperatorA,
            value: this.valueA
          },
          {
            operator: this.conditionalOperatorB,
            value: this.valueB
          }
        ];
      }

      return operatorAndValues;
    }

    private getFilterableTarget() {
      var target: pbi.IFilterable = this.report;
      
      if (this.selectedReportTarget === "Page") {
        target = this.selectedPage;
      }
      else if (this.selectedReportTarget === "Visual") {
        throw new Error(`Abilty to apply filters to visuals is not implemented yet`);
      }

      return target;
    }
}

export default class Directive {
  restrict = "E";
  templateUrl = "/app/components/powerbi-filter-pane/template.html";
  scope = {
    pages: "=",
    onAddFilter: "&"
  };
  controller = Controller;
  bindToController = true;
  controllerAs = "vm";
}