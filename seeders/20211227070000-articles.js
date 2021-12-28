'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Articles', [{
      title: 'Feel Special',
      body: 'You make me feel special',
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'TT',
      body: 'Im like TT',
      approved: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};
