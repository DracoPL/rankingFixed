/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _apiThingThingModel = require('../api/thing/thing.model');

var _apiThingThingModel2 = _interopRequireDefault(_apiThingThingModel);

var _apiUserUserModel = require('../api/user/user.model');

var _apiUserUserModel2 = _interopRequireDefault(_apiUserUserModel);

var _apiPlayerPlayerModel = require('../api/player/player.model');

var _apiPlayerPlayerModel2 = _interopRequireDefault(_apiPlayerPlayerModel);

var _apiCompetitionsCompetitionsModel = require('../api/competitions/competitions.model');

var _apiCompetitionsCompetitionsModel2 = _interopRequireDefault(_apiCompetitionsCompetitionsModel);

var _apiMatchesMatchesModel = require('../api/matches/matches.model');

var _apiMatchesMatchesModel2 = _interopRequireDefault(_apiMatchesMatchesModel);

var _apiStandingStandingModel = require('../api/standing/standing.model');

var _apiStandingStandingModel2 = _interopRequireDefault(_apiStandingStandingModel);

_apiThingThingModel2['default'].find({}).remove().then(function () {
  _apiThingThingModel2['default'].create({
    name: 'Development Tools',
    info: 'Integration with popular tools such as Bower, Grunt, Babel, Karma, ' + 'Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, ' + 'Stylus, Sass, and Less.'
  }, {
    name: 'Server and Client integration',
    info: 'Built with a powerful and fun stack: MongoDB, Express, ' + 'AngularJS, and Node.'
  }, {
    name: 'Smart Build System',
    info: 'Build system ignores `spec` files, allowing you to keep ' + 'tests alongside code. Automatic injection of scripts and ' + 'styles into your index.html'
  }, {
    name: 'Modular Structure',
    info: 'Best practice client and server structures allow for more ' + 'code reusability and maximum scalability'
  }, {
    name: 'Optimized Build',
    info: 'Build process packs up your templates as a single JavaScript ' + 'payload, minifies your scripts/css/images, and rewrites asset ' + 'names for caching.'
  }, {
    name: 'Deployment Ready',
    info: 'Easily deploy your app to Heroku or Openshift with the heroku ' + 'and openshift subgenerators'
  });
});

_apiPlayerPlayerModel2['default'].find({}).remove().then(function () {
  _apiPlayerPlayerModel2['default'].create({
    name: 'Domingo',
    rank: 133.5
  }, {
    name: 'Rotti',
    rank: 160.0
  }, {
    name: 'Ninjaska',
    rank: 133.5
  }, {
    name: 'Warrior1980',
    rank: 139.6
  }, {
    name: 'Juniooor7',
    rank: 104.8
  }, {
    name: 'Shawass',
    rank: 120.2
  }).then(function () {
    console.log('finished populating Players');
  });
});

_apiCompetitionsCompetitionsModel2['default'].find({}).remove().then(function () {

  _apiPlayerPlayerModel2['default'].find().exec().then(function (players) {

    var newCompetition = {
      name: 'Polish Open \'16',
      type: 'bloodbowl',
      players: players,
      rounds: [1, 2],
      currentRound: 2,
      started: true
    };

    _apiCompetitionsCompetitionsModel2['default'].create(newCompetition, function (err, competition) {

      _apiStandingStandingModel2['default'].find({}).remove().then(function () {
        var score = 1;

        var roundOneStanding = players.map(function (item) {
          var newStanding = {
            competition: {
              id: competition._id,
              name: competition.name
            },
            player: {
              id: item._id,
              name: item.name
            },
            score: {
              points: score,
              td: score + 2,
              cas: score + 5
            },
            round: 1
          };
          score = score + 2;

          return newStanding;
        });
        var roundTwoStanding = players.map(function (item) {
          var newStanding = {
            competition: {
              id: competition._id,
              name: competition.name
            },
            player: {
              id: item._id,
              name: item.name
            },
            score: {
              points: score,
              td: score + 2,
              cas: score + 5
            },
            round: 2
          };
          score = score + 2;

          return newStanding;
        });

        _apiStandingStandingModel2['default'].create(roundOneStanding.concat(roundTwoStanding)).then(function () {
          console.log('Standings added');
        });
      });

      _apiMatchesMatchesModel2['default'].find({}).remove().then(function () {
        _apiPlayerPlayerModel2['default'].find().exec().then(function (players) {

          var shuffledPlayers = shuffle(players);
          var playersCount = shuffledPlayers.length;
          var matches = [];
          for (var i = 0; playersCount > i; i = i + 2) {
            var matchPlayers = shuffledPlayers.splice(0, 2);
            var roundOneMatch = {
              competition: {
                id: competition._id,
                name: competition.name
              },
              home: {
                id: matchPlayers[0]._id,
                name: matchPlayers[0].name,
                score: {
                  points: 0,
                  td: 0,
                  cas: 0
                }
              },
              away: {
                id: matchPlayers[1]._id,
                name: matchPlayers[1].name,
                score: {
                  points: 0,
                  td: 0,
                  cas: 0
                }
              },
              round: 1,
              played: true
            };

            matches.push(roundOneMatch);

            var roundTwoMatch = {
              competition: {
                id: competition._id,
                name: competition.name
              },
              home: {
                id: matchPlayers[0]._id,
                name: matchPlayers[0].name,
                score: {
                  points: 0,
                  td: 0,
                  cas: 0
                }
              },
              away: {
                id: matchPlayers[1]._id,
                name: matchPlayers[1].name,
                score: {
                  points: 0,
                  td: 0,
                  cas: 0
                }
              },
              round: 2
            };

            matches.push(roundTwoMatch);
          }

          _apiMatchesMatchesModel2['default'].create(matches).then(function () {
            console.log('Matches added');
          });
        });
      });
    });

    var testCompetition = {
      name: 'My test competition',
      type: 'bloodbowl',
      players: players
    };

    _apiCompetitionsCompetitionsModel2['default'].create(testCompetition);
  });
});

_apiUserUserModel2['default'].find({}).remove().then(function () {
  _apiUserUserModel2['default'].create({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  }).then(function () {
    console.log('finished populating users');
  });
});

function shuffle(array) {
  var m = array.length,
      t,
      i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}
//# sourceMappingURL=seed.js.map
