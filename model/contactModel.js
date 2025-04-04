const mongoose = require('mongoose');

const ContactMssgSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const ContactMssg = mongoose.model('ContactMssg', ContactMssgSchema);
module.exports = ContactMssg;