'use strict';

const md5 = require("md5");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('User_admins', [{
      username: 'admin',
      password: md5('secret'),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User_admins', null, {});
  }
};
