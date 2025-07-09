require('dotenv').config();

const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const passport=require("passport");
const localStratergy=require("passport-local");
const cookieParser=require("cookie-parser");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");

const buyProduct=require("./models/buyProduct.js");
const sellProduct=require("./models/sellProduct.js");
const position=require("./models/position.js");
const holding=require("./models/holding.js");
const order=require("./models/orders.js");
const user=require("./models/user.js");
const { isLoggedIn }=require("./middleware.js");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");

const {productSchema,userSchema,positionSchema,holdingSchema,orderSchema}=require("./schema.js");

// console.log(ExpressError);

const dbUrl=process.env.ATLASDB_URL;

const app=express();

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:"mysupersecret",
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("error occured in mongo session",err);
});

const sessionOptions={
    store:store,
    secret:"mysupersecret",
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly: true,
        secure: false,
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }
}

app.use(session(sessionOptions));
app.use(cors({
    origin:[
        "https://frontend-l0do.onrender.com",
        "https://dashboard-v8fk.onrender.com",
    ],
    credentials:true,
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratergy(user.authenticate()));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

main()
    .then(()=>{
        return console.log("connection-successfull");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

function validateProductSchema(req,res,next){
    let {error}=productSchema.validate(req.body);
    console.log(error);

    if(error){
        let errMsg=error.details.map((el)=>{
            return el.message;
        }).join(",");

        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};

function validateUserSchema(req,res,next){
    let {error}=userSchema.validate(req.body);
    console.log(error);

    if(error){
        let errMsg=error.details.map((el)=>{
            return el.message;
        }).join(",");

        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

function validatePositionSchema(req,res,next){
    let {error}=positionSchema.validate(req.body);
    console.log(error);

    if(error){
        let errMsg=error.details.map((el)=>{
            return el.message;
        }).join(",");

        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

function validateHoldingSchema(req,res,next){
    let {error}=holdingSchema.validate(req.body);
    console.log(error);

    if(error){
        let errMsg=error.details.map((el)=>{
            return el.message;
        }).join(",");

        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

function validateOrderSchema(req,res,next){
    let {error}=orderSchema.validate(req.body);
    console.log(error);

    if(error){
        let errMsg=error.details.map((el)=>{
            return el.message;
        }).join(",");

        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

app.get("/",(req,res)=>{
    res.send("working!");
})

app.get("/setcookies",isLoggedIn,(req,res)=>{
    res.cookie("testcookie","testvalue",{
        httpOnly:true,
        sameSite:"lax",
    });

    res.send("cookie sent!");
})

app.post("/buying",validateProductSchema,wrapAsync(async (req,res)=>{
        if(!req.body){
            throw new ExpressError(400,"Send Valid data!");
        };

        let response=req.body;

        const newBuy=new buyProduct(response);
        // console.log(newBuy);

        await newBuy.save();
    
        res.send(newBuy);
}));



app.post("/selling",isLoggedIn,validateProductSchema,wrapAsync(async (req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    const newSell=new sellProduct(response);
    // console.log(newSell);
    await newSell.save();
    res.send("selled product");
}))



app.get("/positions/:userId",isLoggedIn,wrapAsync(async (req,res)=>{
    if(!req.params.userId){
        throw new ExpressError(400,"Send Valid data!");
    };
    let userId=req.params.userId;
    let positionsArr=await position.find({userId});
    res.send(positionsArr);
}))



app.post("/positions",isLoggedIn,validatePositionSchema,wrapAsync(async (req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    let existingPosition=await position.findOne({companyName:response.companyName, type:response.type}); 

    if(existingPosition){
        const totalQty=Number(existingPosition.qty)+Number(response.qty);

        const totalCost=(existingPosition.avg*existingPosition.qty)+(response.price*response.qty);

        const newAvg=totalCost/totalQty;

        const newLTP=response.price;
  
        // const newProfitLoss=(newLTP-newAvg)*totalQty;

        await position.updateOne(
            {companyName:response.companyName},
            {
                avg:newAvg,
                qty:totalQty,
                LTP:newLTP,
                date:new Date(),
            }
        )

        const updatedPosition=await position.findOne({companyName:response.companyName});
        res.send(updatedPosition);
        console.log("updatedPosition: "+updatedPosition);
    }else{
        const {_id, ...cleanedResponse}=response;

        console.log(response.price+" "+response.qty);

        const newPosition=new position({
            ...cleanedResponse,
            avg:response.price/response.qty,
            // LTP:Number(response.LTP),
            LTP:3122.5,
            change:-1.24,
        });

        // console.log("newPosition: "+newPosition);

        await newPosition.save();
    
        res.send(newPosition);
    }
}))



app.put("/positions",isLoggedIn,validatePositionSchema,wrapAsync(async (req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    let existingPosition=await position.findOne({companyName:response.companyName});

    let newQty=existingPosition.qty-response.qty;
    // console.log(existingPosition.qty+" "+response.qty);
    // console.log(newQty);

    let change=Number(existingPosition.LTP)-Number(existingPosition.avg);

    if(newQty==0){
        let deleteResponse=await position.deleteOne({companyName:response.companyName});

        res.send(deleteResponse);
    }else if(newQty>0){
        let updatedResponse=await position.findOneAndUpdate(
            {companyName:response.companyName},
            {
                qty:newQty,
                change:change,
            },
            {new:true},
        )

        res.send(updatedResponse);
    }else{
        console.log("more qty are going to sell then buyed!");
        res.send("more qty are going to sell then buyed!");
    }
}))



app.get("/holdings/:userId",isLoggedIn,wrapAsync(async(req,res)=>{
    if(!req.params.userId){
        throw new ExpressError(400,"Send Valid data!");
    };
    let userId=req.params.userId;
    let holdingArr=await holding.find({userId});
    // console.log(holdingArr);
    res.send(holdingArr);
}))



app.post("/holdings",isLoggedIn,validateHoldingSchema,wrapAsync(async(req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    // console.log(response);

    let existingHolding=await holding.findOne({companyName:response.companyName, type:response.type});

    if(existingHolding){
        const totalQty=Number(existingHolding.qty)+Number(response.qty);
        // console.log(existingHolding.qty+" "+response.qty);

        const totalCost=(existingHolding.avg*existingHolding.qty)+(response.price*response.qty);

        const newAvg=totalCost/totalQty;

        const newLTP=response.price;

        await holding.updateOne(
            {companyName:response.companyName},
            {
                qty:totalQty,
                avg:newAvg,
                LTP:newLTP,
                date:new Date(),
            }
        )

        let updatedHolding=await holding.findOne({companyName:response.companyName});

        res.send(updatedHolding);
    }else{
        const {_id, ...cleanedResponse}=response;

        console.log(response.price+" "+response.qty);

        const newHolding=new holding(
            {
                ...cleanedResponse,
                avg: response.price/response.qty,
                LTP: 577.75,
                net: 18.08,
                day: 0.32,
            }
        )

        console.log(newHolding);

        await newHolding.save();

        res.send(newHolding);
    }
}))



app.put("/holdings",isLoggedIn,validateHoldingSchema,wrapAsync(async (req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    let existingHolding=await holding.findOne({companyName:response.companyName});

    let newQty=existingHolding.qty-response.qty;

    console.log(existingHolding.qty+" "+response.qty);

    let change=existingHolding.LTP-existingHolding.avg;

    if(newQty==0){
        let deleteResponse=await holding.deleteOne({companyName:response.companyName});
        console.log(deleteResponse);
        res.send(deleteResponse);
    }else if(newQty>0){
        let updatedResponse=await holding.findOneAndUpdate(
            {companyName:response.companyName},
            {
                qty:newQty,
                change:change,
            },
            {new:true}
        )
        console.log(updatedResponse);
        res.send(updatedResponse);
    }else{
        res.send("more qty are going to sell then buyed!");
        console.log("more qty are going to sell then buyed!");
    }
}))


app.post("/orders/place",isLoggedIn,validateOrderSchema,wrapAsync(async (req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let response=req.body;

    let existingOrder=await order.findOne({companyName:response.companyName, type:response.type, product:response.product});

    if(existingOrder){
        await order.updateOne(
            {companyName:response.companyName},
            {
                qty:Number(existingOrder.qty)+Number(response.qty),
                date:new Date(),
            }
        )

        let updatedResponse=await order.findOne({companyName:response.companyName});

        if(response.type==="buy"){
            await matchBuyOrder(updatedResponse);
        }else{
            await matchSellOrder(updatedResponse);
        }

        res.send(updatedResponse);
    }else{
        const newOrder=new order(response);

        await newOrder.save();

        // console.log(newOrder+" order placed!")

        if(response.type==="buy"){
            await matchBuyOrder(newOrder);
        }else{
            await matchSellOrder(newOrder);
        }

        res.send(newOrder+" order placed!");
    }
}))

async function matchBuyOrder(buyOrder){
    const sellOrders=await order.find(
        {
            companyName:buyOrder.companyName,
            type:"sell",
            status:{
                $in:["unfilled","partial"],
            },
            price:{
                $lte:buyOrder.price,
            },
        }
    ).sort({price:1, date:1});

    // const sellOrders=await order.find();

    // console.log(sellOrders);
    // console.log(sellOrders.length);

    if(sellOrders.length==0){
        buyOrder.newQty=buyOrder.qty;
        await buyOrder.save();
    }

    // console.log(buyOrder.newQty);


    for(let sell of sellOrders){
        if(buyOrder.qty===0 || buyOrder.product!=sell.product){
            break;
        }

        const matchQty=Math.min(buyOrder.qty, sell.qty);

        buyOrder.newQty=buyOrder.qty-matchQty;
        sell.newQty=sell.qty-matchQty;

        sell.status=sell.newQty===0 ? "filled" : "partial";
        buyOrder.status=buyOrder.newQty===0 ? "filled" : "partial";

        // console.log("checked buy order!");

        await sell.save();
        await buyOrder.save();

    }
}

app.get("/orders/:userId",isLoggedIn,wrapAsync(async (req,res)=>{
    if(!req.params){
        throw new ExpressError(400,"Send Valid data!");
    };
    const {userId}=req.params;
    const orders=await order.find({userId}).sort({date:-1});
    res.send(orders);
}))


async function matchSellOrder(sellOrder){
    const buyOrders=await order.find(
        {
            companyName:sellOrder.companyName,
            type:"buy",
            status:{
                $in:["unfilled","partial"],
            },
            price:{
                $lte:sellOrder.price,
            },
        }
    ).sort({price:1, date:1});

    // const buyOrders=await order.find();

    // console.log(buyOrders);

    if(buyOrders.length==0){
        sellOrder.newQty=sellOrder.qty;
        await sellOrder.save();
    }

    for(let buy of buyOrders){
        if(sellOrder.qty===0 || sellOrder.product!=buy.product){
            break;
        }

        const matchQty=Math.min(sellOrder.qty,buy.qty);

        sellOrder.newQty=sellOrder.qty-matchQty;
        buy.newQty=buy.qty-matchQty;
        console.log("match qty "+matchQty);

        buy.status=buy.newQty===0 ? "filled" : "partial";
        sellOrder.status=sellOrder.newQty===0 ? "filled" : "partial";

        await buy.save();
        let updatedSellOrder=await sellOrder.save();
        // console.log("updated sell"+updatedSellOrder);
    }
}

app.put("/orders/:userId",isLoggedIn,wrapAsync(async(req,res)=>{
    if(!req.params){
        throw new ExpressError(400,"Send Valid data!");
    };
    let {userId}=req.params;
    let response=req.body;
    // console.log(response);
    await order.updateOne(
        {companyName:response.companyName,userId:userId},
        {
            isProcessed:true,
        }
    )

    let updated=await order.findOne({companyName:response.companyName,userId:userId});

    res.send(updated);
}))

app.post("/signup",validateUserSchema,wrapAsync(async(req,res)=>{
    if(!req.body){
        throw new ExpressError(400,"Send Valid data!");
    };
    let {email, username, password}=req.body;

    // console.log(`email: ${email}`);

    const newUser=new user({email,username});

    const registeredUser=await user.register(newUser,password);

    //.flash("success","user registered successfully!");

    res.send(registeredUser);
}))

app.post("/login",
    passport.authenticate("local",{
        session:true,
        failWithError:true,
    }),
    (req,res)=>{
        res.send("login-successfully!");
    },
    (err,req,res,next)=>{
        res.send("unsuccessfull!");
    }
)

app.get("/check-auth",isLoggedIn,wrapAsync(async (req,res)=>{
    if(req.isAuthenticated()){
        let {username,email}=req.user;
 
        let obj={
            status:"loggedIn",
            info:{
                username:username,
                email:email,
            }
        }

        res.send(obj);
        // res.json({ authenticated: true, user: req.user });
    }else{
        res.send("notLoggedIn");
        // res.json({ authenticated: false });
    }
}))

app.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.session.destroy(() => {
            console.log("destroyed!");
            res.clearCookie("connect.sid"); // Destroy session cookie
            res.send("logout");
        });
    })
})

//handling all remaining routes
// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404, "Page not Found!"));
// })

//error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode=500,message="something get wrong!"}=err;
    res.status(statusCode).send(message);
});

let port=3000;

app.listen(port,(req,res)=>{
    console.log(`app is listening to port ${port}`);
})