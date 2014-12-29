var tabsController = function ($scope) {
    $scope.activated = {};
    $scope.tabs = {};

    $scope.tabSelected = function(name) {
        $scope.$parent.caption = 'AngularJS (' + name + ')';
    };
};