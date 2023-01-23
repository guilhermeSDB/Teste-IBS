import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongooseConnection from './config/mongooseConnection';

const app = express();
app.set('mongoose connection', mongooseConnection);
app.use(helmet());
app.use(cors());

export default app;
