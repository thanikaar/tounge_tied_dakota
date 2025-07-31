const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

app.use(express.static('.')); // serve your HTML file

// Change from upload.single('image') to upload.array('image')
app.post('/upload', upload.array('image'), (req, res) => {
  console.log('Files uploaded:', req.files.length);
  res.json({ 
    success: true, 
    message: `${req.files.length} image(s) uploaded successfully!`,
    files: req.files.map(file => file.filename)
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});