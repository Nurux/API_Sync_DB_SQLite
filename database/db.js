require('dotenv').config();

console.log(process.env.PATCH_DATABASE);

const Database = require('better-sqlite3');
const db = new Database(process.env.PATCH_DATABASE, { verbose: console.log });

const row = db.prepare('SELECT * FROM Usuario').all();
console.log(row);

module.exports = { db }