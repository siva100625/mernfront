const Post=require("../models/Post.js");
const createPost=async (req, res) => {
  try {
    const newPost=new Post({
      ...req.body, 
      userId: req.user._id,
    });
    await newPost.save(); 
    res.status(201).json(newPost);
  } catch(error){
    console.error(error);
    res.status(500).json({message:"error"});
  }
};
const getAllPosts=async(req, res)=>{
  try{
    const posts=await Post.find().populate("userId","username"); 
    res.json(posts);
  } catch(error) {
    console.error(error);
    res.status(500).json({message:"error" });
  }
};

module.exports={createPost,getAllPosts };
