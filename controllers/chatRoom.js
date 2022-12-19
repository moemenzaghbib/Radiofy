import ChatRoom from "../models/chatRoom.js";
import User from "../models/user.js";
import mongoose from 'mongoose';

export async function createChatRoom(req, res) {
    const user = await User.findOne({email: req.body.email});
    ChatRoom.create({radio: user})
    .then(chatRoom => {
        res.status(200).json(chatRoom) })

    .catch((err) => {
      res.status(500).json({ error: err });
    });
  };

  export async function addConnectedUser(req, res) {
    const user = await User.findOne({email: req.body.email_radio});
    const user_connected = await User.findOne({email: req.body.email_user});

    const chatRoom = await ChatRoom.findOne({radio: user})
    if (chatRoom){
      chatRoom.connectedUsers.push(user_connected);
      chatRoom.save();
      res.status(200).json(chatRoom.connectedUsers);
    } else {
        res.status(500).json({error: " rahi khlet ya hamma rahi khlet"})
    }
  }

  export async function GetAllConnectedUsers(req, res) {
    var list = []
    const user = await User.findOne({email: req.body.email});
    const chatRoom = await ChatRoom.findOne({radio: user})
    if (chatRoom){
      for(var i= 0; i < chatRoom.connectedUsers.length; i++)
      {  var user_co =await User.findById(mongoose.Types.ObjectId(chatRoom.connectedUsers[i]));
        list.push({key: user_co.firstname+" "+user_co.lastname, value: user_co.email})
       }
        res.status(200).json(list);
    } else {
        res.status(500).json({error: " rahi khlet ya hamma rahi khlet"})
    }
  }

  export async function GetConnectedUser(req, res) {
    const user = await User.findOne({email: req.body.email});
    const chatRoom = await ChatRoom.findOne({radio: user})
    if (chatRoom){

        res.status(200).json(chatRoom.connectedUsers);
    } else {
        res.status(500).json({error: " rahi khlet ya hamma rahi khlet"})
    }
  }
  export async function BanneUser(req, res) {
    const user = await User.findOne({email: req.body.email});
    const radio = await User.findOne({email: req.body.radio})
    const chatRoom = await ChatRoom.findOne({radio: radio})
    if(chatRoom){
        chatRoom.bannedUsers.push(user);
        chatRoom.save();
        req.status(200).json(chatRoom);
    }else {
        res.status(500).json({error: "ya hamma rahi khlet"})
    }
  };
  export async function UnBanneUser(req, res) {
    const user = await User.findOne({email: req.body.email});
    const radio = await User.findOne({email: req.body.radio})
    const chatRoom = await ChatRoom.findOne({radio: radio})
    if(chatRoom){
        chatRoom.bannedUsers.pull(user._id);
        chatRoom.save();
        req.status(200).json(chatRoom);
    }else {
        res.status(500).json({error: "ya hamma rahi khlet"})
    }
  };
