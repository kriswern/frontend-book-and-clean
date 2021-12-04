import Header from './layout/Header';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import '../css/Layout.css';

export default function Layout ({children}){
   

         
    return(
        <div className = "pageLayout container-fluid">
            
                <Header/>
                <Navbar/>
                <main className="p-2">
                    {children}
                </main>
                <Footer/>
           
        </div>
    );

}