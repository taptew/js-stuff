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