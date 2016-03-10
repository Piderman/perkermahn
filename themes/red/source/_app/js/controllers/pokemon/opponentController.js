'use strict';

angular.module('Pokemon')
  .controller('opponentController', ['$scope', 'coreStorage', 'infoServices',
    function($scope, coreStorage, infoServices) {

    var self = this;

    // todo, doesn't work on first run, how to fire after callback?
    $scope.PKMN = coreStorage.getAllPkmn();
    // todo: move to storage
    $scope.TYPES = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark"];
    $scope.opponent = {};
    $scope.opponent.id = null;
    $scope.opponent.name = null;
    $scope.opponent.types = [];
    $scope.typeLabel = '';



    // note: can be name or id
    $scope.getOpponentInfo = function(name) {
      $scope.opponent.doubleDamageTo = null;
      $scope.opponent.halfDamageTo = null;
      $scope.opponent.noDamageTo = null;
      $scope.opponent.doubleDamageFrom = null;
      $scope.opponent.halfDamageFrom = null;
      $scope.opponent.noDamageFrom = null;

      infoServices.getPkmnByName(name).then(function (response) {
        var result = response.data;

        $scope.opponent.id = result.id;
        $scope.opponent.name = result.name;
        $scope.opponent.types = _.map(result.types, 'type.name');
        $scope.typeLabel = $scope.opponent.types.join(', ');
          $scope.opponent.sprite = result.sprites.front_default;

        // self.getTypeEffectiveSummary($scope.opponent.types[0]);
        // self.getOppenentWeaknessSummary($scope.opponent.types[0]);
        $scope.getTypeSummary($scope.opponent.types);
      });
    };

    // temp init
    // $scope.getOpponentInfo('gastly');

    // pkmn can have multiple types so push to the array
    $scope.getTypeSummary = function(type) {
      var doubleDamageTo = [];
      var halfDamageTo = [];
      var noDamageTo = [];
      var doubleDamageFrom = [];
      var halfDamageFrom = [];
      var noDamageFrom = [];

      if (!Array.isArray(type)) {
        type = [type];
      }

      _.each(type, function(currentType){
        // todo: move service to storage,
        infoServices.getTypeByName(currentType).then(function (response) {
          var damageRelations = response.data.damage_relations;

          doubleDamageTo.push(mapTypeToArray(damageRelations, 'double_damage_to'));
          halfDamageTo.push(mapTypeToArray(damageRelations, 'half_damage_to'));
          noDamageTo.push(mapTypeToArray(damageRelations, 'no_damage_to'));

          doubleDamageFrom.push(mapTypeToArray(damageRelations, 'double_damage_from'));
          halfDamageFrom.push(mapTypeToArray(damageRelations, 'half_damage_from'));
          noDamageFrom.push(mapTypeToArray(damageRelations, 'no_damage_from'));

          // need to flattern as a double-type pkmn means the array has two arrays
          $scope.opponent.doubleDamageTo = _.flatten(doubleDamageTo);
          $scope.opponent.halfDamageTo = _.flatten(halfDamageTo);
          $scope.opponent.noDamageTo = _.flatten(noDamageTo);

          $scope.opponent.doubleDamageFrom = _.flatten(doubleDamageFrom);
          $scope.opponent.halfDamageFrom = _.flatten(halfDamageFrom);
          $scope.opponent.noDamageFrom = _.flatten(noDamageFrom);

          // todo: remove same type from list

          // todo: combine dupes for stacked affects
        });
      });
    };

    function mapTypeToArray(damageRelations, damageType) {
      return _.map(damageRelations[damageType], 'name');
    }
  }
]);
