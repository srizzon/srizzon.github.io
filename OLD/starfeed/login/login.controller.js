(function () {
    'use strict';

    angular
    .module('app')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$rootScope', '$location', 'AuthenticationService', 'FlashService'];
    function LoginController($rootScope, $location, AuthenticationService, FlashService) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status

            if(localStorage.fileJSON){
                $rootScope.globals = JSON.parse(localStorage.fileJSON);
            }else{
                AuthenticationService.ClearCredentials();
            }
        })();

        function login() {
            if(vm.username != undefined && vm.password != undefined){
                vm.dataLoading = true;

                AuthenticationService.Login(vm.username, vm.password, function (result) {

                    console.log(result.data.Usuario.Tipo_pessoa);
                    if (!result.erro && result.data) {
                        if(result.data.Usuario.Tipo_pessoa != 2){
                            FlashService.Error("Acesso negado! Somente professores podem utilizar o site.");
                            vm.dataLoading = false;
                        } else{
                            console.dir(result.data);
                            AuthenticationService.SetCredentials(vm.username, vm.password, result.data);
                            $location.path('/');
                        }
                    } else {
                        FlashService.Error(result.message);
                        vm.dataLoading = false;
                    }
                });
            }
        };
    }

})();
