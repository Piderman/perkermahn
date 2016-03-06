// scaffold for angulars
var $rootScope;
var $controller;
var $scope;
var $httpBackend;
var ctrl;

var mockOppenentResponse = {
  "name": "squirtle",
  "types": [{"type": {"name": "water"}}]
};



describe('ctrl: oppenentController', function() {
  beforeEach(function(){
    localStorage.setItem('PKMN', '[{"name": "localmon"}]');
  });

  beforeEach(module('pkmn'));

  beforeEach(inject(function(_$rootScope_, _$controller_, _$httpBackend_){
    $httpBackend = _$httpBackend_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    // local storage
    $httpBackend.when('GET', mockPkmn.endPoint.all).respond(mockOppenentResponse);

    // pkmn lookup
    $httpBackend.when('GET', mockPkmn.endPoint.byName).respond(mockPkmn.results.byName);
    $httpBackend.when('GET', mockPkmn.endPoint.byId).respond(mockPkmn.results.byId);
    $httpBackend.when('GET', mockPkmn.endPoint.fail).respond(mockPkmn.results.fail);

    // effectiveness
    $httpBackend.when('GET', mockTypes.endPoint.water).respond(mockTypes.results.water);
    $httpBackend.when('GET', mockTypes.endPoint.normal).respond(mockTypes.results.normal);
    $controller = _$controller_;

    ctrl = $controller('opponentController', {
      $scope: $scope
    });

  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should load oppenent by name', function () {
    $scope.getOpponentInfo('blastoise');
    $httpBackend.flush();

    expect($scope.opponent.id).toBe(9);
    expect($scope.opponent.name).toBeTruthy(true);
    expect($scope.opponent.types.length).toBeGreaterThan(0);

    $scope.opponent = {};
    $scope.getOpponentInfo('canta-nope');
    $httpBackend.flush();
    expect($scope.opponent.name).toBeUndefined();
  });

  it('should load oppenent by ID', function () {
    $scope.getOpponentInfo('25');
    $httpBackend.flush();

    expect($scope.opponent.id).toBeTruthy();
    expect($scope.opponent.name).toBe('pikachu');
    expect($scope.opponent.types.length).toBeGreaterThan(0);
  });

  it('should show oppenent type effectiveness', function() {
    ctrl.getTypeEffectiveSummary('water');
    $httpBackend.flush();
    expect($scope.opponent.doubleDamageTo.length).toBeGreaterThan(0);
    expect($scope.opponent.halfDamageFrom.length).toBeGreaterThan(0);

    ctrl.getTypeEffectiveSummary('normal');
    $httpBackend.flush();

    expect($scope.opponent.doubleDamageTo.length).toBe(0);
    expect($scope.opponent.halfDamageFrom.length).toBe(0);
  });

  it('should remove my type from effectiveness');

  it('should work for multiple type pokemon');


  it('should show oppenent type weaknesses', function (){
    ctrl.getOppenentWeaknessSummary('water');
    $httpBackend.flush();

    expect($scope.opponent.doubleDamageFrom.length).toBeGreaterThan(0);
    expect($scope.opponent.halfDamageTo.length).toBeGreaterThan(0);
    expect($scope.opponent.noDamageTo.length).toBe(0);
  });
});
