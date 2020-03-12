const knexconfig = require('./knexfile');
let env = process.env.NODE_ENV;

module.exports = require('knex')(knexconfig[env]);
