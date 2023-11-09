import { Carousel } from './components/Carousel';
import { Navbar } from './components/Navbar';
import { Pricegraph } from './components/Pricegraph';
import { Topbar } from './components/Topbar';
import "./globals.css";

export default function Home() {
  return (
   <div>
    <div>
      <Topbar/>
    </div>
    <div>
      <Navbar/>
    </div>
      <div className=' bg-light-background dark:bg-dark-background min-h-screen'>
        <div className='mb-2'>
          <Carousel/>
        </div>
        <div className='flex h-[25rem] justify-center m-2'>
          <div className=' m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-light-text-color-two '>
          <div className='absolute left-6 top-6'>
              <div className='font-normal pb-2 mb-3 text-xl leading-6 text-light-text-color-two dark:text-card-text-gray '>Volume 24h</div>
              <div className='font-bold text-3xl mb-2 leading-7 text-light-text-color-three dark:text-white'>$807.243 bln</div>
              <div className='font-normal text-base text-light-text-color '>september 24, 2023</div>
            </div>
            <Pricegraph isLine={true}/>
          </div>
          <div className='m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-volume-background'>
            <div className='absolute left-6 top-6 '>
              <div className='font-normal pb-2 mb-3 text-xl leading-6 text-light-text-color-two dark:text-card-text-gray  '>Volume 24h</div>
              <div className='font-bold text-3xl mb-2 leading-7 text-light-text-color-three dark:text-white '>$807.243 bln</div>
              <div className='font-normal text-base text-light-text-color '>september 24, 2023</div>
            </div>
            <Pricegraph isLine={false}/>
          </div>
        </div>
      </div> 
      <div>
        
      </div>
   </div>
  )
}
