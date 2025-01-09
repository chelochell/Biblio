import Club from "../models/club.model.js";
import mongoose from "mongoose";

export const getClub = async (req,res) => {
    try {
        const clubs = await Club.find({});
        res.status(201).json({
            success:true,
            data:clubs
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const createClub = async (req, res) =>{
    const club = req.body;

    if(!club.profileImage || !club.coverPhoto || !club.clubName || !club.description || !club.location){
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        })
    }

    const newClub = new Club(club);

    try{
        await newClub.save();
        res.status(201).json({
            success:true,
            data:newClub
        })
    }catch(error){
        console.error("Error in create club:", error.message);
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const updateClub = async (req, res) =>{
    const {id} = req.params;

    const club = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            success:false, 
            message:"Invalid Club id"
        })
    }
    
    try {
        const updatedClub = await Club.findByIdAndUpdate(id, club, {new:true});
        res.status(200).json({
            success:true,
            data:updatedClub
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error"
        })
    }
}

export const deleteClub = async (req, res) =>{
    const {id} = req.params;

    try {
        await Club.findByIdAndDelete(id);
        res.status(201).json({
            success:true,
            message:"Club Deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Club not found"
        })
    }
}