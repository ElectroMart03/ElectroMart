import React from 'react'

const ProductDescription = () => {
    return (
        <div className='ring-1 ring-slate-900/10 rounded-lg'>
            <div className='flex gap-3'>


                <button className='medium-14 p-3 w-32 border-b-2 border-secondary'>Description</button>
                <button className='medium-14 p-3 w-32'>Care Guide</button>
                <button className='medium-14 p-3 w-32'>Color Guide</button>
            </div>
            <hr className='h-[1px] w-full ' />
            <div className='flex flex-col gap3 p-3'>
                <div >
                    <h5 className='h5'>Detail</h5>
                    <p className='text-sm'>Upgrade your experience, designed to deliver efficiency, convenience, and cutting-edge technology. Whether you're at home, at work, or on the go, this product ensures seamless performance with its key features, e.g., high-speed processing, long battery life, smart connectivity.</p>
                    <p>With a sleek and durable design, it fits perfectly into your lifestyle while offering enhanced functionality. The latest technology, e.g., AI integration, wireless connectivity, energy-efficient performance ensures that you stay ahead, whether for entertainment, productivity, or everyday use.</p>
                </div>
                <div>
                    <h5 className='h5 '>Benefit</h5>
                    <ul className='list-disc pl-5 text-sm text-gray-30 flex flex-col gap1'>
                        <li>High-Quality Material ensure Long-lasting durability and comfort.</li>
                        <li>designed to meet the needs of modern, active lifestyles.</li>
                        <li>Available in a wide range of colors and trendy colors</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription