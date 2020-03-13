const knexconfig = require('./knexfile');
let env = process.env.NODE_ENV || 'production';

module.exports = require('knex')(knexconfig[env]);
