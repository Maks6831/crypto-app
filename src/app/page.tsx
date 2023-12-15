import { Buttonswitcher } from './components/Buttonswitcher';
import { Carousel } from './components/Carousel';
import { CoinInfoContainer } from './components/CoinInfoContainer';
import { Cointable } from './components/Cointable';
import { Pricegraph } from './components/Pricegraph';
import { Timebar } from './components/Timebar';
import "./globals.css";

export default function Home() {
  return (
  <div>
    <div className=' bg-light-background w-full dark:bg-dark-background min-h-screen'>
    <div className=' w-1/2 h-full flex justify-center'>
      <Buttonswitcher/>
    </div>
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
      <div className='m-4 w-1/2 h-full flex justify-center'>
        <Timebar/>
      </div>
      <div className='flex justify-center items-center'>
        <Cointable/>
      </div>
    </div> 
  </div>
  )
}
