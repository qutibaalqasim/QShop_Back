import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({

    userName:{
        type: String,
        required: true, 
        min: 3,
        max: 30,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 4,
    },
    image:{
        type: Object,
    },
    phone:{
        type: String,
    },
    address:{
        type: String,
    },
    confirmEmail:{
        type: Boolean,
        default: false,
    },
    gender:{
        type: String,
        enum: ["male", "female"],
    },
    status:{
        type: String,
        enum: ["active", "inactive"],
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    sendCode:{
        type: String,
        default: null,
    }
},{
    timestamps: true,
});


const userModel = mongoose.models.User || model('User', userSchema);
export default userModel;