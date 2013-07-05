var resource = require('resource');
var gist = resource.define('gist');
var http = resource.use('http');

gist.schema.description = 'a resource for creating gists'


// gist property definitions

gist.property('description', { 
  "description": "gist description",
  "type": "string"
});

gist.property('public', {
  "description": "gist privacy setting",
  "type": "boolean",
  "required": true
});

gist.property('files', {
  "description": "files that make up this gist",
  "type": "object",
  "required": true
});


// gist start - will be called automatically in future
// > https://github.com/bigcompany/resource/issues/21

var start = function(options, callback) {
  var async = require('async');
  async.parallel([
    // setup .view convention
    function(callback) {
      var view = resource.use('view');
      view.create({ path: __dirname + '/view' }, function(err, _view) {
          if (err) { return callback(err); }
          creature.view = _view;
          http.app.use(view.middle({view: _view, prefix: 'gist'}));
          return callback(null);
      });
    },
    // add gists property to user resource
    function(callback) {
      var user = resource.use('user');
      user.property('gists', {
        "description": "user gists",
        "type": "array",
        "items": {
          "type": "string",
          "description": "gist id"
        },
        "default": []
      });
      user.persist('memory');
      return callback(null);
    }], callback);
}

// gist method definitions 
// > http://ajaxorg.github.io/node-github/#gists

//gist.method('checkStar');
//gist.method('create');
//gist.method('delete');
//gist.method('deleteStar');
//gist.method('edit');
//gist.method('fork');
//gist.method('get');
//gist.method('getAll');
//gist.method('getFromUser');
//gist.method('public');
//gist.method('star');
//gist.method('starred');
gist.method('start', start, { description: "start gist resource" });


// gist persistence model

gist.persist('memory');


gist.dependencies = {
  'async': '*'
};

exports.gist = gist;
