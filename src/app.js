import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import documentRoute from './routes/identityDocument.route.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();

app.set('port', process.env.PORT || 4000)
app.set('json spaces', 4);
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get('/',(req,res)=>{
    res.json({
        message: "Welcome to the server scanner intellityc",
        name: "server",
        description: "Server API-REST",
        author: "technosal"
    })
});
app.use('/api/document',documentRoute)
export default app;