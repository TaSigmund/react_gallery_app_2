//dependencies
import React from 'react';
import {NavLink} from 'react-router-dom';
/*** 
 SEARCH BUTTONS FOR "OCEAN", "FOREST" AND "MOUNTAIN"
****/
function Nav(props){
    return(
        <nav className="main-nav">
        <ul>
          <li><NavLink to="/search/ocean" 
                onClick={()=> {
                  props.performSearch('ocean')}
                }>ocean
              </NavLink></li>
          <li><NavLink to="/search/forest" 
                onClick={()=> {
                  props.performSearch('forest')}}>forest
              </NavLink></li>
          <li><NavLink to="/search/mountains" 
                onClick={()=> {
                  props.performSearch('mountains')}}>mountains
                </NavLink></li>
        </ul>
      </nav>
    )
}

export default Nav
