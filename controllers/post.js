import Post from "../models/post.js";
import User from "../models/user.js";
import Comment from "../models/comment.js";
import mongoose from 'mongoose';
export async function post_post(req, res) {
    const user = await User.findOne({FirstName: req.body.author});
     Post.create({ title: req.body.title,
        author: user,
        desc: req.body.desc,
        image: req.body.image,
        url: req.body.url,
        likes: 0
   })
    .then(post => {
        console.warn("test lhne ? ");
        res.status(200).json(post) })
   
       
      
    .catch((err) => {
      res.status(500).json({ error: err });
    });
  };

export async function verify_post(req, res) {
    const post = await Post.findOne({title: req.body.title});
    if (post) {
      // check user password with hashed password stored in the database
      //const validPassword = await bcrypt.compare(req.body.password, user.password);
     
      
     // var toknedEmail = emailToken(req.body.email);
       
        res.status(200).json(post);
      }
   
   else {
    res.status(401).json({ err: "Doesnt Exist" });
  }
  };
export async function getAll(req, res) {
  const posts = await Post.find({});
    if (posts) {
      res.status(200).json(posts);
      
}
else{
  res.status(500).json({error: " melikthomch"})
}
}

export async function GetOnePost(req, res ) {
  const post = await Post.findOne({title: req.body.title})
  if(post){
    console.warn(post)
    res.status(200).json(post);
    } else {
      res.status(500).json({error: "melgithomch"})
    }
}

export async function AddLikePost(req, res ){
  

    const post = await Post.findOne({title: req.body.title}) 
    const user = await User.findOne({email: req.body.email})
    var new_likes_number = post.likes+1;
  const new_post = await Post.findOneAndUpdate({title: req.body.title}, {likes: new_likes_number})
  if(new_post){
    user.liked_posts.push(post)
      user.save();
    res.status(200).json({key: "likesNumber",value: new_likes_number })
  }else {
    res.status(500).json({error: " sar error ya hamma "})
  }
}

export async function RemoveLikePost(req, res ){
  
  const user = await User.findOne({email: req.body.email})
  const post = await Post.findOne({title: req.body.title}) 
  var new_likes_number = post.likes-1;
  console.warn(new_likes_number)
  const new_post = await Post.findOneAndUpdate({title: req.body.title}, {likes: new_likes_number})
  if(new_post){

if(new_post){
  
  user.liked_posts.pull(post._id)
  user.save();
  res.status(200).json({key: "likesNumber",value: new_likes_number })
}else {
  res.status(500).json({error: " sar error ya hamma "})
}
}}
/*
export async function AddCommentPost(req, res ) {
  const user = await User.findOne({email: req.body.email})
  const post = await Post.findOne({title: req.body.title}) 
  if(post){
    post.comments.push({ body: req.body.comment, date: new Date(), author: user }) 
    post.save();
    res.status(200).json(post);
  }else {
    res.status(500).json({error: " ejri ya hamma khlet"})
  }
  
}*/
export async function getAllComment(req, res) {
  var list = []
  const post = await Post.findOne({title: req.body.title}) 
  const comments = await Comment.find({post: post._id})
  for(var i= 0; i < comments.length; i++)
{    
  
  console.warn("moemen test lehene");
  console.warn(comments[i].author);
  var commnt_author =await User.findById(mongoose.Types.ObjectId(comments[i].author));
  if(commnt_author){
    console.warn(commnt_author);
    //console.log(commnt_author);
      list.push({key: commnt_author.firstname+" "+commnt_author.lastname, value: comments[i].content})
  }
 
}
  if(comments){
    res.status(200).json(list);
  }else {
    res.status(500).json({error: " fama prob"});
  }
}
export async function addComment(req, res ) {
  const user = await User.findOne({email: req.body.email})
  const post = await Post.findOne({title: req.body.title}) 
  Comment.create({ post: post,
    author: user,
    content: req.body.content,
   
   });
  
   var list = []
  
   const comments = await Comment.find({post: post._id})
   for(var i= 0; i < comments.length; i++)
 {    
   
   console.warn("moemen test lehene");
   console.warn(comments[i].author);
   var commnt_author =await User.findById(mongoose.Types.ObjectId(comments[i].author));
   if(commnt_author){
     console.warn(commnt_author);
     //console.log(commnt_author);
       list.push({key: commnt_author.firstname+" "+commnt_author.lastname, value: comments[i].content})
   }
  
 }
   if(comments){
     res.status(200).json(list);
   }else {
     res.status(500).json({error: " fama prob"});
   }
  
}