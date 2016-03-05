// scaffold for angulars
var coreStorage;
var $httpBackend;
var mockAPI;
var rEndpoint = /(pokeapi)/;

describe('service: coreStorage', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_coreStorage_, _$httpBackend_) {
    $httpBackend = _$httpBackend_;
    $httpBackend.when('GET', rEndpoint)
      .respond({
        results: [
          {"name": "bulbasaur", "url": "..."},
          {"name": "ivysaur", "url": "..."},
          {"name": "venusaur", "url": "..."}
        ]
    });

    coreStorage = _coreStorage_;
  }));

  afterEach(function(){
    localStorage.removeItem('PKMN');

    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it('should get pkmn from local storage', function() {
    localStorage.setItem('PKMN', '[{"name": "localmon"}]');
    var result = coreStorage.getAllPkmn();

    expect(result).not.toBeUndefined();
    expect(result[0].name).toBe('localmon');
  });

  it('should hit api if no local storage', function() {
    expect(localStorage.PKMN).toBeUndefined();
    coreStorage.getAllPkmn();
    $httpBackend.flush();

    // even though storage has updated, it seems we need
    // to call again to get result
    var result = coreStorage.getAllPkmn();

    expect(localStorage.PKMN).not.toBeUndefined();
    expect(result[1].name).toBe('ivysaur');
  });
});
