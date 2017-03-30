(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("ProfileController", ProfileController)
        .controller("RegisterController", RegisterController);

    function LoginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            var promise = UserService.findUserByCredentials(user.username, user.password);
            promise
                .then(function (user) {
                    var loginUser = user.data;
                    if(loginUser != null) {
                        $location.url('/user/' + loginUser._id);
                        console.log(loginUser);
                    } else {
                        vm.error = 'user not found';
                    }
                }, (function(err) {
                    vm.error = 'user not found';
                }));
        }
    }

    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(renderUser);
        }
        init();

        function updateUser(user) {
            var promise = UserService.updateUser(vm.userId, user);
            promise.then(
                function(res){
                    alert("Successfully updated user");
                },
                function(err) {
                    console.log(err);
                }
            );
        }

        function renderUser(user) {
            vm.user = user.data;
            console.log(user);
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var newUser = UserService.createUser(user);
            newUser.then(function(user) {
                if(user != null) {
                    $location.url('/user/' + user.data._id);
                } else {
                    vm.error = 'cannot create user';
                }
            },
            function(err) {
                console.log(err);
            });
        }
    }
})();
