const utilities = require("../misc/utilities");
const logger = utilities.getLogger();

const mysql = require('mysql');

const con = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DATABASE,
	connectionLimit: 3
});

con.connect(function(err) {
	if (err) throw err;
	console.log("connection to database successful");
})

module.exports = {
	fetchProperties: () => {
		return new Promise((resolve, reject) => {
			con.query("SELECT * FROM property", function(err, result, fields) {
			if (err) return reject(err);
			//console.log(result);
			return resolve(result);
		});
	})},
	fetchProperty: (id) => {
		return new Promise((resolve, reject) => {
			con.query("SELECT * FROM property WHERE id=?", [id], function(err, result, fields) {
			if (err) return reject(err);
			return resolve(result);
		});
	})},
	addProperty: (address, city, state, zip) => {
		return new Promise((resolve, reject) => {
			con.query("INSERT INTO property (address, city, state, zip) VALUES (?, ?, ?, ?)", [address, city, state, zip], function(err, result, fields) {
			if (err) return reject(err);
			return resolve(result);
		});
	})},
	deleteProperty: (id) => {
		return new Promise((resolve, reject) => {
			con.query("DELETE FROM property WHERE id=?", [id], function(err, result, fields) {
				if (err) 
					return reject(err);
				return resolve(result);
			}
		);
	})},
	updateProperty: (id, address, city, state, zip) => {
		return new Promise((resolve, reject) => {
			const columnSet = {};
			if (address) columnSet.address = address;
			if (city) columnSet.city = city;
			if (state) columnSet.state = state;
			if (zip) columnSet.zip = zip;
			con.query("UPDATE property SET ? WHERE id = ?", [columnSet, id], function(err, result, fields) {
				if (err)
					return reject(err);
				return resolve(result);
			}
		);
	})}
};
