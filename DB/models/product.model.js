import {mongoose, model, Schema, Types } from "mongoose";

const productSchema = new Schema({

    name:{
        type: String,
        required: true, 
        unique: true,
        trim: true,
        min: 3,
        max: 60,
    },
    description:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        default:1,
    },
    price:{
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
    },
    priceAfterDiscount:{
        type: Number,
    },
    slug:{
        type: String,
        required: true,
    },
    mainImage:{
        type: Object,
        required: true,
    },
    subImages:[
        {
            type: Object,
        }
    ],
    status:{
        type: String,
        default : "active",
        enum: ["active", "inactive"],
    },
    createdBy:{
        type: Types.ObjectId,
        ref: "User",
    },
    updatedBy:{
        type: Types.ObjectId,
        ref: "User",
    },
    colors:[String],
    sizes:[
        {
            type: [String],
            enum:['sm', 'md' , 'lg' , 'xlg' , '2xlg' , '3xlg'],
        }
    ],
    categoryId:{
        type: Types.ObjectId,
        ref: "Category",
    }
},{
    timestamps: true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});

productSchema.virtual('reviews',{
    ref: 'Review',
    localField: '_id',
    foreignField: 'productId',
})


const productModel = mongoose.models.Product || model('Product', productSchema);
export default productModel;