import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post'     
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        content: {
            type: String,
            required: true
        },
    }
)
export default model('Comment',commentSchema);