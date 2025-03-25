import React from 'react'
import headphone from '../headphones.png'
import { FaArrowRightLong } from 'react-icons/fa6'


const Hero = () => {
  return (
   <section className='max-padd-container'>
    <div className='grid grid-cols-2 bg-hero bg-cover bg-center
    bg-no-repeat rounded-2xl h-[633px]'>
        {/* leftside */}
        <div className='place-content-end max-xs:min-w-80'>
            <div className='p-4'>
                <p className='text-white max-w-xs'>Wide range of multiple electronic products available only on ElectroMart </p>
                <button className="btn-white mt-6">Explore more</button>
            </div>
        </div>
        {/* right side */}
        <div className='hidden xs:block place-items-end'>
            <div className='flex flex-col rounded-2xl w-[211px]
            relative top-10 right-4 p-2 bg-white'>
               <img src={headphone} alt="" className='rounded-2xl
               bg-slate-900/10'/>
               <button className='btn-light !py-1 !text-xs flexCenter
               gap-2 mt-2'>Explore this product<FaArrowRightLong/>
               </button>
            </div>
        </div>
    </div>
   </section>
  )
}

export default Hero