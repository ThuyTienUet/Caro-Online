angular
    .module('caroOnline')
    .service('authentication', authentication);
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
        // $http({
        //     method: 'POST',
        //     url: 'http://localhost:3000/login',
        //     data: user
        // }).then(function successCallback(response) {
        //      console.log(response);
        //     if (response.data.code != 200) {
        //         console.error(response.data.reason);
        //         cb();
        //     } else {
        //         cb(response.data.content);
        //     }
        // }, function errorCallback(response) {
        //     // console.error(response);
        //     if(toastr) toastr.error(response); 
        //     cb();
        // });
        console.log('login - auth ');
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