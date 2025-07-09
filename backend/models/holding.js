const mongoose =require("mongoose");

const holdingSchema=new mongoose.Schema(
    {
        companyName:{
            type:String,
            required:true,
        },
        qty:{
            type:Number,
            required:true,
        },
        avg:{
            type:Number,
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
        LTP:{
            type:Number,
            required:true,
        },
        net:{
            type:Number,
            required:true,
        },
        day:{
            type:Number,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        isProcessed:{
            type:Boolean,
            default:false,
        }
    }
)

const Holding=mongoose.model("Holding",holdingSchema);

module.exports=Holding;