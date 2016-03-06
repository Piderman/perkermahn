'use strict';

angular.module('Pokemon')
  .controller('opponentController', ['$scope', 'coreStorage', 'infoServices',
    function($scope, coreStorage, infoServices) {

    var self = this;

    // todo, doesn't work on first run, how to fire after callback?
    $scope.PKMN = coreStorage.getAllPkmn();
    $scope.opponent = {};
    $scope.opponent.id = null;
    $scope.opponent.name = null;
    $scope.opponent.types = [];

    // note: can be name or id
    self.getOpponentInfo = function(name) {
      infoServices.getPkmnByName(name).then(function (response) {
        var result = response.data;

        $scope.opponent.id = result.id;
        $scope.opponent.name = result.name;
        $scope.opponent.types = _.map(result.types, 'type.name');
      });
    };

    self.getTypeEffectiveSummary = function(type){
      var doubleDamageTo;
      var halfDamageFrom;
      var noDamageFrom;

      infoServices.getTypeByName(type).then(function (response) {
        doubleDamageTo = _.map(response.data.damage_relations.double_damage_to, 'name');
        halfDamageFrom = _.map(response.data.damage_relations.half_damage_from, 'name');
        noDamageFrom = _.map(response.data.damage_relations.no_damage_from, 'name');

        $scope.opponent.doubleDamageTo = doubleDamageTo;
        $scope.opponent.halfDamageFrom = halfDamageFrom;
        $scope.opponent.noDamageFrom = noDamageFrom;
      });
    };

    this.getOppenentWeaknessSummary = function(type){
      var doubleDamageFrom;
      var halfDamageTo;
      var noDamageTo;

      infoServices.getTypeByName(type).then(function (response) {
        doubleDamageFrom = _.map(response.data.damage_relations.double_damage_from, 'name');
        halfDamageTo = _.map(response.data.damage_relations.half_damage_to, 'name');
        noDamageTo = _.map(response.data.damage_relations.no_damage_to, 'name');

        $scope.opponent.doubleDamageFrom = doubleDamageFrom;
        $scope.opponent.halfDamageTo = halfDamageTo;
        $scope.opponent.noDamageTo = noDamageTo;
      });
    };
  }
]);
