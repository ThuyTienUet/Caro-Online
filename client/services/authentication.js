angular
    .module('caroOnline')
    .service('auth', authentication);
authentication.$inject = ['$window', '$http', '$location'];
function authentication($window, $http, $location) {
    var saveToken = function (token) {
        // $window.localStorage['token'] = token;
        $window.sessionStorage['token'] = token;
    };
    var getToken = function () {
        // return $window.localStorage['token']; 
        return $window.sessionStorage['token']; 
    }; 
    var saveUser = function (user) {
        $window.sessionStorage['user'] = JSON.stringify(user); 
    }
    var getUser = function () {
        return $window.sessionStorage['user']
    }

    var login = function (user, cb) {
        return $http.post('/api/login', user) 
            .then(function successCallback(data) {
                saveToken(data.data.user.token);
                saveUser(data.data.user.user);
                cb(data.data);
            }, function errorCallback(err) {
                console.log(err);
            });
    };

    var register = function(user, callback) {
        return $http.post('/api/register', user)
            .then(function successCallback(data) {
                callback(data.data);
            }, function errorCallback(err) {
                console.log(err);
            });
    }
    var logout = function () {
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('user');
        $location.path('/')
    };
    var isLoggedIn = function () {
        var user = getUser();
        if (user) {
            return true;
        } else {
            return false;
        }
    };

    return {
        saveToken: saveToken,
        getToken: getToken,
        getUser: getUser,
        login: login,
        register: register,
        logout: logout,
        isLoggedIn: isLoggedIn
    };
}