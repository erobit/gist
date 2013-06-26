var resource = require('resource');
var gist = resource.define('gist');

gist.schema.description = 'big resource for creating gists'


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


// gist init - will be called automatically in future
// > https://github.com/bigcompany/resource/issues/21
// Note: 
//	It would be great to be able to selectively enable 
//	resource features, as some people will want to use
//	only the schema, others will want views, etc...

var init = function(options, callback) {
	var async = require('async');
	async.parallel([
		// setup .view convention
		function(callback) {
			var view = resource.use('view');
			view.create({path: __dirname + '/view' }, function(err, _view) {
				if(err) { return callback(err); }
				gist.view = _view;
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
gist.method('init', init, { description: "init gist resource" });


// gist persistence model

gist.persist('memory');


gist.dependencies = {
	'async': '*'
};

exports.gist = gist;
