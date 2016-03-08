var rEndpoint = {
  byId : /type\/\d/,
  electric :/type\/electric/,
  poison : /type\/poison/,
  ghost : /type\/ghost/
};

var typeResults = {
  electric : {
    "name": "electric",
    "damage_relations": {
      "no_damage_to": [{"name": "ground"} ],
      "half_damage_to": [{"name": "grass"}, {"name": "electric"}, {"name": "dragon"} ],
      "double_damage_to": [{"name": "flying"}, {"name": "water"} ],
      "no_damage_from": [],
      "half_damage_from": [{"name": "flying"}, {"name": "steel"}, {"name": "electric"} ],
      "double_damage_from": [{"name": "ground"} ]
    }
  },
  ghost: {
    "name": "ghost",
    "damage_relations": {
      "no_damage_to": [{"name": "normal"} ],
      "half_damage_to": [{"name": "dark"} ],
      "double_damage_to": [{"name": "ghost"}, {"name": "psychic"} ],
      "no_damage_from": [{"name": "normal"}, {"name": "fighting"} ],
      "half_damage_from": [{"name": "poison"}, {"name": "bug"} ],
      "double_damage_from": [{"name": "ghost"}, {"name": "dark"} ]
    },
  },
  poison : {
    "name": "poison",
    "damage_relations": {
      "no_damage_to": [{"name": "steel"} ],
      "half_damage_to": [{"name": "poison"}, {"name": "ground"}, {"name": "rock"}, {"name": "ghost"} ],
      "double_damage_to": [{"name": "grass"}, {"name": "fairy"} ],
      "no_damage_from": [],
      "half_damage_from": [{"name": "fighting"}, {"name": "poison"}, {"name": "bug"}, {"name": "grass"}, {"name": "fairy"} ],
      "double_damage_from": [{"name": "ground"}, {"name": "psychic"} ]
    }
  }
};


var mockTypes = {
  endPoint: rEndpoint,
  results: typeResults
};