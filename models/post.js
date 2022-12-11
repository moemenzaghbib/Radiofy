import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        },
        desc: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true
        },
        comments: [{ body: String, date: Date, author: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' 
        } }],
       
    },
    {
        timestamps: true
    }
);
export default model('Post',postSchema);