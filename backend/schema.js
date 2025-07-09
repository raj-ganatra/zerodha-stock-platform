const Joi=require("joi");

//as i am sending formData like this not like {formData} so i dont want to create 
//formDara.Joi.object().required(),

module.exports.productSchema=Joi.object({
    qty:Joi.number().required().min(1),
    price:Joi.number().required().min(0),
    companyName:Joi.string().required(),
    date: Joi.date(),
    type:Joi.string().required(),
    isChecked:Joi.boolean().required(),
    userId:Joi.string().required(),
    product:Joi.string().required(),
});

module.exports.userSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com'] } }) // Valid email
        .pattern(/@gmail\.com$/)
        .required(),
    password: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
});

module.exports.positionSchema=Joi.object({
    product:Joi.string().required(),
    companyName:Joi.string().required(),
    userId:Joi.string().required(),
    qty:Joi.number().required(),
    type:Joi.string().required(),
    avg:Joi.number().required(),
    LTP:Joi.number(),
    change:Joi.number(),
    date:Joi.date(),
    isProcessed:Joi.boolean(),
    _id:Joi.string(),
    price:Joi.number(),
    status:Joi.string(),
    newQty:Joi.number(),
    isChecked:Joi.boolean(),
    __v:Joi.number(),
});

module.exports.holdingSchema=Joi.object({
    companyName:Joi.string().required(),
    qty:Joi.number().required(),
    avg:Joi.number().required(),
    userId:Joi.string().required(),
    type:Joi.string().required(),
    LTP:Joi.number(),
    net:Joi.number(),
    day:Joi.number(),
    date:Joi.date(),
    isProcessed:Joi.boolean().required(),
    _id:Joi.string(),
    price:Joi.number(),
    status:Joi.string(),
    newQty:Joi.number(),
    product:Joi.string(),
    isChecked:Joi.boolean(),
    __v:Joi.number(),
});

module.exports.orderSchema=Joi.object({
    companyName:Joi.string().required(),
    userId:Joi.string().required(),
    type:Joi.string().required(),
    qty:Joi.number().required(),
    newQty:Joi.number(),
    price:Joi.number().required(),
    product:Joi.string().required(),
    status:Joi.string(),
    date:Joi.date(),
    isChecked:Joi.boolean().required(),
    isProcessed:Joi.boolean(),
});