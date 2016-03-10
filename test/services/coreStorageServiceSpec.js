// scaffold for angulars
var coreStorage;
var $httpBackend;

describe('service: coreStorage', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_coreStorage_, _$httpBackend_) {
    localStorage.removeItem('PKMN');
    localStorage.removeItem('PKMN_party');

    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', mockPkmn.endPoint.all).respond(mockPkmn.results.all);

    // this only has one result
    $httpBackend.when('GET', mockParty.endPoint).respond(mockParty.results);

    coreStorage = _coreStorage_;
  }));

  afterEach(function(){
    localStorage.removeItem('PKMN');

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get pkmn from local storage', function(){
    localStorage.setItem('PKMN', '[{"name": "squirtle"}, {"name": "wartortle"}, {"name": "blastoise"} ]');
    var result = coreStorage.getAllPkmn();

    expect(Array.isArray(result)).toBe(true);
    expect(result[2].name).toBe('blastoise');

    // should still be from new fake local
    var additionalCall = coreStorage.getAllPkmn();
    expect(additionalCall[0].name).toBe('squirtle');
    expect($httpBackend.flush).toThrow();
  });

  it('should call api when there is no localStorage', function(){
    var result = coreStorage.getAllPkmn();
    expect($httpBackend.flush).not.toThrow();

    var additionalCall = coreStorage.getAllPkmn();
    expect($httpBackend.flush).toThrow();
  });

  it('should get pkmn party from local storage', function() {
    localStorage.setItem('PKMN_party', '[{"name" : "eevee"}, {"name" : "vaporeon"}]');
    var result = coreStorage.getParty();
    expect($httpBackend.flush).toThrow();

    expect(result.length).not.toBe(null);
    expect(result[0].name).toBe('eevee');
  });

  it('should resquest pkmn party', function() {
    var apiCall = coreStorage.getParty();
    expect($httpBackend.flush).not.toThrow();

    var additionalCall = coreStorage.getParty();
    expect($httpBackend.flush).toThrow();
  });
});
