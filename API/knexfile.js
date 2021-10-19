// Update with your config settings.

module.exports = {

	development: {
		client: 'mysql',
		version: '8.0',
		connection: {
			host: process.env.HOST || 'localhost',
			database: 'tfbern-inventory',
			user: 'root',
			password: 'admin',
			port: 3306
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},

	staging: {
		client: 'mysql',
		version: '8.0',
		connection: {
			host: 'mysql',
			database: 'kek',
			user: 'root',
			password: 'admin',
			port: 3306
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	},

	production: {
		client: 'mysql',
		version: '8.0',
		connection: {
			host: process.env.HOST || 'localhost',
			database: 'tfbern-inventory',
			user: 'admin',
			password: 'admin',
			port: 3307
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	}

};
