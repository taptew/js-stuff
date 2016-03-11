/**
 * Created by tapan on 2/24/16.
 */
angular.module('dummy-module')
.controller('DummyController', ['$scope', 'DummyService', function($scope, DummyService) {
        DummyService.getCount().then(function(count) {
           $scope.count = count;
        });
    }]);