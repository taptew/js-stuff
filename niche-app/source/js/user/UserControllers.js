/**
 * Created by v471186 on 2/26/16.
 */
angular.module("user-module")
    .controller('UserListController', ['$scope', 'UserService', function($scope, UserService) {
        var fetchUsers = function(filter) {
            $scope.loading = true;
            UserService.list(filter, sort).then(function(users){
                $scope.loading = false;
                $scope.users = users;
                $scope.filter = filter;
                $scope.sort = sort;
            });
        };

        fetchUsers();
    }]);
