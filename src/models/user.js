import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema(
    {
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
        }
    },

    { timeStamps: true, discriminatorKey: 'role' },
);

const User = model('User', UserSchema);

export { User };