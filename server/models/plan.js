const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PlanSchema = new Schema({
    planName: { 
        type: String,
        required: true 
    },
    dynamicPricing: { 
        type: Boolean,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: false
    },
    staticPrice: {
        type: Number,
        required: false
    }
});

  mongoose.model('plan', PlanSchema);