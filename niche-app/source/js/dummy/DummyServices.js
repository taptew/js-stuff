/**
 * Created by tapan on 2/24/16.
 */
angular.module('dummy-module')
.factory('DummyService', ['Restangular', '$q', function(Restangular, $q) {
        return {
            getCount: function() {
                var deferred = $q.defer();
                Restangular.all("dummies").getList().then(function(response) {
                    deferred.resolve(response.length);
                });
                return deferred.promise;
            }
        };
    }]);