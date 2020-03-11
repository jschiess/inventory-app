
const knex = require('knex');

module.exports = knex({
	client: 'sqlite3',
	connection: { filename: 'database.sqlite', },
	path: 'database.sqlite',
	migrations: './migrations',
	seeds: './seeds',
	useNullAsDefault: true
});