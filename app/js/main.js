/*
  Please keep this here. More info here:
  https://github.com/tnajdek/angular-requirejs-seed/blob/master/app/js/main.js
*/
window.name = "NG_DEFER_BOOTSTRAP!";
window.application = 'application';

requirejs.config({
  baseUrl: './js',

  paths: {
    'jquery': '../lib/jquery.min',
    'bootstrap': '../lib/bootstrap.min',
    'angular': '../lib/angular.min',
    'angular-route': '../lib/angular-route.min',
    'moment': '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min',
    //'moment' : '../lib/moment.min',
    'angular-moment': '../lib/angular-moment.min',
    'ui-bootstrap': '../lib/ui-bootstrap-tpls.min',
    'highcharts': '../lib/highcharts',
    'highcharts-more': '../lib/highcharts-more',
    'highcharts-ng' : '../lib/highcharts-ng.min'
  },

  shim: {
    'angular': {
      exports: 'angular'
    },

    'angular-route': {
      deps: ['angular']
    },
    'bootstrap' : {
      deps: ["jquery"]
    },
    'angular-moment': {
        deps: ['angular', 'moment']
    },
    'ui-bootstrap': {
        deps: ['angular', 'jquery']
    },
    'highcharts' :{
        exports: 'Highcharts'
    },
    'highcharts-more' :{
        deps: ['highcharts']
    },
    'highcharts-ng': {
        deps: ['angular', 'highcharts', 'highcharts-more']
    }
  }
});

require(['application'], function(test) {

  /*
    Start your app here
  */

    require([ 'jquery',
        'bootstrap',
        'ui-bootstrap',
        'highcharts-ng' ],
        function($) {
            console.log("Loaded :)");
            return {};
    });

  /*
    Keep this at the bottom of the function. More info at:
    https://github.com/tnajdek/angular-requirejs-seed/blob/master/app/js/main.js
  */
  angular.element().ready(function() {
      angular.resumeBootstrap();
  });


});