import db from "../db/index";
import Joi from "joi";

const validatedschemaDocument = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  datebirth: Joi.string().required(),
  dateissue: Joi.string().required(),
  dateexpiry: Joi.string().required(),
  numdocument: Joi.string().required(),
  address: Joi.string().required(),
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
      gender,
      marital_status,
      proffesion,
      photo,
      placebirth,
    });
    
    if(!error){
      await db.query(
        `INSERT INTO documents(first_name,last_name,date_birth,date_issue,date_expiry,num_document,addres,gender,marital_status,proffesion,photo,place_birth)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [
          firstname,
          lastname,
          datebirth,
          dateissue,
          dateexpiry,
          numdocument,
          address,
          gender,
          marital_status,
          proffesion,
          photo,
          placebirth,
        ]
      );

      const { rows } = await db.query("SELECT * FROM documents WHERE num_document = $1", [
        numdocument,
      ]);

      const result = {
          id:rows[0].id_document,
          numdocument: rows[0].num_document
         };

         res.status(200).json({ result });
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
