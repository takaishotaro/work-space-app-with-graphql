const mongoose = require('mongoose')
const { isBefore, isAfter, isEmail } = require('validator')
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
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
        type: String,
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'plan'
    },
    date: {
        type: Date,
        required: true,
    },
    startAt: {
        type: Date,
        required: true,
        validate(value){
            const date = value.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(" ")[0]

            const businessHour = isAfter(
                value.toLocaleString({ timeZone: 'Asia/Tokyo' }), `${date} 08:00`
            ) && isBefore(
                value.toLocaleString({ timeZone: 'Asia/Tokyo' }), `${date} 22:00`
            )

            if(!businessHour){
                throw new Error('営業時間外です。')
            }
        }
    },
    finishAt: {
        type: Date,
        required: true,
        validate(value){
            const date = value.toLocaleString({ timeZone: 'Asia/Tokyo' }).split(" ")[0]

            const businessHour = isAfter(
                value.toLocaleString({ timeZone: 'Asia/Tokyo' }), `${date} 08:00`
            ) && isBefore(
                value.toLocaleString({ timeZone: 'Asia/Tokyo' }), `${date} 22:00`
            )

            if(!businessHour){
                throw new Error('営業時間外です。')
            }
        }
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false,
    },
    usingStatus: {
        type: String,
        default: '未到着'
    },
    approval: {
        type: String,
        default: '承認待ち'
    }
  },{
    timestamps: true
  });

  mongoose.model('reservation', ReservationSchema);
