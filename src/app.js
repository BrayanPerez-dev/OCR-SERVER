import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import documentRoute from './routes/document.route';
import authRoute from './routes/auth.route';
import companyRoute from './routes/company.route';
import branchOfficeRoute from './routes/branchoffice.route';
import contactRoute from './routes/contact.route';
import typeContactRoute from './routes/typecontact.route';
import { createTypeContacts } from './libs/createContacts';

const app = express();
const form = multer();

createTypeContacts();

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

app.use('/api/document', documentRoute);
app.use('/api/auth', authRoute);
app.use('/api/company', companyRoute);
app.use('/api/branchoffice', branchOfficeRoute);
app.use('/api/contact', contactRoute);
app.use('/api/type-contact', typeContactRoute);

export default app;
