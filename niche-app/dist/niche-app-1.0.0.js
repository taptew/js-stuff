/**
 * Created by tapan on 2/24/16.
 */
angular.module('NicheApp.services', [])
.factory('UserService', ['Restangular', '$q', function(Restangular, $q) {
        return {
            getUserCount: function() {
                var deferred = $q.defer();
                Restangular.all("users").getList().then(function(response) {
                    deferred.resolve(response.length);
                });
                return deferred.promise;
            }
        };
    }]);
/**
 * Created by tapan on 2/24/16.
 */
angular.module('NicheApp', [
    'restangular',
    'NicheApp.controllers',
    'NicheApp.services'
]);
/**
 * Created by tapan on 2/24/16.
 */
angular.module('NicheApp.controllers', [])
.controller('UserController', ['$scope', 'UserService', function($scope, UserService) {
        UserService.getUserCount().then(function(count) {
           $scope.user_count = count;
        });
    }]);