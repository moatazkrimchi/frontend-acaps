import React, {useEffect, useState} from 'react'
import '../../Style/stock/inventraire.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';



export default function Inventaire() {

    
    const [rows, setRows] = useState([])
    const [facture, setfacture] = useState([])
    const [showmdal, setshowmdal] = useState(false)
    const [model, setmodel] = useState(false)
    const [stateForm, setstateForm] = useState(" displayNone")


    const columns = [
        
        {
          field: 'codeArticle',
          headerName: 'Code article',
          width: 155,
          editable: true,
          headerAlign: 'center',
          headerClassName: 'colorae',
        },
        {
          field: 'nom',
          headerName: 'Nom article',
          headerAlign: 'center',
          headerClassName: 'colorae',
          width: 150,
          editable: true,
        },
        {
          field: 'quantite',
          headerName: 'Quantité',
          width: 145,
          headerAlign: 'center',
          headerClassName: 'colorae',
          editable: true,
        },
     
          {
            field: "fourniture",
            headerName: "Fourniture",
            sortable: false,
            width: 150,
            headerAlign: 'center',
            headerClassName: 'colorae',
            disableClickEventBubbling: true,
          },
         
          {
            field: "entre",
            headerName: "Entré",
            sortable: false,
            width: 130,
            headerAlign: 'center',
            headerClassName: 'colorae',
            disableClickEventBubbling: true,
          },
          {
            field: "sortie",
            headerName: "Sortie",
            sortable: false,
            width: 130,
            headerAlign: 'center',
            headerClassName: 'colorae',
            disableClickEventBubbling: true,
          },
         
          {
            field: "total",
            headerName: "Valeur article",
            sortable: false,
            width: 164,
            headerAlign: 'center',
            headerClassName: 'colorae',
            disableClickEventBubbling: true,
           
          },
          
           {
            field: "facture",
            headerName: "Facture",
            sortable: false,
            width: 145,
            headerAlign: 'center',
            headerClassName: 'colorae',
            disableClickEventBubbling: true,
            renderCell: (params) => {
              return (
                  <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                      {/* <PersonIcon /> */}
                      <button className="buttloop4" onClick={()=>{
                      
                        axios.post("http://localhost:3001/facturearticle",{idarticle:params.id}).then((rsp=>{
                         console.log(rsp.data)  
                        setfacture(rsp.data);
                         }))
                            setmodel(true)
                            setstateForm("displayFlex")
                          }}> <SearchIcon className="iconloopi">Plus...</SearchIcon></button>
                          
                          <a href={"/facture/"+params.id} className="buttloop4" ><GetAppIcon className="iconloopi">Plus...</GetAppIcon></a>
                 
                  </div>
                  
              );
             }
          },

     
      ];
      const Facture = [
        { field: 'fournisseur', headerName: 'Fournisseur',headerAlign: 'center',headerClassName: 'colorae', width: 220 },
        { field: 'prix', headerName: 'Prix',headerAlign: 'center',headerClassName: 'colorae', width: 220 },
        { field: 'quantite', headerName: 'Quantité',headerAlign: 'center',headerClassName: 'colorae', width: 220 },
        {
          field: "dateajout",
          headerName: "Date d'Ajout",
          sortable: false,
          width: 140,
          headerAlign: 'center',
          headerClassName: 'colorae',
          disableClickEventBubbling: true,
          renderCell : (params)=>{
            return convertDate(params.row.dateajout)
          }
        },
        {
          field: "dateexp",
          headerName: "Date de péremption ",
          sortable: false,
          width: 180,
          headerAlign: 'center',
          headerClassName: 'colorae',
          disableClickEventBubbling: true,
          renderCell : (params)=>{
            return convertDate(params.row.dateexp)
          }
        },
       
        
      ]
      
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

      function Article(){
        axios.post("http://localhost:3001/inventaire/",configuration )
            .then(res =>{
                console.log(res.data)
                setRows(res.data)
            });    
    }; 
    useEffect(()=>{
      Article()
    },[])
    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat)
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
      
    return (
       <div className="page">
          <Modal visible={model} width="982" height="450"  effect="fadeInUp"  className="detailmodel" onClickAway={() =>setmodel(false)}>
          
          <DataGrid
            getRowClassName={(params) =>`backddd`}
                  rows={facture}
                  columns={Facture}
                  pageSize={5}
                  disableSelectionOnClick/>
            
          </Modal>
          
            <div className="titre"  > <h2>Inventaire</h2></div>
            
            <br/>
            <div style={{ height: 400, width: '427%' , marginLeft:'-400%' ,marginTop:'20%'}}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick/>
            </div>
            
       </div>
      


       
        
    )


}
