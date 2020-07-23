import { Router } from 'express';
import AuthenticateUserServices from '@modules/users/services/AuthenticateUserServices';
const sessionsRouter = Router();
import { container } from 'tsyringe';
sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;
    const authenticateUser = container.resolve(AuthenticateUserServices);
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });
    delete user.password;
    return response.json({ user, token });
});

export default sessionsRouter;
