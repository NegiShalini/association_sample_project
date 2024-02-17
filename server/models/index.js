'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
console.log("config " + JSON.stringify(config)) // Corrected to log the entire config object

const db = {};
let sequelize;

// Initialize Sequelize instance
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Initialize models
async function initializeModels() {
  const files = fs.readdirSync(__dirname).filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

  for (const file of files) {
    try {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    } catch (error) {
      console.error(`Error initializing model from file ${file}:`, error);
    }
  }

  // Associate models
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}

initializeModels()
  .then(() => {
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    console.log('Models initialized successfully');
  })
  .catch(error => {
    console.error('Error initializing models:', error);
  });

module.exports = db;
