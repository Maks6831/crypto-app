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
        <div className='flex h-[25rem] justify-center'>
          <div className=' m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-full flex justify-center items-end'>
            <Pricegraph isLine={true}/>
          </div>
          <div className='m-2 p-6 bg-white-color rounded-xl  h-[25rem] w-full flex justify-center items-end'>
            <Pricegraph isLine={false}/>
          </div>
        </div>
      </div> 
      <div>
        
      </div>
   </div>
  )
}
