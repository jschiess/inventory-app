

exports.seed = async function (knex) {

	// import packages
	var bcrypt = require('bcryptjs');

	// Deletes ALL existing entries
	await knex('locations').del()
		.then(function () {
			// Inserts seed entries
			return knex('locations').insert([
				{ PK_locations_ID: 1, locationsName: 'LOA03' },
				{ PK_locations_ID: 2, locationsName: 'LOA04' },
				{ PK_locations_ID: 3, locationsName: 'LOA10' }
			]);
		});
	// Deletes ALL existing entries
	await knex('types').del()
		.then(function () {
			// Inserts seed entries
			return knex('types').insert([
				{ PK_types_ID: 1, typesName: 'Tastatur' },
				{ PK_types_ID: 2, typesName: 'Bildschirm' },
				{ PK_types_ID: 3, typesName: 'Raspberry Pi' }
			]);
		});

	// Deletes ALL existing entries
	await knex('manufacturers').del()
		.then(function () {
			// Inserts seed entries
			return knex('manufacturers').insert([
				{ PK_manufacturers_ID: 1, manufacturersName: 'Samsung' },
				{ PK_manufacturers_ID: 2, manufacturersName: 'Logitech' },
				{ PK_manufacturers_ID: 3, manufacturersName: 'Raspberry Pi' }
			]);
		});

	// Deletes ALL existing entries
	await knex('itemsClass').del()
		.then(function () {
			// Inserts seed entries
			return knex('itemsClass').insert([
				{
					PK_itemsClass_ID: 1,
					itemsClassName: 'Raspberry PI model 3s 16gb ram',
					description: 'micro computer',
					FK_types_ID: 3,
					FK_manufacturers_ID: 3
				},
			]);
		});

	// Deletes ALL existing entries
	await knex('items').del()
		.then(async function () {
			// Inserts seed entries
			var items = [];

			for (var i = 0; i < 100; i++) {
				items.push(
					{
						serialnumber: Math.floor(Math.random() * 10000),
						FK_locations_ID: Math.floor(Math.random() * 3) + 1,
						FK_itemsClass_ID: 1,
					}
				);
			}
			console.log(items);


			await knex('items').insert(items);
		}
		);

	// Deletes ALL existing entries
	await knex('roles').del()
		.then(function () {
			// Inserts seed entries
			return knex('roles').insert([
				{ PK_roles_ID: 1, rolesName: 'teacher' },
				{ PK_roles_ID: 2, rolesName: 'student' },
			]);
		});

	var users = [
		{
			PK_users_ID: 1,
			username: 'scjo',
			firstname: 'josiah',
			lastname: 'schiess',
			password: 'kek',
			role: 1,
		},
		// {
		// 	username: 'peju',
		// 	password: 'iluvtfBern',
		// 	role: 1,
		// },
		// {
		// 	username: 'sika',
		// 	password: 'okBoomer',
		// 	role: 1,
		// },
		// {
		// 	username: 'in17scma',
		// 	password: 'gibbix12345',
		// 	role: 2,
		// },
		// {
		// 	username: 'in19sika',
		// 	password: 'passwort1',
		// 	role: 2,
		// },
		// {
		// 	username: 'In18frch',
		// 	password: 'Csgopro1337',
		// 	role: 2,
		// },
	];

	// Deletes ALL existing entries
	await knex('users').del()
		.then(async function () {
			// Inserts seed entries
			for (var user of users)
				await knex('users').insert([
					{
						username: user.username,
						firstname: user.firstname,
						lastname: user.lastname,
						password: await bcrypt.hash(user.password, 10),
						FK_roles_ID: user.role,
					},
				]);
		});
};
