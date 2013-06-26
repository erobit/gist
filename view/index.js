module['exports'] = function(options, callback) {

  var $ = this.$;
  var resource = require('resource');
  var r = resource.use('gist');

  // present an informative index of all the gists
  r.view.index.present(options, function(err, result) {
    if (err) { 
      $('#error').append('<pre>' + err.stack + '</pre>'); 
    }
    $('#main').html(result);
    return callback(null, $.html());
  });
};