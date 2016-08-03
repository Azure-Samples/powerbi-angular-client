import * as pbi from 'powerbi-client';

export class Controller {
    private $scope: ng.IScope;
    activePage: pbi.Page;
    cycleIsEnabled = false;
    onCycleClicked: Function;
    onNextClicked: Function;
    onPageClicked: Function;
    onPreviousClicked: Function;
    pages: pbi.Page[];
    
    static $inject = [
        '$scope'
    ]
    
    constructor(
      $scope: ng.IScope
    ) {
        this.$scope = $scope;
    }

    cyclePageClicked() {
        this.cycleIsEnabled = !this.cycleIsEnabled;
        this.onCycleClicked();
    }

    nextPageClicked() {
        this.onNextClicked();
    }

    pageClicked(page: pbi.Page) {
        this.onPageClicked({ $page: page });
    }

    previousPageClicked() {
        this.onPreviousClicked();
    }
}

export default class Directive {
    restrict = "E";
    // template = "<div>ABC</div>";
    templateUrl = "/app/components/powerbi-page-navigation/template.html";
    scope = {
        activePage: "=",
        pages: "=",
        onCycleClicked: "&",
        onNextClicked: "&",
        onPageClicked: "&",
        onPreviousClicked: "&"
    };
    controller = Controller;
    bindToController = true;
    controllerAs = "vm";
}