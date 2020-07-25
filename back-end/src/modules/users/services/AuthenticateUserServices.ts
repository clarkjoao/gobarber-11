import Users from '@modules/users/infra/typeorm/entities/Users';
import { sign } from 'jsonwebtoken';
import AppErros from '@shared/errors/AppErros';
import jwtConfig from '../../../config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Users;
    token: string;
}
@injectable()
class AuthenticateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppErros('Incorrect Email/Password combination', 401);
        }

        const checkPass = await this.hashProvider.compareHash(
            password,
            user.password,
        );

        if (!checkPass) {
            throw new AppErros('Incorrect Email/Password combination', 401);
        }
        const { secret, expiresIn } = jwtConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserServices;
