import jwt from 'jsonwebtoken';
import config from '../config.js'
import db from '../db/index.js';

export const verifyToken = async (req,res,next) => {
  let token = req.headers["x-access-token"];

  if(!token) res.status(403).json({message:"token no proveido"})
  try {
      const decoded = jwt.verify(token,config.SECRET)
      req.email = decoded.user.email
      console.log(req.email)
      const user = await db.query(`SELECT * FROM users WHERE email = $1`,[req.email])
      if(!user) res.status(404).json({message:"usuario no encontrado"})
      next()
  } catch (error) {
    res.status(401).json({error:error.message})
  }
}