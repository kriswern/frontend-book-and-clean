import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import '../css/Layout.css';
import { useState } from 'react';

export default function Layout ({children}){// we can remove the currentheader if we want
    let pageName;
    try {
         pageName = children.type.name;
    } catch (error) {
        pageName = "BOOK";
    }

    const currentHeader = pageName;
         
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