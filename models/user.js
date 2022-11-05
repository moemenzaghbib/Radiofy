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
        statut: {
            type: Boolean,
            required: true
        },
        is_verified: {
            type: Number,
            required: true
        },
        created_at: {
            type: Date,
            required: true
        },
        updated_at: {
            type: Date,
            required: true
        },
        avatar: {
            type: String,
            required: false
        }

    }
);
export default model('User',userSchema);