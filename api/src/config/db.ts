import dotenv from 'dotenv';
dotenv.config();

const database = {
  local:{
    localDatabaseUrl: process.env.DB_URI as string,
    port: parseInt(process.env.PORT as string, 10),
    secret: 'password'
  }
}

export default database;