import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        'fiction',
        'non-fiction',
        'mystery',
        'fantasy',
        'romance',
        'science-fiction',
        'biography',
        'historical',
        'self-help',
        'thriller',
        'horror',
        'poetry',
      ],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['to-be-read', 'reading', 'finished', 'dropped', 're-reading'],
      required: true,
    },
    reviews: {
      type: String, 
      default: '',
    },
    clusterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cluster',
      required: true,
    },
  },
  {
    timestamps: true, 
  }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
