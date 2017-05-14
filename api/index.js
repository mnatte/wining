"use strict";

// const Hapi = require('hapi');
const Sqlite3 = require("sqlite3");
const Path = require("path");

// const server = new Hapi.Server();
const DB_FILE = Path.resolve(__dirname, "data/wining.sqlite");

exports.register = function (server, options, next) {
	const db = new Sqlite3.Database(DB_FILE);

	// make sure we can access the db from all modules that server uses through 'this.db'; e.g. the handlers can access it by 'this.db'
	server.bind({db: db});
	server.app.db = db;

	// server.route(require("./routes"));

	server.register([
	    	{ register: require('./plugins/appellations') },
	    	{ register: require('./plugins/countries') },
	    	{ register: require('./plugins/domains') },
	    	{ register: require('./plugins/regions') },
	    	{ register: require('./plugins/subregions') },
	    	{ register: require('./plugins/cuvees') },
	    	{ register: require('./plugins/wines') },
	    	{ register: require('./plugins/buys') }
		], (err) => {
		    if (err) {
		        throw err;
		    }
		});

	next();
};

exports.register.attributes = {
	pkg: require("./package.json")
};

// server.start(() => {
//     console.log('Server listening at:', server.info.uri)
// });