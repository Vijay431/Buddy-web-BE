import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const AuthSchema = new Schema({
    phone: {
        type: String
    },
    email: {
        type: String
    }
})