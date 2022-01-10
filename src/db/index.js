import pg from "pg";
import { config } from "dotenv";

config();

const {Pool} = pg;
const devConfig = {
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    host: process.env.DB_HOST,
    database : process.env.DB_NAME,
    port: process.env.DB_PORT
}
const proConfing = {
    connectionString: process.env.DB_URL,
    ssl: {
       rejectUnauthorized: false,
   },
}
const pool = new Pool(process.env.NODE_ENV === "production" ? proConfing : devConfig);


console.log(process.env.NODE_ENV)

export default  {
    
    async query(text, params) {
        const start = Date.now();
        try {
            const res = await pool.query(text, params);
            const duration = Date.now() - start;

            console.log('executed query',{text,duration,rows:res.rowCount}
            )
            return res;

        } catch (error) {
            console.log('error in query',{text});
            throw error;
        };
      }
};