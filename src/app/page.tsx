import { Carousel } from './components/Carousel';
import { Navbar } from './components/Navbar';
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
      <div><Carousel/></div>
   </div>
  )
}
