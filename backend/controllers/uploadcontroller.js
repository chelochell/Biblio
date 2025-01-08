import Upload from "../models/upload.model.js";
import mongoose from "mongoose";

export const getUpload = async (req, res) => {
  try {
    const upload = await Upload.find({});
    res.status(201).json({ success: true, data: upload });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createUpload = async (req, res) => {
  const upload = req.body;

  if (!upload.text || !upload.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all required fields" });
  }

  const newUpload = new Upload(upload);

  try {
    await newUpload.save();
    res.status(201).json({
      success: true,
      date: newUpload,
    });
  } catch (error) {
    console.error("Error in creating post:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

//update
export const updateUpload = async (req, res) => {
  const { id } = res.params;

  const upload = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Upload" });
  }

  try {
    const updatedUpload = await Upload.findByIdAndUpdate(id, upload, {
      new: true,
    });
    res.status(200).json({
      success: true,
      data: updateUpload,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteUpload = async (req, re) => {
  const { id } = req.params;

  try {
    await Upload.findByIdAndDelete(id);
    res.status(201).json({ success: true, message: "Upload Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Upload not found" });
  }
};
