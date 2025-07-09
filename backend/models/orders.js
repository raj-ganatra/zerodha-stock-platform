const { required } = require("joi");
const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        },
        type:{
            type:String,
            required:true,
        },
        qty:{
            type:Number,
            required:true,
        },
        newQty:{
            type:Number,
        },
        price:{
            type:Number,
            required:true,
        },
        product:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            default:"unfilled",
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        isChecked:{
            type:Boolean,
            required:true,
        },
        isProcessed:{
            type:Boolean,
            default:false,
        }
    }
)

const order=mongoose.model("order",orderSchema);

module.exports=order;