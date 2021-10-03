import React, {useEffect, useState} from 'react'
import '../Style/demandetraite.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal'
import CloseIcon from '@material-ui/icons/Close';
import Cookies from 'js-cookie';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';



export default function MesDemandes() {
  const [showmdal, setshowmdal] = useState(false)
  const [stateForm, setstateForm] = useState(" displayNone")
  const [rows, setRows] = useState([])
  const [detailDemande,setDetailDemande] = useState([])
  const [modelconf, setmodelconf] = useState(false)
  const [idDemandeSelected, setIdDemandeSelected] = useState(0)


  function affichermodal(demande) {
    setshowmdal(true)
    
   
  }
  function closemodal() {
    setshowmdal(false)
    setmodelconf(false)
  }
  
  const configuration = {
    headers : {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
    }
    }
    function Demandetraite(){
      axios.get("http://localhost:3001/demandetraite/",{
        params:{
          username:Cookies.get("username")
        }
      } )
          .then(res =>{
              console.log(res.data)
              setRows(res.data)
          });    
  }; 
   
  useEffect(()=>{
    Demandetraite()
    

  },[])



  const columns = [
    
    
    {
      field: 'dateDemande',
      headerName: 'Date Demande',
      width: 250,
      headerAlign: 'center',
      headerClassName: 'colorm',
      editable: true,
      
      renderCell : (params)=>{
        return convertDate(params.row.dateDemande)
      }
      
    },
    {
      field: 'etat',
      headerName: 'Etat',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'colorm',
      editable: true,
    },
 
  
        
          {
              field: 'datevalidationrefus',
              headerName: 'Date validation / refus ',
              headerAlign: 'center',
              headerClassName: 'colorm',
              width: 258,
              editable: true,
              renderCell : (params)=>{
                if(params.row.datevalidationrefus == null){
                  return null
                }
    
                else{
                return convertDate(params.row.datevalidationrefus)
              }
              }
            },
          {
            field: "observation",
            headerName: "Observation",
            headerAlign: 'center',
            sortable: false,
            headerClassName: 'colorm',
            width: 250,
            disableClickEventBubbling: true,
            },

            {
              field: "confirmation",
              headerName: "Confirmation",
              headerAlign: 'center',
              sortable: false,
              headerClassName: 'colorm',
              width: 150,
              disableClickEventBubbling: true,
              renderCell: (params) => {
                
                return (
                  params.row.etat=="validé"?<div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}><button className="buttconf"  onClick={()=>{
                    setIdDemandeSelected(params.id)
                    setmodelconf(true)
                    setstateForm("displayFlex")
                  }}> <CheckCircleOutlineIcon className="iconconf">Confirmer</CheckCircleOutlineIcon> </button></div>:""
                  
                );
               }
              },

      {
        field: "actions",
        headerName: "Détails",
        headerAlign: 'center',
        sortable: false,
        width: 160,
        headerClassName: 'colorm',
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  {/* <PersonIcon /> */}
                  <button className="buttloop3"  onClick={()=>{
                    axios.post("http://localhost:3001/detaildemande",{idDemande:params.id}).then((rsp=>{
                    console.log(rsp.data)  
                    setDetailDemande(rsp.data);
                    }))
            affichermodal()
            setstateForm("displayFlex")
          }}><SearchIcon className="iconloop3"></SearchIcon></button>
              </div>
          );
         }
        },
  ];
  const columnsDetailDemande = [
    { field: 'codeArticle', headerName: 'Code Article',headerAlign: 'center',headerClassName: 'colorm', width: 160 },
    { field: 'nom', headerName: 'Nom article',headerAlign: 'center',headerClassName: 'colorm', width: 150 },
    { field: 'fourniture', headerName: 'Fourniture',headerAlign: 'center',headerClassName: 'colorm', width: 148 },
    { field: 'qte', headerName: 'Quantité demandée',headerAlign: 'center', headerClassName: 'colorm',width: 202 },
    
  ]
  function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }
   
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
          <Modal visible={modelconf} width="800" height="300" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
            <div className="iconclose">
            <CloseIcon onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}/>
            </div>


            <h1 className="title">Vous voulez confirmer la reception ?</h1>
            <div className="butanuller">
            <button onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}> Annuler </button></div>
                                    <div className="butval">
            <button onClick={()=>{
            axios.post("http://localhost:3001/confirmerdemande/",{
              configuration:configuration,
              idDemande:idDemandeSelected
            })
            .then(res =>{
              console.log(res.data)
              
            });
            Demandetraite()
            setmodelconf(false)
            setstateForm("displayNone")
            }}>Confirmer</button></div>
          </Modal>
        <div className="titret"> <h2>Demande traité </h2></div>
       
        <br/>
        <div style={{ height: 630, width: '80%', marginLeft: '8%', marginTop: '3%' }}>
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
