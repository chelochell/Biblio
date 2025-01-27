import mongoose from "mongoose"

const popularBookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearAdded: { type: String, required: true },
  cover: { type: String, required: true },
  rating: { type: Number, required: true },
  monthAdded: { type: String, required: true },
  position: { type: Number, required: true },
});

const PopularBook = mongoose.model('PopularBook', popularBookSchema);

export default PopularBook;