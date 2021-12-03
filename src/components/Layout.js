import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import { useState, useEffect } from 'react';
import '../css/Layout.css';

export default function Layout ({children}){
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
      }

     
        const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
        useEffect(() => {
            function handleResize() {
              setWindowDimensions(getWindowDimensions());
            }
        
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
          }, []);

         
    return(
        <div className = "pageLayout" style = {{height: windowDimensions.height}}>
            
                <Header/>
                <Navbar/>
                <main>
                    {children}
                </main>
                <Footer/>
           
        </div>
    );

}