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
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                vm.error = 'user not found';
            }
        }
    }

    function ProfileController(UserService, $routeParams) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.updateUser = updateUser;

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        function updateUser(user) {
            UserService.updateUser(vm.userId, user);
            alert("User updated");
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var newUser = UserService.createUser(user);
            if(newUser != null) {
                $location.url('/user/' + newUser);
            } else {
                vm.error = 'cannot create user';
            }
        }
    }
})();
