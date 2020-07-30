import AppErros from '@shared/errors/AppErros';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider,
    ) {}
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(user_id);
        console.log(user);
        if (!user) {
            throw new AppErros(
                `Only authenticated users can change avatar.`,
                401,
            );
        }

        if (user?.avatar) {
            await this.storageProvider.deleteFile(user.avatar);
        }
        const fileName = await this.storageProvider.saveFile(avatarFilename);

        user.avatar = fileName;

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;