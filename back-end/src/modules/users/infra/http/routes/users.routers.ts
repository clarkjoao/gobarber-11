import { Router, response } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserServices from '@modules/users/services/CreateUserServices';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '../../typeorm/repositories/UsersRespository';
import { container } from 'tsyringe';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserServices);
    const user = await createUser.execute({ email, name, password });
    delete user.password;
    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    ensureAuthenticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);
export default usersRouter;
