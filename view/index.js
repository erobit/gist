module['exports'] = function(options, callback) {

  var $ = this.$;
  var resource = require('resource');
  var r = resource.use('gist');

  return callback(null, 'foshizzle');
};