import mongoose from 'mongoose';
const { Schema, model } = mongoose;

interface MarathonProps {
    _id: string;
    problems: [{
        name: String;
        url: String;
        points: Number;
    }],
    data: Date,
    dealer: String,
    members:[{
        name: String;
        rank: Number;
        points: Number;
    }],
    status: String;
    points: Number;
}

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
            },
            points: {
                type: Number,
                required: true,
                default: 0,
                min: 0
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

    { timestamps: true },
);

const Marathon = model('Marathon', MarathonSchema);

export { Marathon, MarathonProps };