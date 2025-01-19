var express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

var app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

// Serve the homepage
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Handle file upload and return file details
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const { originalname, mimetype, size } = req.file;

  res.json({
    name: originalname,
    type: mimetype,
    size: size,
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});