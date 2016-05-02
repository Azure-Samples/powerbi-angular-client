export default {
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
}