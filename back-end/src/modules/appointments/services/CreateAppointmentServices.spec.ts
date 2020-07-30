import 'reflect-metadata';
import CreateAppointmentServices from './CreateAppointmentServices';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import AppError from '@shared/errors/AppErros';

describe('CreateAppointment', () => {
    it('shoube be to able to create a new appointment', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointmentServices = new CreateAppointmentServices(
            fakeAppointmentsRepository,
        );

        const appointment = await createAppointmentServices.execute({
            date: new Date(),
            provider_id: '1',
        });
        expect(appointment.provider_id).toBe('1');
        expect(appointment).toHaveProperty('id');
    });
    it('shoube not be to able to create two appointment on the same time', async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository();
        const createAppointmentServices = new CreateAppointmentServices(
            fakeAppointmentsRepository,
        );

        const date = new Date(2020, 4, 10, 11);

        await createAppointmentServices.execute({
            date,
            provider_id: '1',
        });
        await expect(
            createAppointmentServices.execute({
                date,
                provider_id: '1',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
