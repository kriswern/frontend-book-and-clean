import '../css/Layout.css';

export default function Navbar (){
   
    
    return(
        

        <nav className = "nav">
            <h2 className  ="bookIcon">Book</h2>
            <ul className = "navList">
                 <li className = "link-primary navlistItem">
                     <button>
                         <a class="nav-link">home</a>
                    </button>
                </li>
                <li className = "link-primary navlistItem">
                    <button>
                        <a class="nav-link test">admin</a>
                    </button>
                </li>
                <li className = "link-primary navlistItem">
                    <button>
                        <a class="nav-link">placeholder</a>
                    </button>
                </li>
             </ul>
        </nav>
        
        
    
        
    

    )
}