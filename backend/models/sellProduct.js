const mongoose=require("mongoose");

const sellProductSchema=new mongoose.Schema(
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

const Sell=mongoose.model("Sell",sellProductSchema);

module.exports=Sell;