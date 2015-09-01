// require.js looks for the following global when initializing
var require = {
    baseUrl: ".",
    paths: {
        "jquery":               "bower_modules/jquery/dist/jquery",
        "crossroads":           "bower_modules/crossroads/dist/crossroads.min",
        "hasher":               "bower_modules/hasher/dist/js/hasher.min",
        "knockout":             "bower_modules/knockout/dist/knockout",
        "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
        "signals":              "bower_modules/js-signals/dist/signals.min",
        "moment":               "bower_modules/moment/moment",
        "chartjs":              "bower_modules/chartjs/Chart.min",
        "text":                 "bower_modules/requirejs-text/text",
        "knockout-custom":      "other_modules/bskyb/knockout-custom",
        "semantic-ui":          "bower_modules/semantic-ui/dist/semantic.min",
        "local-store":          "other_modules/bskyb/local-store",
        "session-store":        "other_modules/bskyb/session-store"
    },
    shim: {
        "knockout-custom": { deps: ["knockout","chartjs","jquery"] },
        "semantic-ui": {deps: ["jquery"] }
    }
};