import 'reflect-metadata';
import AuthenticateUserServices from './AuthenticateUserServices';
import CreateUserServices from './CreateUserServices';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AppError from '@shared/errors/AppErros';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

describe('CreateUser', () => {
    it('shoube be to able to authenticate', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserServices = new AuthenticateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUserServices = new CreateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUserServices.execute({
            email: 'teste@none.com',
            name: 'Teste teste',
            password: '123456',
        });
        const response = await authenticateUserServices.execute({
            email: 'teste@none.com',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('shoube not be able to authenticate with non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserServices = new AuthenticateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );

        expect(
            authenticateUserServices.execute({
                email: 'teste@none.com',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('shoube not be able to authenticate with wrong password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const authenticateUserServices = new AuthenticateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );
        const createUserServices = new CreateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );

        await createUserServices.execute({
            email: 'teste@none.com',
            name: 'Teste teste',
            password: '123456',
        });

        await expect(
            authenticateUserServices.execute({
                email: 'teste@none.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
