import PopularBook from '../models/popularBook.model.js';
import { getMonthAndYear } from '../utils/month.js';

const createPopular = async (req, res) => {
  try {
    const booksData = req.body;

    const { month, year } = getMonthAndYear();

    const bookDataWithDate = booksData.map((book) => {
      return {
        ...book,
        yearAdded: year,
        monthAdded: month,
      };
    });
    
    const createdBooks = await PopularBook.insertMany(bookDataWithDate);
    res.status(201).json(createdBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
    }
}

const getPopular = async (req, res) => {
  try {
    const popularBooks = await PopularBook.find({});
    res.status(200).json(popularBooks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}



export { createPopular, getPopular };