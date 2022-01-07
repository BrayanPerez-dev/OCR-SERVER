import database from "../database.js";

function Document({
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
}) {
  this.first_name = firstname;
  this.last_name = lastname;
  this.date_birth = datebirth;
  this.date_issue = dateissue;
  this.date_expiry = dateexpiry;
  this.num_document = numdocument;
  this.addres = addres;
  this.nationality = nationality;
  this.gender = gender;
  this.marital_status = marital_status;
  this.proffesion = proffesion;
  this.photo = photo;
}

Document.prototype.createDocument = async function () {
  try {
    const { rows } = await database.query(
      `INSERT INTO documents(first_name,last_name,date_birth,date_issue,date_expiry,num_document,addres,nationality,gender,marital_status,proffesion,photo)
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        this.last_name,
        this.last_name,
        this.date_birth,
        this.date_issue,
        this.date_expiry,
        this.num_document,
        this.addres,
        this.nationality,
        this.gender,
        this.marital_status,
        this.proffesion,
        this.photo,
      ]
    );
    return rows;
  } catch (error) {
    throw error;
  }
};
Document.prototype.getDocuments = async function () {
  try {
    const { rows } = await database.query(`SELECT * FROM documents`,null);
    return rows;
  } catch (error) {
    throw error;
  }
};
export default Document;
