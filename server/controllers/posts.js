import mongoose from "mongoose";

import PostMessage from "../Models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    //finding something takes time, meaning it's asynchronous so you have to make this whole code block async/await
    const postMessages = await PostMessage.find();

    //if everything works, we return status 200 & an array of all the post messages
    res.status(200).json(postMessages);
  } catch (error) {
    //don't know what status 404 means
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  //with post requests, you have access to 'req.body'
  const post = req.body;

  const newPostMessage = new PostMessage(post);
  try {
    //this is an asynchronous action so we add async/await in this route controller as well
    await newPostMessage.save();

    //status 201 = new creation successful
    res.status(201).json(newPostMessage);
  } catch (error) {
    //don't know what status 409 means
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //req.params refers to the route /:id so the id will be like: posts/123
  const { id: _id } = req.params; //we rename id
  const post = req.body; // the whole post

  //check if the id is a valid mongoose id
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${_id}`);

  //this is an asynchronous action so we have to add await
  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  }); // new true is so we can receive the updated version of the post
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
  
  res.json(updatedPost);
};
