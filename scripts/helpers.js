var _ = require('../bower_components/lodash/lodash.js');
var data;

// fires before generation so we can get data in one go
hexo.on('generateBefore', function(){
  data = hexo.locals.get('data');
});

// eg getAllMoveTypeStats('weak', 'max').title
hexo.extend.helper.register('getAllMoveTypeStats', function(type, minOrMax){
  var TYPES = data.pokemonTypes;

  var counts = [];
  var amount = null;
  var matchedTypes = [];
  var results = []

  TYPES.forEach(function(pkmnType){
    counts.push(pkmnType[type].length);
  });

  counts = _.uniq(counts);
  amount = _[minOrMax](counts);

  matchedTypes = _.filter(TYPES, function(obj) {
    return obj[type].length === amount;
  });

  results = _.map(matchedTypes, 'title');

  return {
    title: results.join(', '),
    count: amount
  };
});
