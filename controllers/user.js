import User from "../models/user.js";
import {sendmail, sendmailresetpassword} from "../services/mailer.js"
import {emailToken} from "../services/tokener.js"
import {generatePassword} from "../services/passwordGenerator.js"
import bcrypt from 'bcrypt';
import user from "../models/user.js";
import Post from "../models/post.js";

var saltRounds = 10;
export async function signin(req, res) {
  const user = await User.findOne({ email: req.body.email,password: req.body.password });
  if (user) {
    // check user password with hashed password stored in the database
    //const validPassword = await bcrypt.compare(req.body.password, user.password);
   
    
   // var toknedEmail = emailToken(req.body.email);
     
      res.status(200).json(user);
    }
 
 else {
  res.status(401).json({ error: "User does not exist" });
}
};

export async function verify(req, res){
  User
  .findOneAndUpdate({ "email": req.params.email }, { "is_verified": 2})
  .then(doc => {
    res.status(200).json(user);
  })
  .catch(err => {
    res.status(500).json({ error: err });
  });

}

export async function googleVerifier(req, res) {
  const user = await User.findOne({ googleID: req.body.googleID });
  if (user) {
    // check user password with hashed password stored in the database
         res.status(200).json(user);
    }
  else {
  res.status(401).json({ error: "User does not exist" });
}
}
export async function googleSignIn(req, res) {
  const user = await User.findOne({ googleID: req.body.googleID });
  if (user) {
    // check user password with hashed password stored in the database
         res.status(200).json(user);
    }
  else {
  res.status(401).json({ error: "User does not exist" });
}
};
export async function googleSignUp(req, res) {
  const password = generatePassword();
  User.create({ firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: password,
    role: "user", 
    statut: true,
    is_verified: 1,
    googleID: req.body.googleID})
  .then(
     
    res.status(200).json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
    }))
  .catch((err) => {
    res.status(500).json({ error: err });
  });
  sendmail(req.body.email);
}
export async function signup(req, res) {
 
  const  GP = generatePassword();

  User.create({ firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: "333",
    role: "user", 
    statut: true,
    is_verified: 1,
   })
  .then(user=>{
    res.status(200).json(user)
  }
  )  
   
  .catch((err) => {
    res.status(500).json({ error: err });
  });
  sendmail(req.body.email);
}

export async function forgot(req, res) {

  const user = await User.findOne({ email: req.body.email });
  if(user){
      const verificationcode = generatePassword();
      sendmailresetpassword(req.body.email,verificationcode);
      console.log(verificationcode);
      res.status(200).json({ key: "verificationcode",value: verificationcode });
  }
  else {
      res.status(500).json({ message: "no account with this mail to restor" });
  }
};

export async function restorPassword(req,res) {
  User
  .findOneAndUpdate({email: req.body.email}, {password: req.body.password})
  .then(doc1 => {
     
          res.status(200).json({message: "password has been changed succefully"});
      
  })
  .catch(err => {
      res.status(500).json({ error: err });
  });
}

export async function editProfileUser(req,res) {
  User
  .findOneAndUpdate({email: req.body.email}, {firstname: req.body.firstname, 
                                              lastname: req.body.lastname, 
                                              password: req.body.password})
  .then(doc1 => {
     
          res.status(200).json({message: "profile has been modfied succefully"});
      
  })
  .catch(err => {
      res.status(500).json({ error: err });
  });
}

export async function addLikeOfUser(req, res) {

  const post = await Post.findOne({title: req.body.title}) 
  const user = await User.findOne({email: req.body.email})
  if (user){
          user.liked_posts.push(post)
          user.save();
          res.status(200).json(user);
      
  }
 else {
      res.status(500).json({ error: err });
  };
}

export async function RemoveLikeOfUser(req, res) {
  const user = await User.findOne({email: req.body.email})
  const post = await Post.findOne({title: req.body.title})  
  
     
      user.liked_posts.pull(post._id)
      user.save();
      res.status(200).json(user);
     }
    
 // const post = await Post.findOne({_id:  user.liked_posts[0]}) 
  //res.status(200).json(post);    
  
 /* var list = [];
  if (user){
         
          user.liked_posts.forEach(function(y) 
          { 
           
            const post = await Post.findOne({title: req.body.title}) 
          }
          );
          res.status(200).json(list);    
      
  }
 else {
      res.status(500).json({ error: err });
  };*/






