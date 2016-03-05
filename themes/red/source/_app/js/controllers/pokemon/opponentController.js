'use strict';

angular.module('Pokemon')
  .controller('opponentController', ['$scope', 'coreStorage', 'infoServices',
    function($scope, coreStorage, infoServices) {

    var self = this;

    // todo, doesn't work on first run, how to fire after callback?
    $scope.PKMN = coreStorage.getAllPkmn();
    $scope.opponent = {};

    $scope.getSummaryByName = function (name) {
      infoServices.getPkmnByName(name).then(function(result){
        $scope.opponent.name = name;
        $scope.opponent.type = _.map(result.data.types, 'type.name');

        $scope.opponent.effectiveTo = self.getOppenentEffectiveSummary(name);
      });

    };

    self.getOppenentEffectiveSummary = function(name){
      infoServices.getTypeByName(name)
        .then(function(result) {
          var dmgType = _.find(result.data.damage_relations, 'double_damage_to');
          var effective = _.map(dmgType.double_damage_to, 'name');

          console.log('app ctrl: ', effective);

          return effective;
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
