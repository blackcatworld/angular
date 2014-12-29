require(['application'], function(application) {
    application.controller(
        'tab1Controller',['$scope', 'tab1Service',
            function ($scope, tab1Service) {
                $scope.itemid = 0;
                $scope.loaded = false;
                $scope.selectedItem = {};
                $scope.list = tab1Service.list;

                $scope.getPage = function() {
                    if (tab1Service.loaded) {
                        if (!$scope.loaded && tab1Service.list.length > 0) {
                            $scope.setSelected(tab1Service.list[0]);
                            $scope.loaded = true;
                        }

                        return "/partials/details.html";
                    } else {
                        $scope.loaded = false;
                        return "/partials/waiting.html";
                    }
                };

                $scope.setSelected = function(item) {
                    $scope.itemid = item.id;
                    angular.copy(item, $scope.selectedItem);
                };

            }]);
});
