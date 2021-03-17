import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MarathonSchema = new Schema(
    {
        problems: [{
            name:{
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            }
        }],
        data: {
            type: Date,
            default: new Date().toLocaleDateString("en-US")
        },
        dealer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        members: [
            {
                name: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                },
                rank: {
                    type: Number,
                    required: false,
                    default: 0,
                },
                points: {
                    type: Number,
                    required: false,
                    default: 0,
                    min: 0
                }
            }
        ],
        status: {
            type: String,
            enum: ['CREATED', 'IN_PROGRESS', 'CLOSED'],
            default: 'CREATED'
        },
        points: {
            type: Number,
            min: 0
        }
    },

    { timeStamps: true },
);

const Marathon = model('Marathon', MarathonSchema);

export { Marathon };