import express from 'express';
import usersRouter from './routes/users';

const app = express();

app.use(express.json());
app.use('/api/users', usersRouter);

export default app;