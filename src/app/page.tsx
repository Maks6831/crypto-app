import { Carousel } from './components/Carousel';
import { CoinInfoContainer } from './components/CoinInfoContainer';
import { Navbar } from './components/Navbar';
import { Pricegraph } from './components/Pricegraph';
import { Timebar } from './components/Timebar';
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
      <div className=' bg-light-background w-full dark:bg-dark-background min-h-screen'>
        <div className='mb-2'>
          <Carousel/>
        </div>
        <div className='flex h-[25rem] w-full justify-center m-2'>
          <div className=' m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-light-text-color-two '>
            <CoinInfoContainer isPrice={true}/>
            <Pricegraph isLine={true}/>
          </div>
          <div className='m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-[37rem] flex justify-center items-end relative dark:bg-volume-background'>
            <CoinInfoContainer isPrice={false}/>
            <Pricegraph isLine={false}/>
          </div>
        </div>
        <div className='m-4 w-full relative '>
            <Timebar/>
        </div>
      </div> 
      <div>
        
      </div>
   </div>
  )
}
