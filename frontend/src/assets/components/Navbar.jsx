import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({containerStyles, onClick}) => {
const navLinks =[
    {path:"/", title:"Home"},
    {path:"/Collection", title:"Collection"},
    {path:"/Blog", title:"Blog"},
    {path:"/Contact", title:"Contact"},
]  
  return (
    <nav className={`${containerStyles}`}>
        {navLinks.map((link)=>(
            <NavLink
            key={link.title}
            to={link.path}
            className={({isActive})=>
                `${isActive? "active-link":""} px-3 py-2 rounded-full`}
            onClick={onClick}//Close menu when link clicked
            >
             {link.title}
            </NavLink>
        ))}

    </nav>
  )
}

export default Navbar