import mongoose from "mongoose";

const ClusterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    createdAt: {
        type: Date, 
        default: Date.now
    }
}, { timestamps: true });

const Cluster = mongoose.model("Cluster", ClusterSchema);

export default Cluster;
