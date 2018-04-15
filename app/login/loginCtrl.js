app.controller("loginCtrl", function($scope, $log, $location, userLoginService){

    $log.log("loginCtrl started...");

    $scope.username;
    $scope.password;
    $scope.error = "Login failed...";
    $scope.users = [];

    $scope.init = function(){
        $log.log("loginCtrl.init()");
        //load users from JSON
        userLoginService.load().then(function success(resp){
            $scope.users =  resp;
        }).then(function error(){

        }); 
    }

    $scope.login = function(){
        $log.log("user: " + $scope.username + " " + "pwd:  " + $scope.password); 
        var loggedInUser = userLoginService.login($scope.username,$scope.password);
        if(loggedInUser != null){
            $location.path("/messages");
        }else{

        }
    }

})