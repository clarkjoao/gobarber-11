import { Router } from 'express';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routers';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routers';
import usersRouter from '@modules/users/infra/http/routes/users.routers';
const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/users', usersRouter);
export default routes;
