import pg from "pg";
import { config } from "dotenv";

config();

const {Pool} = pg;
const connectionString = `postgres://ovkpriprszjcog:59d8ba88fdcede4a7af7e96e775ea280823a8cee6aaa1f8837e8bdc5e83ccbb6@ec2-35-169-119-56.compute-1.amazonaws.com:5432/d7geq6vsmfi46k`
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
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
        };
      }
};