import React from 'react'
import '../../Style/stock/nav.css'
import logo from "../../Images/logo.png"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie';



export default function navbar(props) {
    return (
        <div>
            <div className="nav" >
               <div className="logo" > <img src={logo} alt=""/> </div>
               
               <div className="rightsid" >
                   <div className="admin" >  {props.type} </div>
                   
               </div>
               <label className="profil">{Cookies.get("username")}</label>
               <div onClick={(e)=>{
                   Cookies.remove("role")
                   Cookies.remove("username")
                   Cookies.remove("direction")
                   document.location.href="http://localhost:3000/auth"
               }} className="activeClicked">
                 <ExitToAppIcon  className="out" titleAccess="Se déconnecter"/>
              </div>
  
              
               
            </div>
        </div>
    )
}