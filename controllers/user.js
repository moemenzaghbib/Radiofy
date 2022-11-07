import User from "../models/user.js";
import {sendmail} from "../services/mailer.js"
//import {verifyAccount} from "../services/tokener.js"

import bcrypt from 'bcrypt';
var saltRounds = 10;
export async function signin(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (validPassword) {
     // sendmail();
      res.status(200).json({ message: "Valid password" });
    }
  else {
    res.status(400).json({ error: "Invalid Password" });
  }
} else {
  res.status(401).json({ error: "User does not exist" });
}
};



export async function signup(req, res) {
  const salt = await bcrypt.genSalt(10);
  const  hashedPwd = await bcrypt.hash(req.body.password, salt);
  
  User.create({ firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPwd,
    role: "user", 
    statut: true,
    is_verified: 1})
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
}
