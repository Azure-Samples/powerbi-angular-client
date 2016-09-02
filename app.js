/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var angular = __webpack_require__(1);
	// Services
	var reports_1 = __webpack_require__(2);
	var utilities_1 = __webpack_require__(3);
	// Pods
	var module_1 = __webpack_require__(4);
	var module_2 = __webpack_require__(7);
	var module_3 = __webpack_require__(10);
	var module_4 = __webpack_require__(13);
	var module_5 = __webpack_require__(16);
	var module_6 = __webpack_require__(20);
	var module_7 = __webpack_require__(23);
	var component_1 = __webpack_require__(26);
	var component_2 = __webpack_require__(27);
	// Config
	config['$inject'] = ["$stateProvider", "$urlRouterProvider", "ReportsServiceProvider"];
	function config($stateProvider, $urlRouterProvider, ReportsServiceProvider) {
	    ReportsServiceProvider.setBaseUrl('https://powerbiembedapi.azurewebsites.net');
	    $urlRouterProvider.otherwise('/scenario1');
	    $stateProvider.state(module_1.route);
	    $stateProvider.state(module_2.route);
	    $stateProvider.state(module_3.route);
	    $stateProvider.state(module_4.route);
	    $stateProvider.state(module_5.route);
	    $stateProvider.state(module_6.route);
	    $stateProvider.state(module_7.route);
	}
	angular
	    .module('app', [
	    'ui.router',
	    'powerbi'
	])
	    .provider('ReportsService', reports_1.default)
	    .service('Utilities', utilities_1.default)
	    .controller('ApplicationController', module_1.controller)
	    .controller('Scenario1Controller', module_2.controller)
	    .controller('Scenario2Controller', module_3.controller)
	    .controller('Scenario3Controller', module_4.controller)
	    .controller('Scenario4Controller', module_5.controller)
	    .controller('Scenario5Controller', module_6.controller)
	    .controller('Scenario6Controller', module_7.controller)
	    .directive('powerbiPageNavigation', function () { return new component_1.default(); })
	    .directive('powerbiFilterPane', function () { return new component_2.default(); })
	    .config(config);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var ReportsService = (function () {
	    function ReportsService($http, baseUrl) {
	        this.$http = $http;
	        this.baseUrl = baseUrl;
	    }
	    ReportsService.prototype.findAll = function () {
	        var _this = this;
	        return this.$http.get(this.baseUrl + "/api/reports")
	            .then(function (response) { return response.data; })
	            .then(function (reports) { return reports.map(_this.normalizeReport); });
	    };
	    ReportsService.prototype.findById = function (id, dxt) {
	        if (dxt === void 0) { dxt = false; }
	        var url = dxt ? this.baseUrl + "/api/dxt/reports/" + id : this.baseUrl + "/api/reports/" + id;
	        return this.$http.get(url)
	            .then(function (response) { return response.data; })
	            .then(this.normalizeReport);
	    };
	    ReportsService.prototype.findByName = function (search) {
	        var _this = this;
	        return this.$http.get(this.baseUrl + "/api/reports?query=" + search)
	            .then(function (response) { return response.data; })
	            .then(function (reports) { return reports.map(_this.normalizeReport); });
	    };
	    ReportsService.prototype.normalizeReport = function (report) {
	        report.type = "report";
	        return report;
	    };
	    ReportsService.$inject = [
	        '$http'
	    ];
	    return ReportsService;
	}());
	exports.ReportsService = ReportsService;
	function ReportsServiceProvider() {
	    var baseUrl = '';
	    return {
	        setBaseUrl: function (url) {
	            baseUrl = url;
	        },
	        $get: ['$http', function ($http) {
	                return new ReportsService($http, baseUrl);
	            }]
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = ReportsServiceProvider;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	var Utilities = (function () {
	    function Utilities($timeout) {
	        this.$timeout = $timeout;
	    }
	    Utilities.prototype.debounce = function (func, wait) {
	        var _this = this;
	        var previousTimeoutPromise;
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            if (previousTimeoutPromise) {
	                _this.$timeout.cancel(previousTimeoutPromise);
	            }
	            previousTimeoutPromise = _this.$timeout(function () { return func.apply(void 0, args); }, wait);
	        };
	    };
	    Utilities.$inject = [
	        '$timeout'
	    ];
	    return Utilities;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Utilities;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(5);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(6);
	exports.route = route_1.default;


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var controller = (function () {
	    function controller($scope) {
	    }
	    controller.$inject = [
	        '$scope'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	var state = {
	    name: "application",
	    abstract: true,
	    templateUrl: "/app/application/template.html",
	    controller: "ApplicationController",
	    controllerAs: "vm"
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(8);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(9);
	exports.route = route_1.default;


/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	var controller = (function () {
	    function controller(model) {
	        this.model = model;
	        this.title = 'Scenario 1';
	    }
	    controller.$inject = [
	        'scenario1model'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
	};
	modelResolver["$inject"] = ['ReportsService'];
	var state = {
	    name: "application.scenario1",
	    parent: "application",
	    url: "^/scenario1",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario1/template.html",
	            controller: "Scenario1Controller",
	            controllerAs: "vm"
	        }
	    },
	    resolve: {
	        scenario1model: modelResolver
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(11);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(12);
	exports.route = route_1.default;


/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";
	var controller = (function () {
	    function controller($q, $scope, ReportsService, Utilities) {
	        var _this = this;
	        this.$q = $q;
	        this.ReportsService = ReportsService;
	        this.title = 'Scenario 2';
	        this.reports = [];
	        var debouncedSearchInput = Utilities.debounce(this.searchInputDidChange.bind(this), 500);
	        $scope.$watch(function () { return _this.searchInput; }, function (searchInput, oldInput) {
	            // Guard against initializer
	            if (searchInput === oldInput) {
	                return;
	            }
	            debouncedSearchInput(searchInput);
	        });
	    }
	    controller.prototype.embedReport = function (report) {
	        var _this = this;
	        var reportPromise = new this.$q(function (resolve, reject) {
	            if (!report.accessToken) {
	                resolve(_this.ReportsService.findById(report.id));
	            }
	            else {
	                resolve(report);
	            }
	        });
	        reportPromise
	            .then(function (embedConfiguration) {
	            _this.report = embedConfiguration;
	        });
	    };
	    controller.prototype.resetClicked = function () {
	        this.report = null;
	    };
	    controller.prototype.searchInputDidChange = function (input) {
	        var _this = this;
	        this.ReportsService.findByName(input)
	            .then(function (reports) {
	            _this.reports = reports;
	        });
	    };
	    controller.prototype.showAllClicked = function () {
	        var _this = this;
	        this.ReportsService.findAll()
	            .then(function (reports) {
	            _this.reports = reports;
	        });
	    };
	    controller.$inject = [
	        '$q',
	        '$scope',
	        'ReportsService',
	        'Utilities'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	var state = {
	    name: "application.scenario2",
	    parent: "application",
	    url: "^/scenario2",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario2/template.html",
	            controller: "Scenario2Controller",
	            controllerAs: "vm"
	        }
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(14);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(15);
	exports.route = route_1.default;


/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	var controller = (function () {
	    function controller($q, $scope, $interval, embedConfiguration, powerBiService) {
	        this.cycleIsEnabled = false;
	        this.$q = $q;
	        this.$scope = $scope;
	        this.$interval = $interval;
	        this.pages = [];
	        this.title = 'Scenario 3';
	        this.embedConfiguration = angular.extend(embedConfiguration, {
	            settings: {
	                navContentPaneEnabled: false
	            }
	        });
	    }
	    controller.prototype.cyclePageClicked = function () {
	        console.log("cyclePageClicked");
	        this.toggleCycle();
	    };
	    controller.prototype.nextPageClicked = function () {
	        console.log("nextPageClicked");
	        this.changePage(true);
	    };
	    controller.prototype.pageClicked = function (page) {
	        page.setActive();
	    };
	    controller.prototype.previousPageClicked = function () {
	        console.log("previousPageClicked");
	        this.changePage(false);
	    };
	    controller.prototype.onEmbedded = function (report) {
	        var _this = this;
	        console.log("Report embedded: ", report);
	        this.report = report;
	        report.on('loaded', function (event) {
	            report.getPages()
	                .then(function (pages) {
	                _this.$scope.$apply(function () {
	                    _this.pages = pages;
	                    if (pages.length > 0) {
	                        _this.activePage = pages[0];
	                    }
	                });
	            });
	        });
	        report.on('pageChanged', function (event) {
	            var page = event.detail.newPage;
	            _this.$scope.$apply(function () {
	                _this.updateActivePage(page);
	            });
	        });
	    };
	    controller.prototype.updateActivePage = function (newPage) {
	        this.activePage = newPage;
	    };
	    controller.prototype.changePage = function (forwards) {
	        var _this = this;
	        if (forwards === void 0) { forwards = false; }
	        var activePageIndex = -1;
	        this.pages
	            .some(function (page, i) {
	            if (page.name === _this.activePage.name) {
	                activePageIndex = i;
	                return true;
	            }
	        });
	        if (forwards) {
	            activePageIndex += 1;
	        }
	        else {
	            activePageIndex -= 1;
	        }
	        if (activePageIndex > this.pages.length - 1) {
	            activePageIndex = 0;
	        }
	        if (activePageIndex < 0) {
	            activePageIndex = this.pages.length - 1;
	        }
	        this.pages
	            .some(function (page, i) {
	            if (activePageIndex === i) {
	                page.setActive();
	                return true;
	            }
	        });
	    };
	    controller.prototype.toggleCycle = function () {
	        var _this = this;
	        if (this.cycleIsEnabled) {
	            this.cycleIsEnabled = false;
	            this.$interval.cancel(this.cycleIntervalPromise);
	        }
	        else {
	            this.cycleIsEnabled = true;
	            this.cycleIntervalPromise = this.$interval(function () {
	                console.log('interval called');
	                _this.changePage(true);
	            }, 2000);
	        }
	    };
	    controller.$inject = [
	        '$q',
	        '$scope',
	        '$interval',
	        'scenario3model',
	        'PowerBiService'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
	};
	modelResolver["$inject"] = ['ReportsService'];
	var state = {
	    name: "application.scenario3",
	    parent: "application",
	    url: "^/scenario3",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario3/template.html",
	            controller: "Scenario3Controller",
	            controllerAs: "vm"
	        }
	    },
	    resolve: {
	        scenario3model: modelResolver
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(17);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(19);
	exports.route = route_1.default;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pbi = __webpack_require__(18);
	var Controller = (function () {
	    function Controller($q, $scope, embedConfiguration, powerBiService) {
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
	    Controller.prototype.onEmbedded = function (report) {
	        var _this = this;
	        this.report = report;
	        report.on('loaded', function (event) {
	            console.log('report loaded');
	            report.getPages()
	                .then(function (pages) {
	                _this.$scope.$apply(function () {
	                    _this.reportPages = pages;
	                    _this.selectedRemoveFiltersPage = _this.reportPages[0];
	                });
	            });
	        });
	    };
	    Controller.prototype.onFilterAdded = function (filter, filterable) {
	        console.log('onFilterAdded');
	        console.log(filter, filterable);
	        filterable.setFilters([filter]);
	    };
	    Controller.prototype.onRefreshFilters = function () {
	        var _this = this;
	        console.log('onRefreshFilters');
	        this.report.getFilters()
	            .then(function (filters) {
	            _this.$scope.$apply(function () {
	                _this.filtersNode.filters = filters;
	            });
	        });
	        var pageNodePromises = this.reportPages
	            .map(function (page) {
	            return page.getFilters()
	                .then(function (filters) {
	                var node;
	                var filteredNodes = _this.filtersNode.nodes.filter(function (node) { return node.name === page.name; });
	                if (filteredNodes.length === 1) {
	                    node = filteredNodes[0];
	                    node.filters = filters;
	                }
	                else {
	                    var newNode = {
	                        name: page.name,
	                        filterable: null,
	                        filters: filters,
	                        nodes: []
	                    };
	                    _this.filtersNode.nodes.push(newNode);
	                }
	            });
	        });
	        Promise.all(pageNodePromises)
	            .then(function () {
	            _this.$scope.$apply(function () { });
	        });
	    };
	    Controller.prototype.onRemoveFilter = function (filterToRemove, filterableName) {
	        var _this = this;
	        console.log(filterToRemove, filterableName);
	        var promise;
	        var filterable;
	        var filtersNode;
	        if (!filterableName) {
	            filterable = this.report;
	            filtersNode = this.filtersNode;
	        }
	        else {
	            var filteredPages_1 = this.reportPages.filter(function (page) { return page.name === filterableName; });
	            if (filteredPages_1.length !== 1) {
	                throw new Error("Could not find filterable object matching name: " + filterableName + ".  There is likely a problem with how the filterableName is being assigned in event.");
	            }
	            filterable = filteredPages_1[0];
	            var filteredNodes = this.filtersNode.nodes.filter(function (node) { return node.name === filteredPages_1[0].name; });
	            if (filteredNodes.length !== 1) {
	                throw new Error("Could not find node matching name: " + filteredPages_1[0].name + ".");
	            }
	            filtersNode = filteredNodes[0];
	        }
	        return filterable.getFilters()
	            .then(function (filters) {
	            var index = -1;
	            filters.some(function (filter, i) {
	                if (_this.areFiltersEqual(filter, filterToRemove)) {
	                    index = i;
	                    return true;
	                }
	            });
	            if (index !== -1) {
	                filters.splice(index, 1);
	                return filterable.setFilters(filters)
	                    .then(function () {
	                    _this.$scope.$apply(function () {
	                        filtersNode.filters = filters;
	                    });
	                });
	            }
	            return Promise.reject(new Error('Could not find filter'));
	        });
	    };
	    Controller.prototype.removeReportFiltersClicked = function () {
	        console.log('removeReportFilters');
	        this.report.removeFilters();
	    };
	    Controller.prototype.removePageFiltersClicked = function (page) {
	        console.log('removePagefiltes', page);
	        page.removeFilters();
	    };
	    Controller.prototype.removeVisualFiltersClicked = function (visual) {
	        console.log('removeVisualFilters', visual);
	        // TODO: Need to return page name in order to properly reference visual
	        visual.removeFilters();
	    };
	    Controller.prototype.predefinedFilter1Clicked = function () {
	        this.report.setFilters([Controller.predefinedFilter1.toJSON()]);
	    };
	    Controller.prototype.predefinedFilter2Clicked = function () {
	        this.report.setFilters([Controller.predefinedFilter2.toJSON()]);
	    };
	    Controller.prototype.predefinedFIlter3Clicked = function () {
	        this.report.page('ReportSection2').setFilters([Controller.predefinedFilter3.toJSON()]);
	    };
	    Controller.prototype.areFiltersEqual = function (filterA, filterB) {
	        var filterAType = pbi.models.getFilterType(filterA);
	        var filterATarget = filterA.target;
	        var advancedFilterA;
	        var basicFilterA;
	        var filterBType = pbi.models.getFilterType(filterB);
	        var filterBTarget = filterB.target;
	        var advancedFilterB;
	        var basicFilterB;
	        if (filterAType === pbi.models.FilterType.Advanced) {
	            advancedFilterA = filterA;
	        }
	        else if (filterAType === pbi.models.FilterType.Basic) {
	            basicFilterA = filterA;
	        }
	        if (filterBType === pbi.models.FilterType.Advanced) {
	            advancedFilterB = filterB;
	        }
	        else if (filterBType === pbi.models.FilterType.Basic) {
	            basicFilterB = filterB;
	        }
	        var areTargetsEqual = filterATarget.table === filterBTarget.table
	            && filterATarget.column === filterBTarget.column
	            && filterATarget.hierarchy === filterBTarget.hierarchy
	            && filterATarget.hierarchyLevel === filterBTarget.hierarchyLevel
	            && filterATarget.measure === filterBTarget.measure;
	        if (!areTargetsEqual) {
	            return false;
	        }
	        if (advancedFilterA && advancedFilterB) {
	            return advancedFilterA.logicalOperator === advancedFilterB.logicalOperator
	                && advancedFilterA.conditions.every(function (condition) {
	                    return advancedFilterB.conditions.some(function (conditionB) {
	                        return condition.operator === conditionB.operator
	                            && condition.value === conditionB.value;
	                    });
	                });
	        }
	        else if (basicFilterA && basicFilterB) {
	            return basicFilterA.operator === basicFilterB.operator
	                && basicFilterA.values.every(function (value) {
	                    return basicFilterB.values.some(function (valueB) { return valueB === value; });
	                });
	        }
	        return false;
	    };
	    Controller.predefinedFilter1 = new pbi.models.AdvancedFilter({
	        table: "Store",
	        column: "Name"
	    }, "Or", {
	        operator: "Contains",
	        value: "Direct"
	    }, {
	        operator: "None",
	        value: "x"
	    });
	    Controller.predefinedFilter2 = new pbi.models.AdvancedFilter({
	        table: "Store",
	        column: "Name"
	    }, "Or", {
	        operator: "Contains",
	        value: "Wash"
	    }, {
	        operator: "Contains",
	        value: "Park"
	    });
	    Controller.predefinedFilter3 = new pbi.models.AdvancedFilter({
	        table: "Store",
	        column: "Name"
	    }, "Or", {
	        operator: "Contains",
	        value: "Wash"
	    }, {
	        operator: "Contains",
	        value: "Park"
	    });
	    Controller.$inject = [
	        '$q',
	        '$scope',
	        'scenario4model',
	        'PowerBiService'
	    ];
	    return Controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Controller;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = window['powerbi-client'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
	};
	modelResolver["$inject"] = ['ReportsService'];
	var state = {
	    name: "application.scenario4",
	    parent: "application",
	    url: "^/scenario4",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario4/template.html",
	            controller: "Scenario4Controller",
	            controllerAs: "vm"
	        }
	    },
	    resolve: {
	        scenario4model: modelResolver
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(21);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(22);
	exports.route = route_1.default;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pbi = __webpack_require__(18);
	var controller = (function () {
	    function controller($q, $scope, embedConfiguration) {
	        this.$q = $q;
	        this.$scope = $scope;
	        this.title = 'Scenario 5';
	        var filter = new pbi.models.AdvancedFilter({
	            table: "Store",
	            column: "Name"
	        }, "Or", {
	            operator: "Contains",
	            value: "Wash"
	        }, {
	            operator: "Contains",
	            value: "Park"
	        });
	        this.embedConfiguration = angular.extend(embedConfiguration, {
	            settings: {
	                filterPaneEnabled: false,
	                navContentPaneEnabled: true
	            },
	            pageName: 'ReportSection2',
	            filter: filter
	        });
	    }
	    controller.$inject = [
	        '$q',
	        '$scope',
	        'scenario5model'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 22 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('c52af8ab-0468-4165-92af-dc39858d66ad');
	};
	modelResolver["$inject"] = ['ReportsService'];
	var state = {
	    name: "application.scenario5",
	    parent: "application",
	    url: "^/scenario5",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario5/template.html",
	            controller: "Scenario5Controller",
	            controllerAs: "vm"
	        }
	    },
	    resolve: {
	        scenario5model: modelResolver
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var controller_1 = __webpack_require__(24);
	exports.controller = controller_1.default;
	var route_1 = __webpack_require__(25);
	exports.route = route_1.default;


/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	var controller = (function () {
	    function controller($q, $scope, embedConfiguration) {
	        this.filterPaneEnabled = false;
	        this.navContentPaneEnabled = false;
	        this.$q = $q;
	        this.$scope = $scope;
	        this.title = 'Scenario 6';
	        this.embedConfiguration = angular.extend(embedConfiguration, {
	            settings: {
	                filterPaneEnabled: this.filterPaneEnabled,
	                navContentPaneEnabled: this.navContentPaneEnabled
	            }
	        });
	    }
	    controller.prototype.onEmbedded = function (report) {
	        console.log('embedded settings report');
	        this.report = report;
	    };
	    controller.prototype.toggleFilterPaneClicked = function () {
	        console.log('toggleFilterPaneClicked');
	        this.filterPaneEnabled = !this.filterPaneEnabled;
	        this.report.updateSettings({
	            filterPaneEnabled: this.filterPaneEnabled
	        });
	    };
	    controller.prototype.toggleNavContentPaneClicked = function () {
	        console.log('toggleNavContentPaneClicked');
	        this.navContentPaneEnabled = !this.navContentPaneEnabled;
	        this.report.updateSettings({
	            navContentPaneEnabled: this.navContentPaneEnabled
	        });
	    };
	    controller.$inject = [
	        '$q',
	        '$scope',
	        'scenario6model'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('c4d31ef0-7b34-4d80-9bcb-5974d1405572', true);
	};
	modelResolver["$inject"] = ['ReportsService'];
	var state = {
	    name: "application.scenario6",
	    parent: "application",
	    url: "^/scenario6",
	    views: {
	        'main': {
	            templateUrl: "/app/scenario6/template.html",
	            controller: "Scenario6Controller",
	            controllerAs: "vm"
	        }
	    },
	    resolve: {
	        scenario6model: modelResolver
	    }
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = state;


/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	var Controller = (function () {
	    function Controller($scope) {
	        this.cycleIsEnabled = false;
	        this.$scope = $scope;
	    }
	    Controller.prototype.cyclePageClicked = function () {
	        this.cycleIsEnabled = !this.cycleIsEnabled;
	        this.onCycleClicked();
	    };
	    Controller.prototype.nextPageClicked = function () {
	        this.onNextClicked();
	    };
	    Controller.prototype.pageClicked = function (page) {
	        this.onPageClicked({ $page: page });
	    };
	    Controller.prototype.previousPageClicked = function () {
	        this.onPreviousClicked();
	    };
	    Controller.$inject = [
	        '$scope'
	    ];
	    return Controller;
	}());
	exports.Controller = Controller;
	var Directive = (function () {
	    function Directive() {
	        this.restrict = "E";
	        // template = "<div>ABC</div>";
	        this.templateUrl = "/app/components/powerbi-page-navigation/template.html";
	        this.scope = {
	            activePage: "=",
	            pages: "=",
	            onCycleClicked: "&",
	            onNextClicked: "&",
	            onPageClicked: "&",
	            onPreviousClicked: "&"
	        };
	        this.controller = Controller;
	        this.bindToController = true;
	        this.controllerAs = "vm";
	    }
	    return Directive;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Directive;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var pbi = __webpack_require__(18);
	var Controller = (function () {
	    function Controller($scope) {
	        var _this = this;
	        this.reportTargets = [
	            "Report",
	            "Page",
	            "Visual"
	        ];
	        this.selectedReportTarget = this.reportTargets[0];
	        this.targetTypes = [
	            'Column',
	            'Hierarchy',
	            'Measure'
	        ];
	        this.selectedTargetType = this.targetTypes[0];
	        this.filterTypes = [
	            'Basic',
	            'Advanced'
	        ];
	        this.selectedFilterType = this.filterTypes[0];
	        this.basicOperators = [
	            'In',
	            'NotIn'
	        ];
	        this.selectedBasicOperator = this.basicOperators[0];
	        this.logicalOperators = [
	            'And',
	            'Or'
	        ];
	        this.selectedLogicalOperator = this.logicalOperators[0];
	        this.conditionalOperators = [
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
	        this.$scope = $scope;
	        this.$scope.$watch(function () { return _this.pages; }, function (pages, oldPages) {
	            if (pages === oldPages) {
	                return;
	            }
	            if (Array.isArray(pages) && pages.length > 0) {
	                _this.selectedPage = pages[0];
	            }
	        });
	        this.$scope.$watch(function () { return _this.filtersNode; }, function (filtersNode, oldFiltersNode) {
	            if (filtersNode === oldFiltersNode) {
	                return;
	            }
	            console.log('filtersNode changed');
	        }, true);
	    }
	    Controller.prototype.onSubmit = function () {
	        console.log('submit');
	        var data = {
	            target: this.getFilterTypeTarget(),
	            operator: this.getFilterOperatorAndValues(),
	            filterable: this.getFilterableTarget()
	        };
	        var filter;
	        if (data.operator.type === "Basic") {
	            filter = new pbi.models.BasicFilter(data.target, data.operator.operator, data.operator.values);
	        }
	        else if (data.operator.type === "Advanced") {
	            filter = new pbi.models.AdvancedFilter(data.target, data.operator.operator, data.operator.values);
	        }
	        this.onAddFilter({ $filter: filter.toJSON(), $target: data.filterable });
	    };
	    Controller.prototype.refreshClicked = function () {
	        console.log('refresh');
	        this.onRefreshFilters();
	    };
	    Controller.prototype.remove = function (filter, filterableName) {
	        console.log('remove');
	        this.onRemoveFilter({
	            $filter: filter,
	            $filterableName: filterableName
	        })
	            .then(function () {
	            console.log('filter removed');
	        });
	    };
	    Controller.prototype.getFilterTypeTarget = function () {
	        var target = {
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
	    };
	    Controller.prototype.getFilterOperatorAndValues = function () {
	        var operatorAndValues = {
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
	    };
	    Controller.prototype.getFilterableTarget = function () {
	        var target = this.report;
	        if (this.selectedReportTarget === "Page") {
	            target = this.selectedPage;
	        }
	        else if (this.selectedReportTarget === "Visual") {
	            throw new Error("Abilty to apply filters to visuals is not implemented yet");
	        }
	        return target;
	    };
	    Controller.$inject = [
	        '$scope'
	    ];
	    return Controller;
	}());
	exports.Controller = Controller;
	var Directive = (function () {
	    function Directive() {
	        this.restrict = "E";
	        this.templateUrl = "/app/components/powerbi-filter-pane/template.html";
	        this.scope = {
	            pages: "=",
	            filtersNode: "=",
	            onAddFilter: "&",
	            onRefreshFilters: "&",
	            onRemoveFilter: "&"
	        };
	        this.controller = Controller;
	        this.bindToController = true;
	        this.controllerAs = "vm";
	    }
	    return Directive;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Directive;


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map