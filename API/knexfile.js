// Update with your config settings.
console.log(process.env.HOST);

module.exports = {

	development: {
		client: 'sqlite3',
		connection: { filename: 'database.sqlite', },
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		},
		useNullAsDefault: true
	},

	staging: {
		client: 'mysql',
		version: '8.0',
		connection: {
			host: 'mysql',
			database: 'kek',
			user: 'root',
			password: 'admin',
			// insecureAuth: true,
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
			database: 'kek',
			user: 'root',
			password: 'admin',
			// insecureAuth: true,
			port: 3306
		},
		migrations: {
			directory: './database/migrations'
		},
		seeds: {
			directory: './database/seeds'
		}
	}

};
