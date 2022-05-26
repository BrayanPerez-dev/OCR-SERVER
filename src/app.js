import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';
import indexRoute from './routes/index.route';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import path from 'path';

const app = express();
const form = multer();
const swaggerSpec = {
	definition: {
		openapi: '3.0.0',
		info: { title: 'OCR API', version: '2.0.0' },
		servers: [{ url: 'http://localhost:4000' }],
	},
	apis: [`${path.join(__dirname, './routes/*.js')}`],
};
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 4);
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(form.array());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', indexRoute);

app.use(
	'/api-doc',
	swaggerUI.serve,
	swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

app.get('/', (req, res) => {
	res.json({
		message: 'Welcome to the server scanner intellityc',
		name: 'server',
		description: 'Server API-REST',
		author: 'technosal',
	});
});

export default app;
