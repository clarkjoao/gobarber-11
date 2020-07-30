import 'reflect-metadata';
import CreateUserServices from './CreateUserServices';
import SendForgetPasswordEmailServices from './SendForgetPasswordEmailServices';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AppErros from '@shared/errors/AppErros';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';

describe('SendForgotPasswordEmail', () => {
    it('shoube be to able to recovery the password using the email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();
        const sendForgetPasswordEmailServices = new SendForgetPasswordEmailServices(
            fakeUsersRepository,
            fakeMailProvider,
        );

        const sendEmail = await jest.spyOn(fakeMailProvider, 'sendEmail');

        await fakeUsersRepository.create({
            email: 'teste@none.com',
            name: 'Teste teste',
            password: '123456',
        });

        await sendForgetPasswordEmailServices.execute({
            email: 'teste@none.com',
        });

        expect(sendEmail).toHaveBeenCalled();
    });
    it('shoube be to able to recovery a non-existing user password', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeMailProvider = new FakeMailProvider();

        const sendForgetPasswordEmail = new SendForgetPasswordEmailServices(
            fakeUsersRepository,
            fakeMailProvider,
        );

        await expect(
            sendForgetPasswordEmail.execute({
                email: 'teste2@none.com',
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });
});
