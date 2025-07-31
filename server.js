const express = require('express');
const multer  = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const fs = require('fs');
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

app.use(express.static('.')); // serve your HTML file

app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Image uploaded successfully!');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
