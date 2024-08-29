const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true, // better to have index property for a key which is used for searching or some operations
    },
    role: {
        type: String,
        default: 'subscriber',
    },
    cart: {
        type: Array,
        default: [],
    },
    address: String,
    wishlist: [{type: ObjectId, ref: "Product"}],

}, {timestamps: true}) // timestamps : true means any time we create the user it updates the date the user created

module.exports = mongoose.model('User', userSchema) // creates a model of User