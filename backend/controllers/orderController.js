import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"


//GLOBAL VARIABLES FOR PAYMENT
const currency = 'INR'
const deliveryCharges = 10


//GATEWAY INITIALIZE
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


//CONTOLLER FUNCTION FOR PLACING ORDER USING COD METHOD
const placeOrder = async (req,res)=>{
try {
    const {userId, items, amount, address} = req.body;

    const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod:'COD',
        payment:false,
        date:Date.now()
    }


    const newOrder = new orderModel(orderData)
    await newOrder.save()

    await userModel.findByIdAndUpdate(userId, {cartData:{}})

    res.json({success:true, message: 'Order Placed'})
} catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
}
}


//CONTOLLER FUNCTION FOR PLACING ORDER USING STRIPE METHOD
const placeOrderStripe = async (req,res)=>{
    try {
        const {userId, items, amount, address} = req.body;
        const {origin} = req.headers;
        // console.log("reqbody",req.body)
        // console.log("req headers",req.headers)

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:'Stripe',
            payment:true, 
            date:Date.now()
        }

        // console.log("order data",orderData)
    
    
        const newOrder = new orderModel(orderData)
        

        const line_items = items.map((item)=> ({
            price_data: {
                currency: currency,
                product_data:{
                    name: item.name
                },
                unit_amount : item.price * 100 * 83 // Convert into INR
            },
                 quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: currency,
                product_data:{
                    name: "Delivery Charge"
                },
                unit_amount : deliveryCharges * 100 * 83 // Convert into INR
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode:'payment',
           
        })

        // console.log("new order",newOrder);
        // console.log("line items ",line_items);
        console.log("sessions  ",session);
        await newOrder.save() 
        res.json({success:true, session_url: session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
        
    }
}

//CONTOLLER FUNCTION FOR VERIFICATION STRIPE (THIS IS A TEMP METHOD)
const verifyStripe = async (req,res)=>{
    const {orderId, success, userId} = req.body;
    console.log("req.body",req.body);

    try {
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData: {}})
            res.json({success:true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
        
    }
}



//CONTOLLER FUNCTION FOR GETTING ALL ORDERS DATA FOR ADMIN PANEL
const allOrder = async (req,res)=>{
   try {
    const orders = await orderModel.find({})
    res.json({success:true, orders})

   } catch (error) {
     console.log(error)
     res.json({success:false, message: error.message})
    
   }
}

//CONTOLLER FUNCTION FOR GETTING USER ORDERS DATA FOR FRONTEND
// const userOrders = async (req,res)=>{
//     console.log("route is hittngg ")
//     try {
//         const {userId} = req.params;
//         console.log("req params:", req.params);
        
//         if(!userId){
//             res.json({success:false, message: 'User ID is required'})
//         }
//         const orders = await orderModel.find({userId})
//         if (orders.length === 0) {
//             return res.json({ success: false, message: "No orders found for this user" });
//         }
//         console.log("Fetched Orders:", orders); // ✅ Debugging
//         res.json({success:true, orders})
//     } catch (error) {
//         console.log(error)
//         res.json({success:false, message: error.message})
//     }
// }

const userOrders = async (req, res) => {
    const { userId } = req.params;  // Get the userId from the URL params
          console.log("req params:", req.params);
    try {
        // Find all orders for the given userId
        const orders = await orderModel.find({ userId })
        .sort({ date: -1 })  // Sort the orders by date in descending order
        console.log("Fetched Orders:", orders);  // ✅ Debugging
        // If no orders are found
        if (orders.length === 0) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }

        res.status(200).json({ success: true, orders });   // Send the orders as the response in JSON format
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders', error: err });
    }
};

//CONTOLLER FUNCTION FOR UPDATING USER ORDER STATUS
const updateStatus = async (req,res)=>{
try {
    const {orderId, status} = req.body;

    await orderModel.findByIdAndUpdate(orderId, {status})
    res.json({success:true, message: 'Order status updated'})
} catch (error) {
    console.log(error)
    res.json({success:false, message: error.message})
    
}
}

export {placeOrder, placeOrderStripe, allOrder, userOrders, updateStatus, verifyStripe}