import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const MarathonSchema = new Schema(
    {
        problems: {
            type: [String],
        },
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
        pointing: {
            winner: {
                type: Number,
                default: 30,
                min: 1,
            },
            delta: {
                type: Number,
                default: 8,
                min: 1
            }
        }
    },

    { timeStamps: true },
);

const Marathon = model('Marathon', MarathonSchema);

export { Marathon };