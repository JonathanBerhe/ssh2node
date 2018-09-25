var parameter = require('./parameter');
var logger = require('./log');

// test command.
const cmd = new parameter('user.json');
cmd.get_commandSync('command.json');
cmd.get_authorizationSync('user.json');


// test log.
const log = new logger(__dirname + '/log.txt');
log.debug('hey');


log.debug('test finished.');