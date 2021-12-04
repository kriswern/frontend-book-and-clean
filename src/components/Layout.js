import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import '../css/Layout.css';
import { useState } from 'react';

export default function Layout ({children}){// we can remove the currentheader if we want
    const pageName = children.type.name;
    const currentHeader = useState(pageName);
         
    return(
        <div className = "pageLayout container-fluid">
            
                <Header
                currentHeader = {currentHeader}/>
                <Navbar/>
                <main className="p-2">
                    {children}
                </main>
                <Footer/>
           
        </div>
    );

}