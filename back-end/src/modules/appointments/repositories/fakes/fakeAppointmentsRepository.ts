import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentServices';
import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDto): Promise<Appointment> {
        const appointment = new Appointment();

        appointment.id = uuid();
        appointment.provider_id = provider_id;
        appointment.date = date;

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
