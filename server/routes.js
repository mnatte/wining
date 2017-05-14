"use strict";

const Pages = require("./handlers/pages");
const Assets = require("./handlers/assets");

// incoming request		Matching routes
// ================		===============
// GET /index.html		method: 'GET'
// 						path: '/index.{ext}'
// 						method: 'GET' path: 'index.html' --> Most specific route chosen and handler executed
// 						method: 'GET' path: '/{param*}'

// GET /logo.png		method: 'GET' path: '/{param*}' --> No other matching routes; catch-all route chosen and handler executed

module.exports = [
	{
		method: "GET",
		path: "/",
		handler: Pages.home
	},
	{
		method: "GET",
		path: "/{param*}",
		handler: Assets.servePublicDirectory
	}
];
