/**
 * Created by tapan on 2/24/16.
 */
angular.module('NicheApp.controllers', [])
.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
        UserService.getUserCount().then(function(count) {
           $scope.user_count = count;
        });
    }]);