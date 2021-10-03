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
import '../../Style/stock/sidbar2.css'
import CopyrightIcon from '@material-ui/icons/Copyright';


const Sidebar = () => {
    return (
      <div
        style={{ display: 'flex', height: '93.2vh', overflow: 'scroll initial' }}
      >
        <CDBSidebar textColor="#fff" backgroundColor = "linear-gradient(to bottom, #0187b8,rgb(68, 67, 67));" >
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a
              href="/"
              className="text-decoration-none"
              style={{ color: 'inherit', marginLeft:'5%', paddingLeft:'1%', color:'#a99e88'}}
            >
               <strong>ACAPS Stocks</strong>
              
            </a>
          </CDBSidebarHeader>
  
          <CDBSidebarContent className="sidebar-content" >
            <CDBSidebarMenu>
              <NavLink exact to="./inventaire" activeClassName="activeClicked" >
                <CDBSidebarMenuItem className="aaaxxx"  icon="user" >Inventaire</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/fournitureinformatique" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="aaaxxx" icon="step-forward">Fourniture</CDBSidebarMenuItem>
              </NavLink>
             
              <NavLink exact to="/gestionarticle" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="aaaxxx" backgroundColor="blue" icon="calendar-day">
                   Article
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/gestionfourniture" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="aaaxxx" backgroundColor="blue" icon="calendar-day">
                   Gestion fourniture
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/articleendommage" activeClassName="activeClicked">
                <CDBSidebarMenuItem className="aaaxxx" backgroundColor="blue" icon="calendar-day">
                  Article endommagé
                </CDBSidebarMenuItem>
              </NavLink>
              
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