// scaffold for angulars
var infoServices;
var $httpBackend;

describe('service: Pkmn Info', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_infoServices_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;

    $httpBackend.when('GET', mockPkmn.endPoint.byId).respond(mockPkmn.results.id);
    $httpBackend.when('GET', mockPkmn.endPoint.byName).respond(mockPkmn.results.name);

    $httpBackend.when('GET', mockTypes.endPoint.poison).respond(mockTypes.results.poison);
    $httpBackend.when('GET', mockTypes.endPoint.byId).respond(mockTypes.results.electric);

    infoServices = _infoServices_;
  }));

  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should hit individual pkmn by name/id endpoint', function() {
    infoServices.getPkmnByName('gastly');
    expect($httpBackend.flush).not.toThrow();

    infoServices.getPkmnByName('25');
    expect($httpBackend.flush).not.toThrow();
  });

  it('should hit pkmn type by name/id endpoint', function () {
    infoServices.getTypeByName('poison');
    expect($httpBackend.flush).not.toThrow();

    infoServices.getTypeByName('2');
    expect($httpBackend.flush).not.toThrow();
  });
});
