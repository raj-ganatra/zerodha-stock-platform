const mongoose=require("mongoose");

const buyProductSchema=new mongoose.Schema(
    {
        qty:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        companyName:{
            type:String,
            required:true,
        },
        date:{
            type:Date,
            default:Date.now(),
        },
        type:{
            type:String,
            required:true,
        },
        isChecked:{
            type:Boolean,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        },
        product:{
            type:String,
            required:true,
        }
    }
)

const Buy=mongoose.model("Buy",buyProductSchema);

module.exports=Buy;