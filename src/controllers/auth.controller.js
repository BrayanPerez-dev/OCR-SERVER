import db from "../db/index.js";
import jwt from "jsonwebtoken";
import config from "../config.js";
import bcrypt from "bcrypt";

export const singUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const cryptPass = bcrypt.hashSync(password, 10);
    await db.query(
      `INSERT INTO users(user_name,password,email)
       VALUES($1,$2,$3)`,
      [username, cryptPass, email]
    );
    const user = {
      username,email
    }
    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: config.EXPIRATION,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ err: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
      correo,
    ]);
    const passDb = rows[0].password;
    const matchPassword = bcrypt.compareSync(password, passDb);
    if (!matchPassword) {
      res.status(401).json({ token: null, message: "Invalid Password" });
    }
    const row = rows[0];
    const { id, user_name, email } = row;
    const user = {
      id,
      user_name,
      email,
    };
    console.log(user);
    const token = jwt.sign({ user }, config.SECRET, {
      expiresIn: config.EXPIRATION,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ err: error.message });
  }
};
