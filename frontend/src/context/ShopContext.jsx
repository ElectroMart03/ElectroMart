import React, { useState, createContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const currency = '$';
  const delivery_charges = 10;
  const userId = localStorage.getItem("userId"); 

  // Load cart data from localStorage when the app starts
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch product data
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load products');
    }
  };

  //GETTING USER CART
  const getUserCart = async (token)=>{
    try {
      const response = await axios.post(backendUrl+ '/api/cart/get', {}, {headers: {token}})
      if(response.data.success){
        setCartItems(response.data.cartData)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
    getProductData();
  }, [cartItems]);

  // Adding items to cart
  const addToCart = async (itemId, color) => {
    if (!color) {
      toast.error("Please select a color first");
      return;
    }
  
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][color] = (cartData[itemId][color] || 0) + 1;
    setCartItems(cartData);
  
    if (token) {
      try {
        
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { userId, itemId, color }, 
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error("Failed to update cart in database");
      }
    }
  };
  



  // Get total cart count
  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const color in cartItems[item]) {
        totalCount += cartItems[item][color] || 0;
      }
    }
    return totalCount;
  };

  // Update cart quantity
  const updateQuantity = async (itemId, color, quantity) => {
    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) cartData[itemId] = {};

    if (quantity > 0) {
      cartData[itemId][color] = quantity;
    } else {
      delete cartData[itemId][color]; // Remove color entry if quantity is 0
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // Remove item if no colors left
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, color, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.log(error);
        toast.error('Failed to update cart in database');
      }
    }
  };

  // Get total cart value
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id.toString() === item.toString());
      if (!itemInfo) continue;

      for (const color in cartItems[item]) {
        totalAmount += itemInfo.price * cartItems[item][color];
      }
    }
    return totalAmount;
  };

  const value = {
    navigate,
    products,
    search,
    setSearch,
    currency,
    delivery_charges,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    token,
    setToken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
