import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import '../css/Layout.css';
import { useState } from 'react';

export default function Layout ({children}){// we can remove the currentheader if we want
  

   
         
    return(
        <div className = "pageLayout container-fluid">
            
                <Header/>
                <main className="p-2">
                    {children}
                </main>
                <Footer/>
           
        </div>
    );

}