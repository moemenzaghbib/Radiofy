import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const chatRoomSchema = new Schema(
    {
        radio: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        connectedUsers:[{ type: mongoose.Schema.ObjectId, ref: 'User'}],
        bannedUsers:[{ type: mongoose.Schema.ObjectId, ref: 'User'}]
       
    }
    
);
export default model('ChatRoom',chatRoomSchema);