import React, {useEffect, useState} from 'react'
import '../../Style/stock/fourniturebureautique.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';



export default function FournitureBureautique() {

    
    const [rows, setRows] = useState([])
    const [showmdal, setshowmdal] = useState(false)
   
    

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'designation',
          headerName: 'Designation',
          width: 160,
          editable: true,
        },
        {
          field: 'dateDemande',
          headerName: 'Date Demande',
          width: 180,
          editable: true,
        },
        {
          field: 'etat',
          headerName: 'Etat',
          width: 110,
          editable: true,
        },
     
          {
            field: "actions",
            headerName: "Detaille",
            sortable: false,
            width: 160,
            disableClickEventBubbling: true,
          }

     
      ];
      
      function affichermodal() {
        setshowmdal(true)
      }
      function closemodal() {
        setshowmdal(false)
      }
      
      const configuration = {
        headers : {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
        }
      }
      
    return (
       <div className="page">
          
            <div className="titre"  > <h2>Fourniture Bureautique</h2></div>
            
            <br/>
            <div style={{ height: 400, width: '98%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick/>
            </div>
            
       </div>
      


       
        
    )


}
