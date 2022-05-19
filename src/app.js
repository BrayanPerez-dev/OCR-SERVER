import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import authRoute from './routes/auth.route';
import companyRoute from './routes/company.route';
import branchOfficeRoute from './routes/branchoffice.route';
import contactRoute from './routes/contact.route';
import typeContactRoute from './routes/typecontact.route';
import userRoute from './routes/user.route';
import profileRoute from './routes/profile.route';
import logRoute from './routes/log.route';
import blinkidRoute from './routes/blinkid.route';

import { createTypeContacts } from './libs/createContacts';
import { createProfiles } from './libs/createProfiles';

const app = express();
const form = multer();

/* createTypeContacts();
createProfiles(); */

app.set('port', process.env.PORT || 4000);
app.set('json spaces', 4);
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(form.array());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the server scanner intellityc',
		name: 'server',
		description: 'Server API-REST',
		author: 'technosal',
	});
});

app.use('/api/auth', authRoute);
app.use('/api/company', companyRoute);
app.use('/api/branchoffice', branchOfficeRoute);
app.use('/api/contact', contactRoute);
app.use('/api/type-contact', typeContactRoute);
app.use('/api/user', userRoute);
app.use('/api/log', logRoute);
app.use('/api/blickid', blinkidRoute);
app.use('/api/profile', profileRoute);

export default app;
