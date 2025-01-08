import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRouters from "./routes/bookroutes.js";
import uploadRoutes from "./routes/uploadroutes.js";
import multer from "multer";
import path from 'path';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files


import { mkdirSync } from 'fs';
try {
  mkdirSync('uploads');
} catch (err) {
  if (err.code !== 'EEXIST') throw err;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    
    res.status(200).json({
      success: true,
      message: 'File uploaded successfully',
      fileUrl: fileUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading file'
    });
  }
});

app.use("/api/books", bookRouters);
app.use("/api/uploads", uploadRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});