


export default function CustomerPageNav ({navOpen,openOrCloseNav,changeTab}){
    if(navOpen){
        return(
            <aside className = "customerNav">
            <button className= "custNavButton" type="button" onClick = {() => openOrCloseNav()}>-</button>
            <ul className = "customerNavList">
                <li className = "listItem"><button onClick = {
                     () => {
                         changeTab("ALL_BOOKINGS")
                         openOrCloseNav()
                     }}>all bookings</button></li>
                <li className = "listItem"><button onClick = {() => {
                    changeTab("ADD_BOOKING")
                    openOrCloseNav()}
                    
                    }>add booking</button></li>
                <li className = "listItem"><button>test</button></li>
            </ul>
        </aside>
        )
    }else{
        return(
            <aside className = "customerNav">
                
                <button className= "custNavButton" type="button" onClick = {() => openOrCloseNav()}>
                    ---</button>
            </aside>
            
        )
            
        
    }


}


