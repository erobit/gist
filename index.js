var resource = require('resource');
var gist = resource.define('gist');

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


// gist persistence model

gist.persist('memory');


gist.dependencies = {
//	'async': '*'
};

exports.gist = gist;
