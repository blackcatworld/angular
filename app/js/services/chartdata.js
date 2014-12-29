require(['application'], function(application) {
    application.factory('chartData', function($http, $interval, api_url){

        var time = new Date().getTime();

        var result = {
            series1 : [[time, 1000], [time + 60 * 1000, 400], [time + 120 * 1000, 50],  [time + 180 * 1000, 100], [time  + 240 * 1000, 100] ],
            series2 : [[time, 1000], [time + 60 * 1000, 500], [time + 120 * 1000, 100], [time + 180 * 1000, 2000], [time  + 240 * 1000, 1000] ],
            series3 : [[time, 1000], [time + 60 * 1000, 0],   [time + 120 * 1000, 100], [time + 180 * 1000, 100], [time  + 240 * 1000, 400] ],
            series4 : [[time, 1000], [time + 60 * 1000, -200],[time + 120 * 1000, 200], [time + 180 * 1000, 600], [time  + 240 * 1000, 0] ],
            series5 : [[time, 1000], [time + 60 * 1000, 100], [time + 120 * 1000, 400], [time + 180 * 1000, 700], [time  + 240 * 1000, -200] ]
        };

        var increment = 1;
        var time = 1;
        var factory = {
            intervalUpdate: null
        };

        factory.updateSeries = function(interval, event, callback){
            // set up the updating of the chart each second
            var chart = event.currentTarget;
            this.createSeries(chart, callback);
            this.setupInterval(interval, chart); // default of 1min
        };

        factory.cancelInterval = function(chart) {
            if (chart.intervalUpdate) {
                $interval.cancel(chart.intervalUpdate);
                chart.intervalUpdate = null;
            }
        };

        factory.setupInterval = function(duration, chart) {

            this.cancelInterval(chart);
            this.up = true;

            chart.intervalUpdate =
                $interval(function() {
                        var resultadd = {
                            series1 : [[time  + (240 + 60 * time) * 1000, 100 * increment] ],
                            series2 : [[time  + (240 + 60 * time) * 1000, 200 * increment] ],
                            series3 : [[time  + (240 + 60 * time) * 1000, 100 * increment] ],
                            series4 : [[time  + (240 + 60 * time) * 1000, 300 * increment] ],
                            series5 : [[time  + (240 + 60 * time) * 1000, 100 * increment] ]
                        };

                        if (increment < 10 && this.up) increment++;
                        if (increment > -10 && !this.up) increment--;

                        if (increment >= 10 && this.up) this.up = false;
                        if (increment <= -10 && !this.up) this.up = true;
                        time++;

                        this.intervalJson(chart, resultadd);
                    }.bind(this),
                duration);
        };

        factory.intervalJson = function(chart, json) {

            if (Object.keys(json).length != chart.series.length) {
                this.createSeries(chart);
                return;
            }

            Object.keys(json).forEach(function(key) {
                if (chart.seriesIndexes[key] != null) {
                    var series_current = chart.series[chart.seriesIndexes[key]];
                    var x = json[key][0][0] * 1000; // time
                    var y = json[key][0][1];
                    series_current.addPoint([x, y], true, true);
                } else {
                    this.createSeries(chart);
                    return;
                }
            }.bind(this));
        };

        factory.createSeries = function (chart, callback) {
            this.createSeriesJson(chart, result);
        };

        factory.createSeriesJson = function(chart, json) {

            var initialIndexes = { };
            var resultSeriesIndexes = {};
            if (chart.series) { while( chart.series.length > 0 ) { chart.series[0].remove( false ); }; };
            Object.keys(initialIndexes).forEach(function(key) {
                if (json[key]) {
                    chart.addSeries({name: key});
                    resultSeriesIndexes[key] = chart.series.length - 1;
                }
            });

            Object.keys(json).forEach(function(key) {
                var len = json[key].length -1;
                var data = [];
                for (var i = 0; i < len; i++) {
                    data.push({
                        x: json[key][i][0] * 1000,
                        y: json[key][i][1]
                    });
                }

                if (resultSeriesIndexes[key] == null) {
                    resultSeriesIndexes[key] = chart.series.length;
                    chart.addSeries({ name: key });
                }

                chart.series[resultSeriesIndexes[key]].setData(data);
                chart.seriesIndexes = resultSeriesIndexes;

            }.bind(this));
        };

        return factory;
    });
});

