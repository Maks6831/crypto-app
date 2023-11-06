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
        <Carousel/>
        <div className='flex w-full h-full justify-center'>
          <div className='border-2 w-1/2 h-96'>
            <Pricegraph/>
          </div>
          <div className='border-2 w-1/2'>Volume</div>
        </div>
      </div> 
      <div>
        
      </div>
   </div>
  )
}
