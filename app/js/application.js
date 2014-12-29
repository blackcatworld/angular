define("application",[
    'angular',
    'angular-route',
    'angular-moment',
    'ui-bootstrap',
    'highcharts-ng',

    'js/controllers/applicationcontroller.js',
    'js/controllers/tabscontroller.js',
    'js/controllers/tab1controller.js',
    'js/controllers/tab2controller.js',

    'js/services/tab1service.js',
    'js/services/chartdata.js',

    'js/directives/itemdetails.js',
    'js/directives/chart.js',
    ], function(angular) {

    var applicaion = angular.module('application', ['ngRoute', 'angularMoment','ui.bootstrap', 'highcharts-ng']);
    applicaion.config(function($routeProvider, $locationProvider) {
            $routeProvider.when('/', {
            templateUrl: 'partials/home.html'
        }).when('/somepath', {
            templateUrl: 'partials/somepath.html'
        });
    });

    applicaion.constant('api_url','http://127.0.0.1:9090');
    return applicaion;
});