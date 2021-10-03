import React, {useEffect, useState} from 'react'
import '../Style/mesDemandes.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import Table from '@material-ui/core/Table';
import Cookies from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import { red } from '@material-ui/core/colors';

export default function MesDemandes() {
    
    const [ID, setID] = useState([])
    const [Designation, setDesignation] = useState()
    const [DateDemande, setDateDemande] = useState()
    const [Etat, setEtat] = useState()
    const [rows, setRows] = useState([])
    const [showmdal, setshowmdal] = useState(false)
    const [stateForm, setstateForm] = useState(" displayNone")
    const [detailDemande,setDetailDemande] = useState([])
   /* const [CodeArticle, setCodeArticle] = useState()
    const [NomArticle, setNomArticle] = useState()
    const [Quantite, setQuantite] = useState()
    const [Fourniture, setFourniture] = useState()
    const [Validation, setValidation] = useState()*/
    
    
    const columns = [
        {
          field: 'dateDemande',
          headerClassName: 'colorm',
          headerName: 'Date Demande',
          headerAlign: 'center',
          headercolor: 'red',
          width: 230,
          editable: true,
          renderCell : (params)=>{
            return convertDate(params.row.dateDemande)
          }
        },
        {
          field: 'etat',
          headerName: 'Etat',
          headerClassName: 'colorm',
          headerAlign: 'center',
          width: 150,
          editable: true,
        },
     
          {
            field: "actions",
            headerName: "Détails",
            headerClassName: 'colorm',
            headerAlign: 'center',
            sortable: false,
            width: 400,
            disableClickEventBubbling: true,
            renderCell: (params) => {
              return (
                      <button className="buttloopp"  onClick={()=>{
                        axios.post("http://localhost:3001/detaildemande",{idDemande:params.id}).then((rsp=>{
                        console.log(rsp.data)  
                        setDetailDemande(rsp.data);
                        }))
                affichermodal()
                setstateForm("displayFlex")
                  }}><SearchIcon className="iconloopp"/></button>
              );
             }
            }

     
      ];
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
      }
      const columnsDetailDemande = [
        { field: 'codeArticle', headerName: 'Code Article',headerAlign: 'center',headerClassName: 'colorm', width: 160 },
        { field: 'nom', headerName: 'Nom article',headerAlign: 'center',headerClassName: 'colorm', width: 150 },
        { field: 'fourniture', headerName: 'Fourniture',headerAlign: 'center',headerClassName: 'colorm', width: 148 },
        { field: 'qte', headerName: 'Quantité demandée',headerAlign: 'center', headerClassName: 'colorm',width: 202 },
        
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
      useEffect(()=>{
        axios.get("http://localhost:3001/demande/",{
          params:{
            username:Cookies.get("username")
          }
        } )
              .then(res =>{
                  console.log(res.data)
                  setRows(res.data)
              });
      },[])
    return (
       <div className="page">
          <Modal visible={showmdal} width="662" height="450"  effect="fadeInUp"  className="detailmodel" onClickAway={() =>closemodal()}>
          
          <DataGrid
            getRowClassName={(params) =>`backddd`}
                  rows={detailDemande}
                  columns={columnsDetailDemande}
                  pageSize={5}
                  disableSelectionOnClick/>
            
          </Modal>
            <div className="titree"  > <h2>Mes demandes</h2></div>
            <div className="ajouter">
              <button className="ajouterdem">
                <a href="/ajouterDemande">Ajouter demandes</a>
              </button>
            </div>
            <br/>
            <div style={{ height: 630, width: '51.5%', marginLeft: '20%' }}>
              <DataGrid
              getRowClassName={(params) =>`backddd`}
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick/>
            </div>
            
       </div>
      


       
        
    )


}
