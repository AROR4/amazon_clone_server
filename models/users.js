const mongoose=require('mongoose');
const { productSchema } = require('./product');

const userScheme=mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,

    },
    email:{
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value)=>{
                const re="^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";
                return value.match(re);
            },
            message: "Please enter a valid email address",
        }
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: (value)=>{
                
                return value.length > 6;
            },
            message: "Please enter a long password",
        }
    },
    address: [
        {
            name: {
                type:String,
                required: true,
            },
            add: {
                type:String,
                required: true,
            },
            phone: {
                type:String,
                required: true,
            }
        }
    ],

    type: {
        type: String,
        default: 'user',
    },
    cart : [
        {
            product : productSchema,
            quantity: {
                type: Number,
                required: true,
            }

        }
    ]
});

const User=mongoose.model("User",userScheme);

module.exports=User;