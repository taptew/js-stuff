/**
 * Created by tapan on 2/24/16.
 */

describe('UserController', function() {
    var scope, controller, httpBackend;

    beforeEach(module('NicheApp'));
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope;
        controller = $controller;
        httpBackend = $httpBackend;
    }));

    it('should query the webservice', function() {
        // which http call and the response
        httpBackend.expectGET('/users').respond('[{"name": "First user"}, {"name": "Second user"}]');

        // starting the controller
        controller('UserController', {'$scope': scope});

        // response to all http requests
        httpBackend.flush();

        // trigger angular-js digest cycle in order to resolve all promises
        scope.$apply();

        // expect the controller to put a right value onto the scope
        expect(scope.user_count).toEqual(2);
    });

});
