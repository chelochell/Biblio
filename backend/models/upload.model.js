import mongoose from "mongoose"

const uploadSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, 
    },
    likes: {
      type: Number,
      default: 0,
    },
  }, { timestamps: true });

  const Upload = mongoose.model("Upload", uploadSchema);

export default Upload;