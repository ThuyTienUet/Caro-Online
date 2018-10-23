angular
    .module('caroOnline', ['angularModalService','ngRoute'])
    .config(['$routeProvider', function config($routeProvider) {
        $routeProvider
            .when('/jknj', {
                templateUrl: 'src/home/home.html',
                controller: 'homeCtrl'
            })
            .when('/', {
                templateUrl: 'src/room/room.html',
                controller: 'roomCtrl'
            })
            .when('/login', {
                templateUrl: 'src/login/login.html',
                controller: 'loginCtrl'
            })
            .when('/signup', {
                templateUrl: 'src/register/register.html',
                controller: 'registerCtrl'
            })
            .otherwise({ redirectTo: '/' });
    }])
