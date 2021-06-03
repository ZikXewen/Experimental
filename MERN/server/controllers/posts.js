import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages); //200 OK
  } catch (error) {
    res.status(404).json({ message: error.message }); //404 Not Found
  }
};
export const createPost = async (req, res) => {
  const post = req.body; // POST Request from Frontend
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost); //201 Created
  } catch (error) {
    res.status(409).json({ message: error.message }); //409 Conflict
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");
  const updatePost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  }); // new=true for return value
  res.json(updatePost);
};
export const deletePost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");
  await PostMessage.findByIdAndDelete(id);
  res.json({ message: "Post Deleted" });
};
export const likePost = async (req, res) => {
  const { id } = req.params;
  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 }, // No need to do ...updatedPost
    { new: true }
  );
  res.json(updatedPost);
};
