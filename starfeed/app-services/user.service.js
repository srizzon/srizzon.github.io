(function () {
    'use strict';

    angular
    .module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$http', '$rootScope'];
    function UserService($http, $rootScope) {
        var service = {};

        service.GetMaterias = GetMaterias;
        service.GetFeedbacks = GetFeedbacks;

        return service;

        function GetMaterias() {
            return $http.get($rootScope.ROOT_URL + "/getinformacao/materia?cod_curso=1");
        }

        function GetFeedbacks(token, data, materia) {
            return $http.get($rootScope.ROOT_URL + "/getinformacao/getavaliacaoprofessor?token=" + encodeURIComponent(token) + "&data=" + data + "&codMateria=" + materia);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
