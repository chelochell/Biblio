import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookRouters from "./routes/bookroutes.js";
import uploadRoutes from "./routes/uploadroutes.js";
import clubRouter from "./routes/clubroutes.js"
import authRoutes from "./routes/auth.routes.js"
import clusterRoutes from "./routes/cluster.routes.js";
import multer from "multer";
import path from 'path';
import cors from 'cors';
import cookieParser from "cookie-parser";
import popularBookRoutes from './routes/popularBook.routes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
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
app.use("/api/clubs", clubRouter);
app.use("/api/auth", authRoutes);
app.use("/api/popular", popularBookRoutes);
app.use("/api/clusters", clusterRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});