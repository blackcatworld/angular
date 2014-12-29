require(['application'],function(application){
    application.factory('tab1Service',function($interval, $http, api_url){

        var me = this;
        var list = [];
        var factory = {
            loaded : true,
            list : list
        };

        factory.data = function() {
            var result = new Array();
            var date = new Date();
            var time = date.getTime();
            var type = 1;
            for (var i = 0; i < 5; i++) {
                result.push({
                    id : i,
                    caption : 'item #' + i,
                    type : 'details' + type.toString(),
                    time : new Date(time - Math.random() * 10000000)
                });

                type++;
                if (type > 3) type = 1;
            }

            angular.copy(result, list);
        };


        this.interval = $interval(factory.data, 2000);

        return factory;
    });
});