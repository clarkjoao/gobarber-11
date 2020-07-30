import 'reflect-metadata';
import CreateUserServices from './CreateUserServices';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AppError from '@shared/errors/AppErros';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeHashProvider';

describe('CreateUser', () => {
    it('shoube be to able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUserServices = new CreateUserServices(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const appointment = await createUserServices.execute({
            email: 'teste@none.com',
            name: 'Teste teste',
            password: '123456',
        });
        expect(appointment).toHaveProperty('id');
    });
    it('shoube not be to able to create a new user with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
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
            createUserServices.execute({
                email: 'teste@none.com',
                name: 'Teste teste',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
