import Users from '@modules/users/infra/typeorm/entities/Users';
import AppErros from '@shared/errors/AppErros';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

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
    ) {}
    public async execute({ email }: IRequest): Promise<void> {
        const checkUserExist = await this.usersRepository.findByEmail(email);

        if (!checkUserExist) {
            throw new AppErros('User not exists');
        }

        this.mailProvider.sendEmail(
            email,
            'Pedido de recuperação de senha recebido.',
        );
    }
}

export default CreateUserServices;
