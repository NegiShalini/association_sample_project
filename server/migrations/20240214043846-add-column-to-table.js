'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.addColumn('students', 'password',{
        type: Sequelize.STRING,
        set(value) {
          const hashedPassword = bcrypt.hashSync(value, 7);
          this.setDataValue('password', hashedPassword);
        }
      });
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.removeColumn('students','password');
     
  }
};
