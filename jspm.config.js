SystemJS.config({
  transpiler: "plugin-typescript",
  packages: {
    "powerbi-sample-client-angular": {
      "main": "dist/app.js",
      "meta": {
        "*.js": {
          "loader": "plugin-typescript"
        }
      }
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "angular-powerbi": "npm:angular-powerbi@1.0.0-beta.3",
    "angular": "github:angular/bower-angular@1.5.3",
    "angular-ui-router": "github:angular-ui/ui-router@0.2.18",
    "bootstrap": "github:twbs/bootstrap@3.3.6",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.5",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {
    "npm:angular-powerbi@1.0.0-beta.3": {
      "map": {
        "angular": "npm:angular@1.5.5",
        "powerbi-client": "npm:powerbi-client@2.0.0-beta.4"
      }
    },
    "github:twbs/bootstrap@3.3.6": {
      "map": {
        "jquery": "github:components/jquery@2.2.1"
      }
    },
    "github:angular-ui/ui-router@0.2.18": {
      "map": {
        "angular": "github:angular/bower-angular@1.5.3"
      }
    },
    "github:frankwallis/plugin-typescript@4.0.5": {
      "map": {
        "typescript": "npm:typescript@1.8.9"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    }
  }
});
