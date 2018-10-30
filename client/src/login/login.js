(function () {
	angular
		.module('caroOnline')
		.controller('loginCtrl', loginCtrl);

	//loginCtrl.$inject = ['authentication', '$http'];
	function loginCtrl($location, authentication, $http,$scope) {
		$scope.user = {
		 	username: "",
		 	password: ""
		};		

		$scope.onSubmit = function () {
			$scope.formError = "";
			if (!$scope.user.username || !$scope.user.password) {
				$scope.formError = "All fields required, please try again";
				return false;
			} else {
				doLogin();
			}
		};

		function doLogin() {
			$scope.formError = "";
			authentication
				.login($scope.user, function (data) {
                    console.log(data);
                })
				.then(function errorCallback(err) {
					$scope.formError = err;
				})
				.then(function(data) {
                    console.log(data);
					// $location.search('page', null);
					// $location.path($scope.returnPage);
				});
		};
	}
}) ();