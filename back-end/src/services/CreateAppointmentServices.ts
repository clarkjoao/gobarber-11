import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppErros from '../errors/AppErros';
import AppointmentRepository from '../repositories/appointments.reporitory';
interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentRepository = getCustomRepository(
            AppointmentRepository,
        );
        const appointmentDate = startOfHour(date);
        const findAppointment = await appointmentRepository.findByDate({
            provider_id,
            date: appointmentDate,
        });

        if (findAppointment) {
            throw new AppErros('This appointment is aready book ');
        }
        const appointment = await appointmentRepository.create({
            date: appointmentDate,
            provider_id,
        });
        await appointmentRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
