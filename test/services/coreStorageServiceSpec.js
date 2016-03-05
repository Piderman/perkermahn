// scaffold for angulars
var coreStorage;

describe('service: coreStorage', function() {
  beforeEach(module('pkmn'));

  beforeEach(inject(function(_coreStorage_){
    coreStorage = _coreStorage_;

  }));

  afterEach(function(){
    localStorage.removeItem('PKMN');
  });

  it('should get pkmn from local storage', function() {
    localStorage.setItem('PKMN', '[{"name": "localmon"}]');
    var result = coreStorage.getAllPkmn();

    expect(result).not.toBeUndefined();
    expect(result[0].name).toBe('localmon');
  });

  it('should hit api if no local storage', function() {
    var coreStorage = {
      getAllPkmn : function () {
        return [
          {"name": "bulbasaur", "url": "..."},
          {"name": "ivysaur", "url": "..."},
          {"name": "venusaur", "url": "..."}
        ]
      }
    };
    spyOn(coreStorage, 'getAllPkmn').and.callThrough();

    var results = coreStorage.getAllPkmn();

    expect(localStorage.PKMN).toBeUndefined();
    expect(coreStorage.getAllPkmn).toHaveBeenCalled();
    expect(results.length).toBe(3);
  });
});
