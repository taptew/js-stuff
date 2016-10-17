/**
 * Created by v471186 on 2/26/16.
 *
 * User service for CRUD
 */
angular.module("user-module")
    .factory('UserService', ['$q', '$http', function($q, $http) {
        var user_service_path = "/api/v1/users";
        return {
            list: function(filter) {
                var deferred = $q.defer();
                $http.get(user_service_path).then(function(response) {
                        deferred.resolve(response.data);
                });
                return deferred;
            },

            add: function(obj) {
                var deferred = $q.defer();
                $http.put(user_service_path, obj).then(function(response) {
                    deferred.resolve(response.data);
                });
                return deferred;
            },

            remove: function(obj) {
                var deferred = $q.defer();
                $http.delete(user_service_path+"/" + obj.key).then(function(response) {
                    deferred.resolve(response.data);
                });
                return deferred;
            }
        };
    }]);