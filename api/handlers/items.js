"use strict";

exports.find = function (request, reply) {
	let sql = "SELECT * FROM items";
	const params = [];
	if (request.query.item) {
		sql += " WHERE name = ?";
		params.push(request.query.item);
	}
	this.db.all(sql, params, (err, results) => {
		if (err) {
			throw err;
		}
		reply(results);
	});
};

exports.findOne = function (request, reply) {
	this.db.get("SELECT * FROM items WHERE id = ?",
            [request.params.id],
            (err, result) => {
	if (err) {
		throw err;
	}
	if (typeof result !== "undefined") {
		return reply(result);
	}
	return reply("Not found").code(404);
});
};
exports.create = function (request, reply) {
	const sql = "INSERT INTO items (name) VALUES (?)";
	this.db.run(sql,
		[
			request.payload.name
		],
    err => {
	if (err) {
		throw err;
	}
	reply({status: "ok"});
});
};
exports.update = function (request, reply) {
	const sql = "UPDATE items SET name = ? WHERE id = ?";
	this.db.run(sql,
		[
			request.payload.name,
			request.params.id
		],
    err => {
	if (err) {
		throw err;
	}
	reply({status: "ok"});
});
};
exports.delete = function (request, reply) {
	this.db.run("DELETE FROM items WHERE id = ?",
            [request.params.id],
            (err, result) => {
	if (err) {
		throw err;
	}
	if (typeof result !== "undefined") {
		return reply(result);
	}
	reply({status: "ok"});
});
};
