var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("wining.sqlite");

db.serialize(function () {
	db.run("INSERT INTO items(name) values('Something'),('Another thing'),('Yet another one')");
});
