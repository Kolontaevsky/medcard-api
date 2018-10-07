import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

export const StaffSchema = new Schema({
    certificateId: {
        type: Number,
        require: 'Enter the certificate id'
    },

    firstName: {
        type: String,
        require: 'Enter the first name'
    },

    secondName: {
        type: String,
        require: 'Enter the second name'
    },

    patronymic: {
        type: String
    },

    specialization: {
        type: String,
        require: 'Enter the specialization'
    },

    hireDate: {
        type: Date,
        require: 'Enter the hire date'
    }
});