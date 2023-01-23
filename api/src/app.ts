import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import router from './router';

const app = express();

app.use(helmet());
app.use(cors());

export default app;
