import Cluster from "../models/Cluster.model.js";
import mongoose from "mongoose";


export const getCluster = async (req, res) =>{
    
    try {
        const {userId} = req.query;
        console.log(userId);
        console.log(req);
        const clusters = await Cluster.find({userId: userId});
        res.status(201).json({success:true, data: clusters})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}


export const createCluster = async (req, res) => {
    const { name, userId } = req.body;

    if(!name){
        return res.status(400).json({success:false, message:"Please provide required fields: name"})
    }

    const newCluster = new Cluster({name, userId});

    try{
        await newCluster.save();
        res.status(201).json({success:true, data:newCluster})
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
    
}

export const updateCluster = async (req, res) => {
    const {id} = req.params;

    const cluster = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message:"Invalid Cluster Id"})
    }

    try{
        const updatedCluster = await Cluster.findByIdAndUpdate(id, cluster, {new:true})
        res.status(200).json({success:true, data:updatedCluster})   
    } catch (error) {
        res.status(500).json({success:false, message:"Server Error"})
    }
}

export const deleteCluster = async (req, res) => {
    const {id} = req.params;

   try {
    await Cluster.findByIdAndDelete(id);
    res.status(201).json({success:true, message:"Cluster Deleted"})
   } catch (error) {
    res.status(500).json({success:false, message:"Cluster not found"})
   }   
}


