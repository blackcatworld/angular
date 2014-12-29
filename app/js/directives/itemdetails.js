require(['application'],function(application){
    application.directive('itemDetails', function($compile, $http, $templateCache){
        var getTemplate = function(type) {
            var template = '/partials/none.html';


            switch(type) {
                case 'details1':
                    template = '/partials/details1.html' ;
                    break;
                case 'details2':
                    template = '/partials/details2.html';
                    break;
                case 'details3':
                    template = '/partials/details3.html';
                    break;
            }

            templateLoader = $http.get(template, {cache: $templateCache});
            return templateLoader; // promise object
        };

        var doLoad = function($scope, element) {
            var loader = getTemplate($scope.content.type);

            var promise = loader.success(function (html) {
                element.html(html);
                $compile(element.contents())($scope);

            }).error(function(err){
                element.html('<pre>Error loading Template</pre>');
                $compile(element.contents())($scope);

            });
        };

        var linker = function(scope, element, attrs) {

            scope.$watch('content.id', function watchContentType(newValue, oldValue) {
                if (scope.content.id > 0) doLoad(scope, element);
            });

            if (scope.content.id && scope.content.type) {
                doLoad(scope, element);
            } else {
                element.html('<div>Item not selected.</div>');
            }
        };

        function Controller( $scope, $element, $attrs ) {

            $scope.getTime = function(date) {
                return date ? new Date(date) : new Date();
            };

            $scope.convertTime = function(seconds, showms) {

                seconds = showms ? seconds : Math.round(seconds);
                var h = Math.floor(seconds/3600); //Get whole hours
                seconds -= h * 3600;
                var m = Math.floor(seconds/60); //Get remaining minutes
                seconds -= m * 60;
                var s = Math.floor(seconds);
                var ms = Math.round((seconds - s) * 1000) ;

                return (h >= 0 && m >= 0 && seconds >= 0) ?
                    h + ":" +
                    (m < 10 ? '0' + m : m) + ":" +
                    (s < 10 ? '0' + s : s) +
                    (showms ? '.' + (ms < 100 ? '0' + ms : (ms < 10 ? '00' + ms : '' + ms)) : '') :
                    '00:00:00' + (showms ? '.000' : '');
            };

        }
        return {
            restrict: "E",
            rep1ace: true,
            link: linker,
            scope: {
                content:'='
            },
            controller: Controller
        };
    });
});