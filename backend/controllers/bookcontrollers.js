import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBook = async (req, res) => {
  try {
    
    const { clusterId } = req.params;
    console.log("Getting books for clusterId:", clusterId);
    
    if (!clusterId) {
      return res.status(400).json({ success: false, message: "clusterId is required" });
    }
    
    
    if (!mongoose.Types.ObjectId.isValid(clusterId)) {
      return res.status(400).json({ success: false, message: "Invalid clusterId format" });
    }
    
    const books = await Book.find({ clusterId: clusterId });
    console.log(`Found ${books.length} books for clusterId ${clusterId}`);
    
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.error("Error in getBook:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const createBook = async (req, res) => {
  try {
   
    console.log("Request body for book creation:", req.body);
    
    
    const { title, author, description, genre, image, reviews, status, clusterId } = req.body;
    
    
    if (!title || !author || !description || !genre || !image) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide all required fields: title, author, description, genre, and image" 
      });
    }
    
    
    if (!clusterId) {
      return res.status(400).json({
        success: false,
        message: "clusterId is required"
      });
    }
    
    console.log("Creating book with clusterId:", clusterId);

    
    const newBook = new Book({
      title,
      author,
      description,
      genre,
      image,
      reviews: reviews || "",
      status,
      clusterId  
    });
    
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.error("Error in create book:", error.message);
    res.status(500).json({ success: false, message: error.message || "Server Error" });
  }
}

export const updateBook = async (req, res) => {
  const { id } = req.params;

  const book = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Book Id" });
  }

  try {
    const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
    res.status(200).json({ success: true, data: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

export const deleteBook = async (req,res)=>{
  const {id} = req.params
 
  try {
    await Book.findByIdAndDelete(id);
    res.status(201).json({success:true, message: "Book Deleted"})
  } catch (error) {
    res.status(500).json({success:false, message:"Book not found"})
  }
}