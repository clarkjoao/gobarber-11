import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/fakeStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import AppError from '@shared/errors/AppErros';

let fakeStorageProvider: FakeStorageProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeStorageProvider = new FakeStorageProvider();
        fakeUsersRepository = new FakeUsersRepository();

        updateUserAvatarService = new UpdateUserAvatarService(
            fakeUsersRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to upload a avatar file', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should delete previous avatar on new upload', async () => {
        // Spy function
        const deleteFile = await jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '12345678',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'avatar.jpg',
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatarFilename: 'changedAvatar.jpg',
        });

        expect(deleteFile).toBeCalled();
        expect(user.avatar).toBe('changedAvatar.jpg');
    });
});
