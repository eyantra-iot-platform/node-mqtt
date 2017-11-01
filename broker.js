const mosca = require('mosca');
const _ = require('lodash');
let app = require('./server.js');
let http = require('http');
var ascoltatore = {
	//using ascoltatore
	type: 'mongo',
	url: 'mongodb://localhost:27017/mqtt',
	pubsubCollection: 'browser-mqtt',
	mongo: {}
};

var settings = {
	// port: 1883,
	backend: ascoltatore
};

var server = new mosca.Server(settings);

let httpServer = app.listen(3000, () => {
	console.log('Server running on port 3000!');
});

server.attachHttpServer(httpServer);

server.on('clientConnected', function(client) {
	console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
	console.log('Published', _.isBuffer(packet.payload)? packet.payload.toString(): packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
	console.log('Mosca server is up and running');
}

