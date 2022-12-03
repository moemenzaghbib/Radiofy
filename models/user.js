import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },
        statut: {
            type: Boolean,
            required: true
        },
        is_verified: {
            type: Number,
            required: true
        },
                avatar: {
            type: String,
            required: false
        },
        
                googleID: {
                type: String,
                required: false
        },
                 posts: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
          ]
        
        
        

    }
    ,
    {
        timestamps: true
    }
);
export default model('User',userSchema);