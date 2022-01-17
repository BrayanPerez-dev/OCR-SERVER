import db from "../db/index.js";

export const createDocument = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      datebirth,
      dateissue,
      dateexpiry,
      numdocument,
      addres,
      nationality,
      gender,
      marital_status,
      proffesion,
      photo,
      placebirth,
    } = req.body;
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
        addres,
        nationality,
        gender,
        marital_status,
        proffesion,
        photo,
        placebirth,
      ]
    );
    res.status(200).json({'document number':numdocument});
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ err: error.message });
  }
};

export const getDocuments = async (req, res) => {
  try {
   const { rows } = await db.query('SELECT * FROM documents')
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

