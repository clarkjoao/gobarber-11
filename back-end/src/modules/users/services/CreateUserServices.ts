import Users from '@modules/users/infra/typeorm/entities/Users';
import AppErros from '@shared/errors/AppErros';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import { injectable, inject } from 'tsyringe';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}
    public async execute({ name, email, password }: IRequest): Promise<Users> {
        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (checkUserExist) {
            throw new AppErros('Email address already used');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserServices;
