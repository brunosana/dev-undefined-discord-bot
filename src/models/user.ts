import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface UserProps {
    userId: string;
    name: string;
    points: number;
    wins: number;
}

const UserSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true            
        },
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        points: {
            type: Number,
            min: 0,
            default: 0
        },
        wins: {
            type: Number,
            min: 0
        }
    },

    { timestamps: true },
);

const User = model('User', UserSchema);

export { User, UserProps };