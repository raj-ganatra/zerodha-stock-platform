//async error direaclty comes from from db so we need to handle them

module.exports = (fn)=>{
    return function(req,res,next){
        fn(req,res,next).catch(next);
    }
}