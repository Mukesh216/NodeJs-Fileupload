const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadedFileNames = [];

const upload = multer({ storage: storage });
app.use(express.static(__dirname));

app.get('/filelist', (req, res) => {
  fs.readdir('./uploads', (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading the directory.' });
    }
    res.status(200).json({ files }); // Send the list of file names as JSON
  });
});

app.post('/upload', upload.array('files'), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  for (const file of req.files) {
    const filename = file.originalname;

    if (uploadedFileNames.includes(filename)) {
      return res.status(400).json({ message: `File "${filename}" already exists.` });
    }

    uploadedFileNames.push(filename);
  }

  res.status(200).json({ message: 'Files uploaded successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
