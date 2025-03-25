import express from 'express'
import adminAuth from '../middleware/adminAuth.js'
import { allOrder, placeOrder, placeOrderStripe, updateStatus, userOrders, verifyStripe } from '../controllers/orderController.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()
// FOR USER
orderRouter.get('/userorders/:userId', authUser, userOrders)

//VERIFY STRIPE METHOD
orderRouter.post('/verifyStripe', authUser, verifyStripe)

//FOR ADMIN
orderRouter.post('/list', adminAuth, allOrder)
orderRouter.post('/status', adminAuth, updateStatus)

//FOR PAYMENT
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)



export default orderRouter
