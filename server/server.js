var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;
var _ = require('lodash');

var liveServer = require("live-server");

// live server listens to 9000
var params = {
    port: 9000, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "bin", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'scss', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);

// configure express to listen in 9001
var cids = [];
app.get('/', function(req, res, next) { res.send('Hi... Nothing to see, move along!!!'); });
var server = app.listen(9001);

var options = {
    debug: true
};

var peerjs = ExpressPeerServer(server, options);
app.use('/peerjs', peerjs);
app.get('/peerjs/clients', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    res.send(cids); 
});

peerjs.on('connection', function(id) {
    var foundClient = _.find(cids, {id: id});
    if(!foundClient){
        cids.push({id: id});
    }
});

peerjs.on('disconnect', function(id) {
    _.remove(cids, {id: id});
});

/*
// import our modules
var nodeStatic 	= require( 'node-static' );	// used for serving static files
var http		= require( 'http' );		// default node http server
var port		= 5858;						// NOTE: this is the same port as specified in launch.json

// create our file server config
var file = new nodeStatic.Server( 'bin', { 	// anything in the bin/ folder is served
	cache:0,								// no cache (only for testing)
	gzip:true								// gzip our assets
});

// create our basic server
http.createServer( function( request, response ) {
	request.addListener( 'end', function() {
		file.serve( request, response ); // any url asked for, just try and serve the file from bin/
	}).resume();
}).listen( port );
*/