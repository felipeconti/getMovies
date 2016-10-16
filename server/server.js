const express = require('express');
const app = express();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, getFolder());
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

function getFolder() {
  var dir = 'uploads/';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

app.use(express.static(path.join(__dirname, '../dist')));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:9000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/fileupload', multer({storage: storage}).any(), function (req, res) {
//   console.log(req.files);
  res.send('received');
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
