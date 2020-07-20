import Users from '../models/Users';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import AppErros from '../errors/AppErros';
import jwtConfig from '../config/auth';
interface Request {
    email: String;

    password: string;
}

interface Response {
    user: Users;
    token: string;
}
class AuthenticateUserServices {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(Users);

        const user = await usersRepository.findOne({
            where: { email },
        });

        if (!user) {
            throw new AppErros('Incorrect Email/Password combination', 401);
        }

        const checkPass = await compare(password, user.password);

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
