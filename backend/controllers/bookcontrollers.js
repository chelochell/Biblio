import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBook = async (req,res) =>{

  try {
    const books = await Book.find({});
    res.status(201).json({success: true, data: books})
  } catch (error) {
    res.status(500).json({success:false, message:"Server Error"})
  }
}

export const createBook = async (req, res) => {
  const book = req.body;
  
  // Updated validation to match schema requirements
  if (!book.title || !book.author || !book.description || !book.genre || !book.image) {
      return res.status(400).json({ 
          success: false, 
          message: "Please provide all required fields: title, author, description, genre, and image" 
      });
  }

  const newBook = new Book(book);
  
  try {
      await newBook.save();
      res.status(201).json({ success: true, data: newBook });
  } catch (error) {
      console.error("Error in create book:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
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
    res.status(404).json({success:false, message:"Book not found"})
  }
}