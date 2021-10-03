import React, {useEffect, useState} from 'react'
import '../Style/historiquedemande.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal'
import SearchIcon from '@material-ui/icons/Search';


export default function MesDemandes() {
  const [showmdal, setshowmdal] = useState(false)
  const [stateForm, setstateForm] = useState(" displayNone")
  const [rows, setRows] = useState([])
  const [detailDemande,setDetailDemande] = useState([])



  function affichermodal(demande) {
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

    function Historiquedemande(){
      axios.get("http://localhost:3001/historiquedemande/",configuration )
          .then(res =>{
              console.log(res.data)
              setRows(res.data)
          });    
  }; 
  useEffect(()=>{
    Historiquedemande()
  },[])





    const columns = [
     
      {
        field: 'collaborateur',
        headerName: 'Collaborateur',
        headerAlign: 'center',
        headerClassName: 'colorm',
        width: 200,
        editable: true,
      },
      {
        field: 'dateDemande',
        headerName: 'Date Demande',
        headerAlign: 'center',
        headerClassName: 'colorm',
        width: 200,
        editable: true,
        renderCell : (params)=>{
          return convertDate(params.row.dateDemande)
        }
      },
      {
        field: 'etat',
        headerName: 'Etat ',
        headerAlign: 'center',
        headerClassName: 'colorm',
        width: 150,
        editable: true,
      },
      
   
         
        {
          field: 'datevalidationrefus',
          headerName: 'Date validation / refus ',
          headerAlign: 'center',
          headerClassName: 'colorm',
          width: 220,
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
        field: "actions",
        headerName: "Détails",
        headerAlign: 'center',
        headerClassName: 'colorm',
        sortable: false,
        width: 200,
        disableClickEventBubbling: true,
        renderCell: (params) => {
          return (
              <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                  {/* <PersonIcon /> */}
                  <button className="buttloop5"  onClick={()=>{
                    axios.post("http://localhost:3001/detaildemande",{idDemande:params.id,ishistoriqueform:true}).then((rsp=>{
                    console.log(rsp.data)  
                    setDetailDemande(rsp.data);
                    }))
            affichermodal()
            setstateForm("displayFlex")
          }}><SearchIcon className="iconloop5"></SearchIcon></button>
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
      { field: 'beneficier', headerName: 'Bénéficier',headerAlign: 'center', headerClassName: 'colorm',width: 202 },
    ]
    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat)
      return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
    }
   
    return (
      <div className="page">
      <Modal visible={showmdal} width="865" height="450"  effect="fadeInUp"  className="detailmodel" onClickAway={() =>closemodal()}>
          
          <DataGrid
            getRowClassName={(params) =>`backddd`}
                  rows={detailDemande}
                  columns={columnsDetailDemande}
                  pageSize={5}
                  disableSelectionOnClick/>
            
          </Modal>
        <div className="titreh"> <h2>Historique demandes </h2></div>

     
     <br/>
     <div style={{ height: 700, width: '64.5%', marginLeft: '19.5%' ,marginTop:'3%' }}>
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
