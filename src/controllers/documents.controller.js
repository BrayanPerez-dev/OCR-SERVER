import db from "../db/index";
import Joi from "joi";

const validatedschemaDocument = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  datebirth: Joi.date().required(),
  dateissue: Joi.date().required(),
  dateexpiry: Joi.date().required(),
  numdocument: Joi.number().required(),
  address: Joi.string().required(),
  nationality: Joi.string().required(),
  gender: Joi.string().required(),
  marital_status: Joi.string().required(),
  proffesion: Joi.string().required(),
  photo: Joi.string().required(),
  placebirth: Joi.string().required(),
});

export const createDocument = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      datebirth,
      dateissue,
      dateexpiry,
      numdocument,
      address,
      nationality,
      gender,
      marital_status,
      proffesion,
      photo,
      placebirth,
    } = req.body;
    const { error } = validatedschemaDocument.validate({
      firstname,
      lastname,
      datebirth,
      dateissue,
      dateexpiry,
      numdocument,
      address,
      nationality,
      gender,
      marital_status,
      proffesion,
      photo,
      placebirth,
    });
    
    if(!error){
      await db.query(
        `INSERT INTO documents(first_name,last_name,date_birth,date_issue,date_expiry,num_document,addres,nationality,gender,marital_status,proffesion,photo,place_birth)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
        [
          firstname,
          lastname,
          datebirth,
          dateissue,
          dateexpiry,
          numdocument,
          address,
          nationality,
          gender,
          marital_status,
          proffesion,
          photo,
          placebirth,
        ]
      );
      res.status(200).json({ "document number": numdocument });
    }else{
      const message = error.details[0].message
      res.status(400).json({ error : message });
    }

  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM documents");
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
