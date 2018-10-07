import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const PatientSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter the first name'
    },

    lastName: {
        type: String,
        required: 'Enter the second name'
    },

    patronymic: {
        type: String
    },

    address: {
        type: String,
        required: 'Enter the address'
    },

    telephone: {
        type: String,
        required: 'Enter the telephone number'
    },

    birthday: {
        type: Date,
        required: 'Enter the birth date'
    },

    fluorography: {
        type: Date
    },

    creatingDate: {
        type: Date,
        default: Date.now
    }
});
