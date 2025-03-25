import userModel from "../models/userModel.js"


//CONTROLLER FUNCTION FOR ADDING PRODUCT TO USER CART
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, color } = req.body;
    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {}; // ✅ Ensure cartData exists

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][color] = (cartData[itemId][color] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { $set: { cartData } }); 

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//CONTROLLER FUNCTION FOR UPDATING USER CART
const updateCart = async (req, res) => {
  try {
      console.log("Incoming Request Body:", req.body); // Debugging

      const { userId, productId, quantity } = req.body;

      if (!userId || !productId || quantity === undefined) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      console.log("User Found:", user); // Debugging

      if (!user.cartData) user.cartData = {};
      user.cartData[productId] = quantity;

      await user.save();
      console.log("Cart Updated Successfully:", user.cartData);
      console.log(req.user);

      res.status(200).json({ message: "Cart updated successfully", cart: user.cartData });
  } catch (error) {
      console.error("Error updating cart:", error);
      res.status(500).json({ message: "Failed to update cart in database", error });
  }
};


//CONTROLLER FUNCTION FOR GETTING USER CART
const getUserCart = async (req, res)=>{
try {
    const {userId} = req.body
    const userData = await userModel.findById(userId)

    let cartData =await userData.cartData
    res.json({success:true, cartData})
} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
}  
}

export {addToCart, updateCart, getUserCart}