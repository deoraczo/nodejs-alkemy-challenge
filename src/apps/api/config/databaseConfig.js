const envPath = () => {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === 'test') {
      return '.env.test';
  }

  if (nodeEnv === 'dev') {
      return '.env.dev';
  }
  

  return '.env'
}

require('dotenv').config({
  path: envPath()
});

const databaseConfig = {
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT || "mysql",
    storage: "./__tests__/database.sqlite",
    operatorsAliases: 0,
    logging: false,
    define: {
      timestamps: false,
      underscored: true,
      underscoredAll: true
    }
}

module.exports = databaseConfig;