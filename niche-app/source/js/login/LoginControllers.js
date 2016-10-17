angular.module("login-module")
    .controller('SignInController', [
        '$routeParams', '$location', '$rootScope','$scope', 'SignInService',
        function($routeParams, $location, $rootScope, $scope, SignInService) {
        $scope.viewContext = $routeParams.viewContext;
        $scope.userName = "";
        $scope.userPassword = "";
        $scope.errorMsg = "";

        $scope.signIn = function() {
            $scope.loading = true;
            SignInService.signIn($scope.userName, $scope.userPassword).success(function(userInfo) {
                $rootScope.userInfo = userInfo;
                $location.path("/home");
            }).error(function(errorInfo) {
                $scope.errorMsg = errorInfo.message;
            })
            ;
        };
    }])
    .controller('SignUpController',[
        '$routeParams', '$location', '$rootScope','$scope', 'SignUpService',
        function($routeParams, $location, $rootScope, $scope, SignUpService) {

    }]);
