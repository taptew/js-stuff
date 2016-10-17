/**
 * Created by v471186 on 3/2/16.
 */
angular.module('niche-app', [
    'ngRoute',
    'dummy-module',
    'login-module',
    'user-module'
]).config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/home', {
            templateUrl: 'source/views/home/Home.html',
            controller: 'HomeController',
            secure: true
        }).
        when('/signin', {
            templateUrl: 'source/views/login/SignIn.html',
            controller: 'SignInController'
        }).
        when('/signin/:viewContext', {
            templateUrl: 'source/views/login/SignIn.html',
            controller: 'SignInController'
        }).
        when('/signup', {
            templateUrl: 'source/views/login/SignUp.html',
            controller: 'SignUpController'
        }).
        otherwise('/home');
}]).run(['$rootScope', '$location',
    function($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {

        console.log('event', event);
        console.log('current', current);
        console.log('next', next);
        console.log('next.secure', next.secure);

        if (_.isEmpty($rootScope.userInfo) && next.secure) {
            console.log('Sign-in required...');
            $location.path('/signin/inline');
        }
    });
}]);