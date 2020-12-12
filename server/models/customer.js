const mongoose = require('mongoose')
const { isEmail } = require('validator')
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!isEmail(value)){
                throw new Error('無効なメールアドレスです。')
            }
        }
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    reservation: {
        type: Schema.Types.ObjectId,
        ref: 'reservation'
    }
  },{
    timestamps: true
  });

  mongoose.model('customer', CustomerSchema);