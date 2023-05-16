const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require:[true, 'please input a name']
    },
    price: {
        type: Number,
        require: [true, 'Input a price']
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    created: {
        type: Date,
        default:Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not '
        }
    }
})

module.exports = mongoose.model('product', productSchema)