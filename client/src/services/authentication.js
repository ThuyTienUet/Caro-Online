angular
    .module('caroOnline')
    .service('auth', authentication);
authentication.$inject = ['$window', '$http'];
function authentication($window, $http) {
    var saveToken = function (token) {
        $window.localStorage['user-token'] = token;
    };
    var getToken = function () {
        return $window.localStorage['token']; 
    };

    var getUser = function () {
        return $window.localStorage['user']
    }

    var login = function (user, cb) {
        return $http.post('/api/login', user) 
            .then(function successCallback(data) {
                saveToken(data.data.token);
                cb(data);
            });
    };
    var logout = function () {
        $window.localStorage.removeItem('token');
        $window.localStorage.removeItem('user');
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
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
    };
}