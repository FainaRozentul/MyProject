app.factory("userLoginService", function($http, $log, $q){
    $log.log("userLoginService started...");

    var users = [];
    var activeUser = null;

    //user constructor
    function User(userObj){
        this.name = userObj.name;
        this.email = userObj.email;
        this.appartment = userObj.appartment;
        this.isCommitteeMember = userObj.isCommitteeMember,
        this.pwd = userObj.pwd;
    }

    function load(){
        $log.log("userLoginService.load() started...");
       
        var async = $q.defer();
        $http.get("data/users.json").then(function success(resp){
            for(var i = 0; i < resp.data.length; i++){
                var user = new User(resp.data[i]);
                users.push(user);
            }
            async.resolve(true);
        },function error(){

            async.reject();
        });
            
            return async.promise;
        }

    function login(name,pwd){
        $log.log("userLoginService.login() started...");      
            for(var i = 0; i < users.length; i++){
                var usersObj = users[i];
                if(usersObj.name === name && usersObj.pwd === pwd){
                       activeUser = new User(usersObj);
                }
            }

            return activeUser;
        }

    return {
            login: login,
            load:load,
            activeUser:activeUser
            };
})