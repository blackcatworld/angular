require(['application'],function(application) {
    application.directive('chart',
        function (chartData) {
            return {
                restrict: 'E',
                replace: true,
                transclude: true,

                scope: {
                    items: '='
                },
                controller: function ($scope, $element, $attrs) {
                    console.log('chart initiated');

                    $scope.activeValue = 'minutes';
                    $scope.activeCaption = 'Minutes';
                    $scope.currentInterval = 1000 * 60;

                    $scope.setMinutes = function() {
                        $scope.activeValue = 'minutes';
                        $scope.activeCaption = 'Minutes';
                        $scope.chart.setTitle($scope.setTitle('minutes'));
                        $scope.currentInterval = 1000 * 60;
                        mapperData.createSeries($scope.chart);
                        mapperData.setupInterval($scope.currentInterval, $scope.chart);
                    };

                    $scope.stopUpdate = function() {
                        mapperData.cancelInterval($scope.chart);
                    };

                    $scope.setTitle = function(interval) {
                        var result =  { text: 'statistics' };
                        return result;
                    }

                },
                template: function ($element, $attrs) {
                    var container = $attrs.container ? $attrs.container : 'container';
                    return '<div id="' + container + '" class="wait-spinner">Loding...</div>' ;
                },
                link: function ($scope, $element, $attrs) {
                    var container = $attrs.container ? $attrs.container : 'container';
                    console.log('chart link');

                    var chart = new Highcharts.Chart({
                            chart: {
                                renderTo: container,
                                type: 'spline',
                                animation: Highcharts.svg, // don't animate in old IE
                                marginRight: 10,
                                height: '450',
                                events: {
                                    load: function(event) {
                                        chartData.updateSeries($scope.currentInterval, event);
                                    }
                                }
                            },
                            title: $scope.setTitle('minutes'),
                            subtitle: { text: 'chart' },
                            xAxis: {
                                type: 'datetime',
                                tickPixelInterval: 150
                            },
                            yAxis: {
                                title: {
                                    text: 'Value'
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                formatter: function() {
                                    return '<b>'+ this.series.name +'</b><br/>'+
                                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+
                                        Highcharts.numberFormat(this.y, 2);
                                }
                            },
                            legend: {
                                enabled: true,

                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom',
                                borderWidth: 0

                            },
                            exporting: {
                                enabled: false
                            },

                            series: []
                        },

                        function() {
                            //chartDone
                        }
                    );

                    $scope.chart = chart;

                    /*$scope.$watch("items", function (newValue) {
                     if ($scope.chart.series && $scope.chart.series.length > 0) {
                     $scope.chart.series[0].setData(newValue, true);
                     }
                     }, true);*/

                }
            }
        });
});
