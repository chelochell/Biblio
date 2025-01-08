import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    profileImage: {
      type: String, 
      required: true
    },
    coverPhoto: {
      type: String, 
      required: true
    },
    clubName: {
      type: String,
      required: true,
      unique: true 
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: false 
    },
    users: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' 
    }]
  }, { timestamps: true });

  const Club = mongoose.model("Club", clubSchema)
  export default Club;