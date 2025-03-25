import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../../context/ShopContext';
import axios from 'axios';
import Title from '../components/Title';
import Footer from '../components/Footer';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orderData, setOrderData] = useState([]);
    const userId = localStorage.getItem("userId");
    const [loading, setLoading] = useState(false);

    const fetchAllOrder = async () => {
        setLoading(true);
        try {
            // Use the correct backend URL (assuming VITE_BACKEND_URL is correct)
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/userorders/${userId}`, { headers: { token } });
            console.log("API Response in orders:", response.data.orders[0]?.amount); // Debugging
                
            // Set the orders to state
            setOrderData(response.data.orders);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch orders on component mount
        fetchAllOrder();
    }, []); // Empty dependency array ensures this runs once when the component is mounted

    // Show loading spinner or message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Show error message if order data is empty or not fetched properly
    if (!orderData || orderData.length === 0) {
        return <div>No orders found</div>;
    }

    return (
        <div>
            <div className="bg-primary mb-16">
                <div className="max-padd-container py-10">
                    <Title title1={'Order'} title2={'List'} title1Styles={'h3'} titleStyles={'pb-4'} />
                    {orderData.map((order) => (
                        <div key={order._id} className="bg-white p-2 mt-3 rounded-lg">
                            <div className="text-gray-700 flex flex-col gap-4">
                                <div className="flex gap-x-3 w-full">
                                    <div className="flex gap-6">
                                        {/* IMAGE */}
                                        <img
                                            src={order.items[0]?.image[0]} // Assuming items is an array and image is in that array
                                            alt="orderImg"
                                            className="sm:w-[99px] rounded-lg aspect-square object-cover"
                                        />
                                    </div>
                                    {/* ORDER INFO */}
                                    <div className="block w-full">
                                        <h5 className="h5 capitalize line-clamp-1">{order.items[0]?.name}</h5>
                                        <div className="flexBetween flex-wrap">
                                            <div>
                                                <div className="flex items-center gap-2 sm:gap-x-3">
                                                    <div className="flexCenter gap-x-2">
                                                        <h5 className="medium-14">Price:</h5>
                                                        <p>{currency}{order.items[0]?.price}</p>
                                                    </div>
                                                    <div className="flexCenter gap-x-2">
                                                        <h5 className="medium-14">Quantity:</h5>
                                                        <p>{order.items[0]?.quantity}</p>
                                                    </div>
                                                    <div className="flexCenter gap-x-2">
                                                        <h5 className="medium-14">Color:</h5>
                                                        <p>{order.items[0]?.color}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <h5 className="medium-14">Date:</h5>
                                                    <p>{new Date(order.date).toDateString()}</p>
                                                </div>
                                                <div className="flex items-center gap-x-2">
                                                    <h5 className="medium-14">Payment:</h5>
                                                    <p>{order.paymentMethod}</p>
                                                </div>
                                            </div>
                                            {/* Status & Button */}
                                            <div className="flex gap-3">
                                                <div className="flex items-center gap-2">
                                                    <p className="min-w-2 rounded-full bg-green-500"></p>
                                                    <p>{order.status}</p>
                                                </div>
                                                <button onClick={fetchAllOrder} className="btn-secondary !p-1.5 !py-1 !text-xs">
                                                    Track Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
