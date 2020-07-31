import 'reflect-metadata';
import CreateUserServices from './CreateUserServices';
import SendForgetPasswordEmailServices from './SendForgetPasswordEmailServices';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AppErros from '@shared/errors/AppErros';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
import FakeUserTokenRepository from '../repositories/fakes/fakeUserTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let sendForgetPasswordEmailServices: SendForgetPasswordEmailServices;

describe('SendForgotPasswordEmail', () => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    beforeEach(() => {
        sendForgetPasswordEmailServices = new SendForgetPasswordEmailServices(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokenRepository,
        );
    });
    it('shoube be to able to recovery the password using the email', async () => {
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
        await expect(
            sendForgetPasswordEmailServices.execute({
                email: 'teste2@none.com',
            }),
        ).rejects.toBeInstanceOf(AppErros);
    });
    it('shoube be to able to forgot password token', async () => {
        const genretateToken = jest.spyOn(fakeUserTokenRepository, 'generate');

        const user = await fakeUsersRepository.create({
            email: 'teste@none.com',
            name: 'Teste teste',
            password: '123456',
        });

        await sendForgetPasswordEmailServices.execute({
            email: 'teste@none.com',
        });

        expect(genretateToken).toHaveBeenCalledWith(user.id);
    });
});
