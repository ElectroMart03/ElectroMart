import React from 'react'
import { FaDribbble, FaFacebookF, FaInstagram } from 'react-icons/fa6'

const NewsLetter = () => {
  return (
    <section className='max-padd-container boreder-t-[1px]  border-primary py-4'>

      <div className='flexBetween flex-wrap gap-7'>
        <div>
          <h4 className='bol-14 uppercase tracking-wider'>
            Subscribe newletter
          </h4>
          <p>Get latest information on Events, sales and offers</p>
        </div>

        <div>
          <div className='flex bg-primary'>
            <input type="email" placeholder='Email Address' className='p-4 bg-primary w-[266px] 
            outline-none text-x-[13px]' />
            <button className='btn-dark !rounded-none !text-[13px]
    !font-bold'>Submit</button>
          </div></div>
        <div className='flex gap-x-3 pr-14'>
          <div className='h8 w-8 rounded-full
    hover:bg-tertiary hover:text-white flexCenter teansition-all duration-500'><FaFacebookF /></div>
        
        <div className='h8 w-8 rounded-full
    hover:bg-tertiary hover:text-white flexCenter teansition-all duration-500'><FaInstagram /></div>

<div className='h8 w-8 rounded-full
    hover:bg-tertiary hover:text-white flexCenter teansition-all duration-500'><FaDribbble /></div>

        </div>
      </div>
    </section>)
}

export default NewsLetter