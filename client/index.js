angular
    .module('caroOnline', ['angularModalService','ngRoute'])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'src/home/home.html',
                controller: 'homeCtrl'
            })
            .when('/room', {
                templateUrl: 'src/room/room.html',
                controller: 'roomCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
