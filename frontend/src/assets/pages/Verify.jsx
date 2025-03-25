import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { ShopContext } from '../../context/ShopContext';
import { toast } from 'react-toastify';

const Verify = () => {
    const { token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();  // ✅ Use useNavigate

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) return;
            const response = await axios.post(
                backendUrl + '/api/order/verifyStripe',
                { success, orderId },
                { headers: { token } }
            );
            
            console.log("Verify Payment Response:", response.data); 

            if (response.data.success) {
                setCartItems({});
                toast.success("Payment Successful! Redirecting to Orders...");
                navigate('/orders');  // Redirect to Orders
            } else {
                toast.error("Payment verification failed!");
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            verifyPayment();
        }
    }, [searchParams, token]);
     

    return <div>Verifying Payment...</div>;
};

export default Verify;
