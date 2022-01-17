import db from '../db/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export const createUser = async (req,res) => {
    
   try {
    const {username, correo, password} = req.body;
    const cryptPass = bcrypt.hashSync(password, 10);
     await db.query( `INSERT INTO users(user_name,password,email)
       VALUES($1,$2,$3)`,
     [
        username,
        cryptPass,
        correo,
     ])
     
     const token = jwt.sign({email:correo},config.SECRET,{
      expiresIn:config.EXPIRATION
     });
     res.status(200).json({token});
   } catch (error) {
    console.log(error.message);
    res.status(400).json({ err: error.message });
   }
}

