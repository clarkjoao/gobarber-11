import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '@modules/appointments/repositories/appointments.reporitory';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentServices';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentRepository = getCustomRepository(AppointmentRepository);
    const appointments = await appointmentRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;
    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.execute({
        provider_id,
        date: parseDate,
    });
    return response.json(appointment);
});

export default appointmentsRouter;
