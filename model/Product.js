const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    product_price: {
        type: String,
        required: true
    },
    product_relese_date: {
        type: Date,
        default: Date.now
    },
    product_desciption: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    isSaved: {
        type: Boolean,
        default: false
    },
    thumb_img: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('Product', ProductSchema)