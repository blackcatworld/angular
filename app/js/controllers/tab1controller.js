require(['application'], function(application) {
    application.controller(
        'tab1Controller',['$scope', 'tab1Service',
            function ($scope, tab1Service) {
                $scope.itemid = 0;
                $scope.loaded = false;
                $scope.selectedItem = {};
                $scope.list = tab1Service.list;

                $scope.getPage = function() {
                    return "/partials/details.html";
                };

                $scope.templateLoaded = function() {
                    $scope.itemid = $scope.selectedItem.id;
                };

                $scope.setSelected = function(item) {
                    $scope.itemid = item.id;
                    angular.copy(item, $scope.selectedItem);
                };

            }]);
});
