(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService() {
        var users = [
            {_id: "1", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "2", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "3", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "4", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var counter = "5";

        var api = {
            "users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
        };
        return api;

        function createUser(user) {
            users.push({_id: counter++, })
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id === userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function findUserById(uid) {
            for(var u in users) {
                var user = users[u];
                if( user._id === uid ) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if( user.username === username &&
                    user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }
    }
})();