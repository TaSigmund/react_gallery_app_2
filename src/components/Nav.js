import React from 'react';
import {NavLink} from 'react-router-dom';

/*** 
 * returnes the three search buttons for "ocean", "forrest" and "mountains"
 ***/
function Nav(props){
    return(
        <nav className="main-nav">
        <ul>
          <li><NavLink to="/search/ocean" onClick={()=> props.searchFor("ocean")}>ocean</NavLink></li>
          <li><NavLink to="/search/forrest" onClick={()=> props.searchFor("forrest")}>forrest</NavLink></li>
          <li><NavLink to="/search/mountains" onClick={()=> props.searchFor("mountains")}>mountains</NavLink></li>
        </ul>
      </nav>
    )
}

export default Nav
