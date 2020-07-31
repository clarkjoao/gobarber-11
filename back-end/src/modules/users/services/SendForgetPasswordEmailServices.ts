import Users from '@modules/users/infra/typeorm/entities/Users';
import AppErros from '@shared/errors/AppErros';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('IUserTokenRepository')
        private userTokenRepository: IUserTokenRepository,
    ) {}
    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppErros('User not exists');
        }

        await this.userTokenRepository.generate(user.id);

        this.mailProvider.sendEmail(
            email,
            'Pedido de recuperação de senha recebido.',
        );
    }
}

export default CreateUserServices;
