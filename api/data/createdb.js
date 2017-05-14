var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("wining.sqlite");

// db.serialize(function() {
//   db.run("DROP TABLE countries");
// });

// db.serialize(function () {
// 	db.run("CREATE TABLE items (id INTEGER PRIMARY KEY, name VARCHAR(50))");
// });

// db.serialize(function () {
// 	db.run("CREATE TABLE cuvees (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, name	VARCHAR(50) NOT NULL, domaine_id INTEGER NOT NULL,	color VARCHAR(50) NOT NULL,appellation_id INTEGER NOT NULL,FOREIGN KEY(domaine_id) REFERENCES domaines(id), FOREIGN KEY(appellation_id) REFERENCES appellations(id));");
// });

// db.serialize(function () {
// 	db.run("CREATE TABLE wines (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, cuvee_id INTEGER NOT NULL, vintage INTEGER NOT NULL,	alcoholpercentage DOUBLE NOT NULL, ml INTEGER NOT NULL, stock INTEGER, FOREIGN KEY(cuvee_id) REFERENCES cuvees(id));");
// });

db.serialize(function () {
	db.run("CREATE TABLE buyentries (id	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, wine_id INTEGER NOT NULL, price DOUBLE NOT NULL,	amount INTEGER NOT NULL, buysession_id INTEGER NOT NULL, FOREIGN KEY(buysession_id) REFERENCES buys(id));");
});

// db.serialize(function() {
//   db.run("ALTER TABLE buys ADD COLUMN date VARCHAR(10)");
// });


// db.serialize(function() {
//   db.run("INSERT INTO countries(name) values('Frankrijk')");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE regions (id INTEGER PRIMARY KEY, country_id INTEGER, name VARCHAR(50), FOREIGN KEY(country_id) REFERENCES countries(id))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE subregions (id INTEGER PRIMARY KEY, region_id INTEGER, name VARCHAR(50), FOREIGN KEY(region_id) REFERENCES regions(id))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE appellations (id INTEGER PRIMARY KEY, subregion_id INTEGER, name VARCHAR(50), FOREIGN KEY(subregion_id) REFERENCES subregions(id))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE domaines (id INTEGER PRIMARY KEY, name VARCHAR(50), main_appellation_id INTEGER, FOREIGN KEY(main_appellation_id) REFERENCES appellations(id))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE grapes (id INTEGER PRIMARY KEY, name VARCHAR(50), color VARCHAR(10))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE wines (id INTEGER PRIMARY KEY, domaine_id INTEGER, appellation_id INTEGER, name VARCHAR(50), color VARCHAR(10), alcoholpercentage DOUBLE, FOREIGN KEY(domaine_id) REFERENCES domaines(id), FOREIGN KEY(appellation_id) REFERENCES appellations(id))");
// });

// db.serialize(function() {
//   db.run("ALTER TABLE wines ADD COLUMN ml INTEGER");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE winegrapes (wine_id INTEGER, grape_id INTEGER, FOREIGN KEY(wine_id) REFERENCES wines(id), FOREIGN KEY(grape_id) REFERENCES grapes(id))");
// });

// db.serialize(function() {
//   db.run("DROP TABLE domaines");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE stock (wine_id INTEGER, amount INTEGER, FOREIGN KEY(wine_id) REFERENCES wines(id))");
// });

// db.serialize(function() {
//   db.run("CREATE TABLE buys (wine_id INTEGER, price DOUBLE, location VARCHAR(50), FOREIGN KEY(wine_id) REFERENCES wines(id))");
// });

db.close();
