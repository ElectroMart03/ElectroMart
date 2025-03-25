import React from 'react'
import { TbArrowBackUp, TbTruckDelivery,  } from 'react-icons/tb'
import { RiSecurePaymentLine } from 'react-icons/ri'
const ProductFeatures = () => {
    return (
        <div className='bg-primary rounded-xl mt-6'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 rounded-xl'>
                <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
                    <div className=''>
                        <TbArrowBackUp className='mb-3 text-yellow-500'/></div>
                    <div>
                        <h4 className='h4 capitalize'>EASY RETURN</h4>
                        <p>We offer a hassle-free return policy for your convenience! 
                            If you're not satisfied with your purchase, you can return it within 7 days for a refund or exchange. 
                            Simply initiate a return, pack the item securely, 
                            and choose a return method. Shop with confidence! </p>
                    </div>
                </div>

                <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
                    <div className=''>
                        <TbTruckDelivery className='mb-3 text-red-500'/></div>
                    <div>
                        <h4 className='h4 capitalize'>Fast Delivery</h4>
                        <p>Get your order delivered fast with our express shipping options! 
                            We ensure quick processing and dispatch so you receive your products in the shortest time possible. 
                            Shop now and enjoy speedy delivery! </p>
                    </div>
                </div>

                <div className='flexCenter gap-x-4 p-2 rounded-3xl'>
                    <div className=''>
                        <RiSecurePaymentLine className='mb-3 text-blue-500'/></div>
                    <div>
                        <h4 className='h4 capitalize'>Secure Payment</h4>
                        <p>Enjoy a safe and secure payment experience with our trusted payment gateways.
                             Your transactions are protected with advanced encryption, ensuring complete security and peace of mind while shopping.
                              We support multiple payment options for your convenience. </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductFeatures