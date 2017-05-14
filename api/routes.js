"use strict";

const Items = require("./handlers/items");

module.exports = [
	{
		method: "GET",
		path: "/api/items",
		handler: Items.find
	},
	{
		method: "GET",
		path: "/api/items/{id}",
		handler: Items.findOne
	},
	{
		method: "POST",
		path: "/api/items",
    // not for now: implement authentication
    // config: {
    //     auth: 'api'
    // },
		handler: Items.create
	},
	{
		method: "PUT",
		path: "/api/items/{id}",
    // not for now: implement authentication
    // config: {
    //     auth: 'api'
    // },
		handler: Items.update
	},
	{
		method: "DELETE",
		path: "/api/items/{id}",
    // not for now: implement authentication
    // config: {
    //     auth: 'api'
    // },
		handler: Items.delete
	}
];

