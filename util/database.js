const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointment-app', 'root', 'user@1234567', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;

