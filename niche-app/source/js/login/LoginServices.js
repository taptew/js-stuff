/**
 * Created by v471186 on 3/17/16.
 */
angular.module("login-module")
    .factory('SignInService', ['$timeout', '$q', '$http', function($timeout, $q, $http) {
        var service_path = "/api/v1/auth";
        return {
            signIn: function (user, psswd) {
                var deferred = $q.defer();
                $timeout(function () {
                    if (_.isEmpty(user) || _.isEmpty(psswd)) {
                        deferred.reject({reason: 'Missing required information'});
                    } else {
                        deferred.resolve({
                            userName: user,
                            firstName: 'John',
                            lastName: 'Doe',
                            token: 'tkn' + _.now()
                        });
                    }
                }, 1000);
                return deferred.promise;
            }
        };
    }])
    .factory('SignUpService', ['$q', '$http', function($q, $http) {
        var service_path = "/api/v1/reg";
        return {

        };
    }])
;