// import packages
var express = require('express');
const { Users } = require('../models/all');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// initialize router
var router = express.Router();

// login path
router.post('/login', async (req, res) => {

	let { username, password } = req.body;

	try {
		var user = await Users.query()
			.innerJoin('roles', 'roles.PK_roles_ID', 'users.FK_roles_ID')
			.where({ username })
			.select('roles.*', 'users.*')
			.first();
	} catch (error) {
		console.error(error);
		res.sendStatus(403);
	}

	let databasePassword = user.password;

	if (typeof user !== 'undefined' && await bcrypt.compare(password, databasePassword)) {
		// tokendata is send separate to the token
		var tokenData = {
			userId: user.PK_users_ID,
			username: user.username,
			role: user.rolesName
		};
		var token = jwt.sign(tokenData, process.env.JWT_TOKEN || 'secret');
		var auth = 'Bearer ' + token;
		res.send({ auth, tokenData });
	} else {
		res.statusStatus(403);
	}
});

// export the router
module.exports = router;
