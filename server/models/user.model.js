const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        match:[/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,'Please enter a valid email']
    },
    hashedPassword: {
        type: String,
        required: true,
    
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roles:[{
        type: String,  
    }],
    
   
},{
    versionKey:false
});
module.exports = mongoose.model('User',UserSchema);