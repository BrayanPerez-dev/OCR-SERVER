import Document from "../models/identityDocument.model.js";

const createDocument = async (req, res) => {
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
    placebirth
  } = req.body;
  try {
    const document = new Document({
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
      placebirth
    });
    await document.createDocument();
    res.status(200).json(document);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ err: error.message  });
  }
};

const getDocuments = async (req, res) => {
  try {
    const document = new Document({ firstname:null,
      lastname:null,
      datebirth:null,
      dateissue:null,
      dateexpiry:null,
      numdocument:null,
      addres:null,
      nationality:null,
      gender:null,
      marital_status:null,
      proffesion:null,
      photo:null,
      placebirth:null
    })
    const documents = await document.getDocuments()
    res.status(200).json(documents);
  } catch (error) {
    res.status(400).json({ err:error.message });
  }
};

export { createDocument, getDocuments };
