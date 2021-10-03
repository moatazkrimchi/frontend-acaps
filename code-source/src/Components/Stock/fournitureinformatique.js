import React, {useEffect, useState} from 'react'
import '../../Style/stock/fournitureinformatique.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';




export default function FournitureInformatique() {

    
    const [rows, setRows] = useState([])
    const [facture, setfacture] = useState([])
    const [showmdal, setshowmdal] = useState(false)
    const [model, setmodel] = useState(false)
    const [stateForm, setstateForm] = useState(" displayNone")
    const [detailDemande,setDetailDemande] = useState([])
    const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


    const columns = [
        { field: 'fourniture', headerName: 'Fourniture', width: 160 ,headerClassName: 'colorae',
        headerAlign: 'center'},
        
        {
          field: 'codeArticle',
          headerName: 'Code Article',
          width: 180,headerClassName: 'colorae',
          headerAlign: 'center',
          editable: true,
        },
        {
          field: 'nom',
          headerName: 'Nom Article',
          width: 180,headerClassName: 'colorae',
          headerAlign: 'center',
          editable: true,
        },
     
          {
            field: "quantite",
            headerName: "Quantité stock",
            sortable: false,
            width: 160,headerClassName: 'colorae',
            headerAlign: 'center',
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
          {
            field: "actions",
            headerName: "Detaille",
            sortable: false,
            width: 175,headerClassName: 'colorae',
            headerAlign: 'center',
            disableClickEventBubbling: true,
            renderCell: (params) => {
              return (
                  <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                      {/* <PersonIcon /> */}
                      <button className="buttloopo" onClick={()=>{
                      
                        
                        axios.post("http://localhost:3001/detaillearticle",{idarticle:params.row.codeArticle}).then((rsp=>{
                         console.log(rsp.data)  
                        setDetailDemande(rsp.data);
                         }))
                affichermodal()
                setstateForm("displayFlex")
              }}> <SearchIcon className="iconloopi">Plus...</SearchIcon></button>
                  </div>
              );
             }
            },

     
      ];
      const columnsDetailDemande = [
        { field: 'dateDemande', headerName: 'Date demande',headerAlign: 'center',headerClassName: 'colorae', width: 160 },
        { field: 'collaborateur', headerName: 'Collaborateur',headerAlign: 'center',headerClassName: 'colorae', width: 150 },
        { field: 'beneficier', headerName: 'Bénéficier',headerAlign: 'center',headerClassName: 'colorae', width: 148 },
        { field: 'qte', headerName: 'Quantité demandée',headerAlign: 'center', headerClassName: 'colorae',width: 202 },
        
      ]
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
          width: 140,
          headerAlign: 'center',
          headerClassName: 'colorae',
          disableClickEventBubbling: true,
          renderCell : (params)=>{
            return convertDate(params.row.dateexp)
          }
        },

       
        
      ]
      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
      }
      
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

      function Fournitureinf(){
        axios.post("http://localhost:3001/fournitureinf/",configuration )
            .then(res =>{
                console.log(res.data)
                setRows(res.data)
            });    
    }; 
    useEffect(()=>{
      Fournitureinf()
    },[])
  
      
    return (
       <div className="page">
          <Modal visible={model} width="662" height="450"  effect="fadeInUp"  className="detailmodel" onClickAway={() =>setmodel(false)}>
          
          <DataGrid
            getRowClassName={(params) =>`backddd`}
                  rows={facture}
                  columns={Facture}
                  pageSize={5}
                  disableSelectionOnClick/>
            
          </Modal>
         <Modal visible={showmdal} width="662" height="450"  effect="fadeInUp"  className="detailmodel" onClickAway={() =>closemodal()}>
          
          <DataGrid
            getRowClassName={(params) =>`backddd`}
                  rows={detailDemande}
                  columns={columnsDetailDemande}
                  pageSize={5}
                  disableSelectionOnClick/>
            
          </Modal>
          
            <div className="titre"  > <h2>Fourniture</h2></div>
                    
            <br/>
            <div style={{ height: 400, width: '356%' , marginLeft:'-350%', marginTop:'20%' }}>
              <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick/>
            </div>
            
       </div>
      


       
        
    )


}
