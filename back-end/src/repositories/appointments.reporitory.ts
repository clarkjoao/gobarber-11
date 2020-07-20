import Appointment from '../models/Appointment';

import { EntityRepository, Repository } from 'typeorm';

interface findByDate {
    provider_id: string;
    date: Date;
}
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate({
        provider_id,
        date,
    }: findByDate): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { provider_id, date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
