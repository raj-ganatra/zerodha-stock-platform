const mongoose=require("mongoose");

const positionSchema=new mongoose.Schema(
    {
        product:{
            type:String,
            required:true,
        },
        companyName:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        },
        qty:{
            type:Number,
            required:true,
        },
        type:{
            type:String,
            required:true,
        },
        avg:{
            type:Number,
            required:true,
        },
        LTP:{
            type:Number,
            required:true,
        },
        change:{
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

const Position=mongoose.model("Position",positionSchema);

module.exports=Position;