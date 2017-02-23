// flightplan.js
var plan = require('flightplan');

var appName = 'app';
var username = 'ubuntu';
var startFile = 'server/index.js';

var tmpDir = appName+'-'+ new Date().getTime();
// // configuration
// plan.target('staging', {
//   host: 'staging.example.com',
//   username: 'pstadler',
//   agent: process.env.SSH_AUTH_SOCK
// });

plan.target('production', [
  {
    host: '54.154.224.244',
    username: 'ubuntu',
    agent: process.env.SSH_AUTH_SOCK,
    privateKey: '/home/michal/.ssh/aws-ranking.pem'
  },
]);

// run commands on localhost
// plan.local(function(local) {
//   local.log('Run build');
//   local.exec('gulp build');

//   local.log('Copy files to remote hosts');
//   var filesToCopy = local.exec('git ls-files', {silent: true});
//   // rsync files to all the target's remote hosts
//   local.transfer(filesToCopy, '/tmp/' + tmpDir);
// });

plan.local(function(local) {
  // uncomment these if you need to run a build on your machine first
  local.log('Building dist');
  local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('find ./dist', {silent: true});

  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + '/dist' + ' ~/' + tmpDir, {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
  remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
  remote.exec('forever start ~/'+appName+'/'+startFile);
});

// run more commands on localhost afterwards
plan.local(function(local) { /* ... */ });
// ...or on remote hosts
plan.remote(function(remote) { /* ... */ });