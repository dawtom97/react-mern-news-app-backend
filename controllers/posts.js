import mongoose from "mongoose";
import { Post } from "../models/postModel.js";

export const getPosts = async (req,res)=>{
    try {
        const posts= await Post.find();
       // console.log(posts);
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}
export const createPost = async (req,res) => {
    const body = req.body;
    const newPost = new Post(body);

    try {
       await newPost.save();
       res.status(201).json(newPost)
    } catch (error) {
       res.status(409).json({message:error.message})
    }
}

export const getPost = async (req,res)=>{
    try {
        const post= await Post.findById(req.params.id);
       // console.log(post);
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const updatePost = async (req,res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID');
    const updatedPost = await Post.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    res.json(updatedPost)
}

export const deletePost = async(req,res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
    await Post.findByIdAndRemove(id);
  //  console.log('DELETE')
    res.json({message:'Post deleted succesfully'})
}

export const likePost = async(req,res) => {
    const {id} = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID');
    const post = await Post.findById(id);
    const index = post.legitCount.findIndex((id)=>id === String(req.userId));

    if(index === -1) {
      post.legitCount.push(req.userId);
    } else {
      post.legitCount = post.legitCount.filter((id)=>id !== String(req.userId));
    }

    const updatedPost = await Post.findByIdAndUpdate(id, post, {new:true});
   // console.log(updatedPost)
    res.json(updatedPost)
}