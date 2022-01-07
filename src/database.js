import pg from "pg";
import { config } from "dotenv";

config();

const {Pool} = pg
const pool = new Pool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port : 5432
});

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
        }
      }
};