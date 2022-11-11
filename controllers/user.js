import User from "../models/user.js";
import {sendmail} from "../services/mailer.js"
import {emailToken} from "../services/tokener.js"
import {generatePassword} from "../services/passwordGenerator.js"
import bcrypt from 'bcrypt';
var saltRounds = 10;
export async function signin(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
    
    var toknedEmail = emailToken(req.body.email);
     
      res.status(200).json({ message: "Valid password" });
    }
  else {
    res.status(400).json({ error: "Invalid Password" });
  }
} else {
  res.status(401).json({ error: "User does not exist" });
}
};

export async function verify(req, res){
  User
  .findOneAndUpdate({ "email": req.params.email }, { "is_verified": 2})
  .then(doc => {
    res.status(200).json({message: "your account is now verified"});
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
