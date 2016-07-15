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
	var component_1 = __webpack_require__(20);
	var component_2 = __webpack_require__(21);
	// Config
	config['$inject'] = ["$stateProvider", "$urlRouterProvider", "ReportsServiceProvider"];
	function config($stateProvider, $urlRouterProvider, ReportsServiceProvider) {
	    ReportsServiceProvider.setBaseUrl('http://powerbipaasapi.azurewebsites.net/');
	    $urlRouterProvider.otherwise('/scenario1');
	    $stateProvider.state(module_1.route);
	    $stateProvider.state(module_2.route);
	    $stateProvider.state(module_3.route);
	    $stateProvider.state(module_4.route);
	    $stateProvider.state(module_5.route);
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
	    ReportsService.prototype.findById = function (id) {
	        return this.$http.get(this.baseUrl + "/api/reports/" + id)
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
	        this.model = angular.extend(model, {
	            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo'
	        });
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
	    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
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
	            _this.report = angular.extend(embedConfiguration, {
	                embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	                id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	                accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo'
	            });
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
	            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo',
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
	        this.report.setPage(page.name);
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
	                _this.report.setPage(page.name);
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
	    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
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
	var controller = (function () {
	    function controller($q, $scope, embedConfiguration, powerBiService) {
	        this.$q = $q;
	        this.$scope = $scope;
	        this.title = 'Scenario 4';
	        this.embedConfiguration = angular.extend(embedConfiguration, {
	            embedUrl: 'https://portal.analysis.windows-int.net/appTokenReportEmbed?reportId=c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            id: 'c4d31ef0-7b34-4d80-9bcb-5974d1405572',
	            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ2ZXIiOiIwLjEuMCIsImF1ZCI6Imh0dHBzOi8vYW5hbHlzaXMud2luZG93cy5uZXQvcG93ZXJiaS9hcGkiLCJpc3MiOiJQb3dlckJJU0RLIiwidHlwZSI6ImVtYmVkIiwid2NuIjoiV2FsbGFjZSIsIndpZCI6IjUyMWNkYTJhLTRlZDItNDg5Ni1hYzA0LWM5YzM4MWRjMjUyYSIsInJpZCI6ImM0ZDMxZWYwLTdiMzQtNGQ4MC05YmNiLTU5NzRkMTQwNTU3MiIsIm5iZiI6MTQ2ODYxNDU3OCwiZXhwIjoxNDY4NjE4MTc4fQ.EGRUaXLAPSGssB7GG7UaEPO-lgxy6WlEvGhMRcIN3Yo',
	            settings: {
	                filterPaneEnabled: false,
	                navContentPaneEnabled: true
	            }
	        });
	    }
	    controller.prototype.onEmbedded = function (report) {
	        var _this = this;
	        this.report = report;
	        report.on('loaded', function (event) {
	            console.log('report loaded');
	            report.getPages()
	                .then(function (pages) {
	                _this.$scope.$apply(function () {
	                    _this.reportPages = pages;
	                    _this.selectedRemoveAllFilterPage = _this.reportPages[0];
	                });
	            });
	        });
	    };
	    controller.prototype.onFilterAdded = function (filter, target) {
	        console.log('onFilterAdded');
	        console.log(filter, target);
	        this.report.addFilter(filter, target);
	    };
	    controller.prototype.removeAllReportFiltersClicked = function () {
	        console.log('removeallreportfilters');
	        this.report.removeAllFilters();
	    };
	    controller.prototype.removeAllPageFiltersClicked = function (page) {
	        var target = {
	            type: "page",
	            name: page.name
	        };
	        console.log('removeAllpagefiltes', page);
	        this.report.removeAllFilters(target);
	    };
	    controller.prototype.removeAllVisualFiltersClicked = function (visualId) {
	        var target = {
	            type: "visual",
	            id: visualId
	        };
	        console.log('removeAllVisualFilters', visualId);
	        this.report.removeAllFilters(target);
	    };
	    controller.prototype.predefinedFilter1Clicked = function () {
	        var predefinedFilter1 = new pbi.models.AdvancedFilter({
	            table: "Store",
	            column: "Name"
	        }, "Or", {
	            operator: "Contains",
	            value: "Wash"
	        }, {
	            operator: "Contains",
	            value: "Park"
	        });
	        this.report.addFilter(predefinedFilter1.toJSON());
	    };
	    controller.prototype.predefinedFilter2Clicked = function () {
	        var predefinedFilter2 = new pbi.models.AdvancedFilter({
	            table: "Store",
	            column: "Name"
	        }, "Or", {
	            operator: "Contains",
	            value: "Wash"
	        }, {
	            operator: "Contains",
	            value: "Park"
	        });
	        this.report.addFilter(predefinedFilter2.toJSON());
	    };
	    controller.prototype.predefinedFIlter3Clicked = function () {
	        var predefinedFilter3 = new pbi.models.AdvancedFilter({
	            table: "Store",
	            column: "Name"
	        }, "Or", {
	            operator: "Contains",
	            value: "Wash"
	        }, {
	            operator: "Contains",
	            value: "Park"
	        });
	        var predefinedTarget3 = {
	            type: "page",
	            name: "ReportSection2"
	        };
	        this.report.addFilter(predefinedFilter3.toJSON(), predefinedTarget3);
	    };
	    controller.$inject = [
	        '$q',
	        '$scope',
	        'scenario4model',
	        'PowerBiService'
	    ];
	    return controller;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = controller;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = window['powerbi-client'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var modelResolver = function (ReportsService) {
	    return ReportsService.findById('5dac7a4a-4452-46b3-99f6-a25915e0fe55');
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
/* 21 */
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
	    }
	    Controller.prototype.onSubmit = function () {
	        console.log('submit');
	        var data = {
	            target: this.getFilterTypeTarget(),
	            operator: this.getFilterOperatorAndValues(),
	            reportTarget: this.getReportTarget()
	        };
	        var filter;
	        if (data.operator.type === "Basic") {
	            filter = new pbi.models.BasicFilter(data.target, data.operator.operator, data.operator.values);
	        }
	        else if (data.operator.type === "Advanced") {
	            filter = new pbi.models.AdvancedFilter(data.target, data.operator.operator, data.operator.values);
	        }
	        var target;
	        if ((data.reportTarget.type === "page")
	            || (data.reportTarget.type === "visual")) {
	            target = data.reportTarget;
	        }
	        this.onAddFilter({ $filter: filter.toJSON(), $target: target });
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
	            operatorAndValues.logicalOperator = this.selectedLogicalOperator;
	            operatorAndValues.conditions = [
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
	    Controller.prototype.getReportTarget = function () {
	        var target = {
	            type: this.selectedReportTarget.toLowerCase()
	        };
	        if (this.selectedReportTarget === "Page") {
	            target.name = this.selectedPage.name;
	        }
	        else if (this.selectedReportTarget === "Visual") {
	            target.id = undefined; // Need way to populate visual ids
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
	            onAddFilter: "&"
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