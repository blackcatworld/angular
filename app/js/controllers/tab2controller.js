require(['application'], function(application) {
    application.controller(
        'tab2Controller',['$scope',
            function ($scope) {
                $scope.getPage = function() {
                    return "partials/tab2.html";
                };
            }]);
});
