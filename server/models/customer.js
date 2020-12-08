const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        min: 10,
        max: 15,
    },
    email: String,
    password: String
  });
