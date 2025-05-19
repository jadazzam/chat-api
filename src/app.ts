import express from 'express';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import AuthMiddleware from "./middlewares/auth";

const app = express();

app.use(express.json());
const skipAuthRoutes = ['/signin', '/signup'];

app.use((req, res, next) => {
    if (skipAuthRoutes.includes(req.path)) {
        return next();
    }
    return AuthMiddleware.verifyToken(req, res, next);
});
app.use(authRouter)
app.use('/users', usersRouter);
export default app;