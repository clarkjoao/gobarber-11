import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppErros from '@shared/errors/AppErros';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    provider_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentsRepository,
    ) {}
    public async execute({
        provider_id,
        date,
    }: IRequest): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const findAppointment = await this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findAppointment) {
            throw new AppErros('This appointment is aready book ');
        }
        const appointment = await this.appointmentRepository.create({
            date: appointmentDate,
            provider_id,
        });
        return appointment;
    }
}

export default CreateAppointmentService;
