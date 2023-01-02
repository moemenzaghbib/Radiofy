import ChatRoom from "../models/chatRoom.js";
import User from "../models/user.js";
import mongoose from 'mongoose';


export async function GetAllChatRooms(req, res){
  
  const chatrooms = await ChatRoom.find({})
   
      var list_final = [];
      for(var i= 0; i < chatrooms.length; i++)
      {
        
        var user =await User.findById(mongoose.Types.ObjectId(chatrooms[i].radio));
        list_final.push({key: user.email, value: user.firstname+" "+user.lastname})
        console.log(list_final);
       }
        res.status(200).json(list_final);

/*
      chatRooms.forEach(async cr => {
        console.log(cr.radio);
        var user =await User.findById(mongoose.Types.ObjectId(cr.radio));
        list_final.push(user.firstname+user.lastname);
        console.log(list_final);
      })
      res.status(200).json(list_final);*/
   
};


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
      res.status(200).json(user_connected);
    } else {
        res.status(500).json({error: " rahi khlet ya hamma rahi khlet"})
    }
  }

  export async function removeConnectedUser(req,res) {
    const user = await User.findOne({email: req.body.email_radio});
    const user_connected = await User.findOne({email: req.body.email_user});

    const chatRoom = await ChatRoom.findOne({radio: user})
    if (chatRoom){


      var i = 0;
         while (i < chatRoom.connectedUsers.length)
          {
         if (chatRoom.connectedUsers[i].equals((user_connected._id) )) {
          chatRoom.connectedUsers.splice(i, 1);
           console.log("test equality mebin")
           console.log(chatRoom.connectedUsers[i])
           console.log("wbin")
           console.log(user_connected._id)
           console.log("test wfe lehne")
           chatRoom.save();
           break;
              } else {
              ++i;
           }
              }
   //   chatRoom.connectedUsers.push(user_connected);
    //  chatRoom.save();
      res.status(200).json(user_connected);
    } else {
        res.status(500).json({error: " rahi khlet ya hamma rahi khlet"})
    }
  }

  export async function GetAllConnectedUsers(req, res) {
    var list = []
    const user = await User.findOne({email: req.body.email});
    const chatRoom = await ChatRoom.findOne({radio: user})
    if (chatRoom.connectedUsers.length>0){
      for(var i= 0; i < chatRoom.connectedUsers.length; i++)
      {
        
          var user_co =await User.findById(mongoose.Types.ObjectId(chatRoom.connectedUsers[i]));
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
      if(chatRoom.bannedUsers.includes(user._id)){
        res.status(200).json(chatRoom);
      }else{
        chatRoom.bannedUsers.push(user);
        chatRoom.save();
        res.status(200).json(chatRoom);
      }
        
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
        res.status(200).json(chatRoom);
    }else {
        res.status(500).json({error: "ya hamma rahi khlet"})
    }
  };

  export async function CheckBannedUser(req, res){
    const user = await User.findOne({email: req.body.email});
    const radio = await User.findOne({email: req.body.radio})
    const chatRoom = await ChatRoom.findOne({radio: radio}) 

    var found = false;
    if (chatRoom.bannedUsers.length>0){
      for(var i= 0; i < chatRoom.bannedUsers.length; i++)
      {
        
          var user_co =await User.findById(mongoose.Types.ObjectId(chatRoom.bannedUsers[i]));
          console.log(user_co._id.equals(user._id));
          console.log(user_co._id);
          console.log(user._id);

          if(user_co._id.equals(user._id)){
            found = true;
            break;
          }
       
       
       }
       res.status(200).json({key:"banned", value: found});
      
    } else {
      res.status(200).json({key:"banned", value: "false"});
    }
  }
