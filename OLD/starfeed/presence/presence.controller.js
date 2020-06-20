(function () {
    'use strict';

    angular
    .module('app')
    .controller('PresenceController', PresenceController);

    PresenceController.$inject = ['UserService', 'FlashService', '$rootScope', '$scope'];
    function PresenceController(UserService, FlashService, $rootScope, $scope) {
        var vm = this;

        $scope.home = {
            allMaterias: undefined,
            feedbacks: undefined,
            selectedMateria: undefined,
            dataFilter: undefined,
            dataLoading: false
        }

        initController();

        function initController() {

        }

        $scope.loadMaterias = function(date){
            $scope.home.dataLoading = true;

            $scope.home.allMaterias = getAulasSemanaByDate(date);

            if($scope.home.feedbacks != undefined)
                $('.grid').masonry('destroy');

            $scope.home.feedbacks = undefined;
            $scope.home.dataLoading = false;
        }

        $scope.pesquisarFeedbacks = function(codMateria){
            $scope.home.dataLoading = true;
            var token = $rootScope.globals.currentUser.token;

            if( $scope.home.feedbacks != undefined)
                $('.grid').masonry('destroy');

            $scope.home.feedbacks = undefined;

            UserService.GetFeedbacks(token, $scope.home.dataFilter, codMateria).then(function (result) {
                if (!result.data.erro && result.data.data) {
                    $scope.home.feedbacks = result.data.data;

                    setTimeout(function(){
                        $('.grid').masonry({
                            itemSelector: '.grid-item'
                        });
                    }, 100);

                    $scope.home.dataLoading = false;

                } else {
                    FlashService.Error(result.data.message);
                }
            });
        }

        function getAulasSemanaByDate(date) {
            var aulaSemana = $rootScope.globals.currentUser.userInfo.AulaSemana;

            switch(date.getDay()) {
                case 1:
                return aulaSemana.Segunda;
                break;
                case 2:
                return aulaSemana.Terca;
                break;
                case 3:
                return aulaSemana.Quarta;
                break;
                case 4:
                return aulaSemana.Quinta;
                break;
                case 5:
                return aulaSemana.Sexta;
                break;
            }
        }
    }

})();