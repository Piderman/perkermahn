'use strict';

angular.module('Pokemon')
  .controller('opponentController', ['$scope', 'coreStorage', 'infoServices',
    function($scope, coreStorage, infoServices) {

    var self = this;

    // todo, doesn't work on first run, how to fire after callback?
    // $scope.PKMN = coreStorage.getAllPkmn();
    $scope.opponent = {};
    $scope.opponent.id = null;
    $scope.opponent.name = null;
    $scope.opponent.types = [];
    $scope.opponent.effectiveVs = null;

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
      var doubleDamage;

      infoServices.getTypeByName(type).then(function (response) {
        doubleDamage = _.map(response.data.damage_relations.double_damage_to, 'name');
        $scope.opponent.effectiveVs = doubleDamage;
      });

    };

    this.getOppenentWeaknessSummary = function(name){
      return false;
    };

    this.getOppenentUselessnessSummary = function(name){
      return false;
    };
  }
]);
