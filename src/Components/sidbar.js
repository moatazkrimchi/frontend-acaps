import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import '../Style/sidbar.css'
import Cookies from 'js-cookie';
import CopyrightIcon from '@material-ui/icons/Copyright';

const Sidebar = () => {
    return (
      <div
        style={{ display: 'flex', height: '93.2vh', overflow: 'scroll initial',
        
         
      
      }}
      >
        <CDBSidebar textColor="#fff" backgroundColor = "linear-gradient(to bottom, #114977,rgb(68, 67, 67))" >
          <CDBSidebarHeader className="sid" prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: 'inherit', marginLeft:'5%', paddingLeft:'1%', color:'#a99e88'}}
            >
              <strong>ACAPS Fourniture</strong>
              
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content" >
            <CDBSidebarMenu>
              <NavLink exact to="./mesdemandes" activeClassName="activeClicked" >
                <CDBSidebarMenuItem   className="aaaxxx" icon="user" >Mes demandes</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/demandeencours" activeClassName="activeClicked">
                <CDBSidebarMenuItem  className="aaaxxx" icon="step-forward">Demandes en cours</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/demandetraite" activeClassName="activeClicked">
                <CDBSidebarMenuItem  className="aaaxxx" icon="table">Demandes traités</CDBSidebarMenuItem>
              </NavLink>
              {Cookies.get('role')==="RF"?<div>
                <NavLink  exact to="/validerdemande" activeClassName="activeClicked">
                  <CDBSidebarMenuItem className="aaaxxx" icon="check">
                    Valider demandes
                  </CDBSidebarMenuItem>
                </NavLink>
    
                <NavLink exact to="/historiquedemande" activeClassName="activeClicked">
                  <CDBSidebarMenuItem  className="aaaxxx"  backgroundColor="blue" icon="calendar-day">
                    Historique demandes
                  </CDBSidebarMenuItem>
                </NavLink>
              </div>:<p></p>}
              
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{ textAlign: 'center' }}>
            <div
              style={{
                padding: '30px 5px',
              }}
            >
              
              Copyright <CopyrightIcon className="copyicon"></CopyrightIcon> 2021 <div className="acaps">ACAPS</div>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Sidebar;