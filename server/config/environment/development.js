'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://172.18.0.2/angularfullstack-dev'
  },

  // Seed database on startup
  seedDB: true

};
