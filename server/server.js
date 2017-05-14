"use strict";

const Hapi = require("hapi");
const server = new Hapi.Server();

server.bind({
	apiBaseUrl: "http://localhost:5000/api",
	webBaseUrl: "http://localhost:5000",
	server: server
});

server.connection({ port:5000, routes: { cors: true } });

server.register([
	require("./../api"),
	require("inert")
], (err) => {
	if(err) {
		throw err;
	}

	server.route(require("./routes"));

	server.start(() => {
		console.log("Started server at ", server.info.uri);
	});
});