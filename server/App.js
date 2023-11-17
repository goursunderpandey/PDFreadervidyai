const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const { createPdf } = require('./Pdflib.jsx');
const { UploadedPdf, ExtractedPdf } = require('./Schema/Pdfschema.jsx'); 
app.use(cors());
app.use(express.json());
app.use('/files', express.static('files'));

// mongodb connection----------------------------------------------
require('./Databaseconnection/Database.jsx');

// multer------------------------------------------------------------
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload-files', upload.single('file'), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  try {
    const uploadedPdf = await UploadedPdf.create({ title: title, pdf: fileName });
    res.send({ status: 'ok', uploadedPdfId: uploadedPdf._id });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get('/get-files', async (req, res) => {
  try {
    UploadedPdf.find({}).then((data) => {
      res.send({ status: 'ok', data: data });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


app.get("/get-pdf/:id" ,async(req, res) => {
  try {
    ExtractedPdf.findById(req.params.id).then((data) => {
      res.send({status:"ok" , data:data});
    });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
})
app.post('/extract-page', async (req, res) => {
  const { uploadedPdfId, sourcePath,outputPath,pageNumber } = req.body;
  
  try {
    const uploadedPdf = await UploadedPdf.findById(uploadedPdfId);

    if (!uploadedPdf) {
      return res.status(404).json({ status: 'error', message: 'Uploaded PDF not found.' });
    }
    
    const extractedPdfPath = `${outputPath}_${pageNumber}.pdf`;
    createPdf(sourcePath, extractedPdfPath, pageNumber);

    

   

    await ExtractedPdf.create({
      uploadedPdf: uploadedPdf._id,
      extractedPdf: extractedPdfPath,
      pageNumber: pageNumber,
    });

    res.send({ status: 'ok', message: 'Page extracted, and data stored in the database.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server Started');
});
