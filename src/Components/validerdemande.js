import React, {useEffect, useState} from 'react'
import '../Style/validerdemande.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal'
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import emailjs from 'emailjs-com';

export default function MesDemandes() {

  emailjs.init("user_wKwpw24FSFTwe9pHAaH8p");

  const [showmdal, setshowmdal] = useState(false)
  const [stateForm, setstateForm] = useState(" displayNone")
  const [rows, setRows] = useState([])
  const [detailDemande,setDetailDemande] = useState([])
  const [modelconf, setmodelconf] = useState(false)
  const [modelref, setmodelref] = useState(false)
  const [idDemandeSelected, setIdDemandeSelected] = useState(0)
  const [observation, setobservation] = useState(0)
  const [idarticle, setidarticle] = useState(0)
  const [qte, setqte] = useState([])
  const [id, setid] = useState([])
  const [ref, setref] = useState(false)

  const [iddemandev, setiddemandev] = useState(0)
  const [collaborateur,setcollaborateur] = useState([])
  const [date,setdate] = useState([])
  const [item,setitem] = useState([])
  const [selecteditems,setSelecteditems] = useState([])

  var templateParams = {
    collaborateur: collaborateur,
    validation: 'Validé',
    dateDemande: convertDate(date),
    reply_to: '',
    from_name: 'ACAPS',

};
var templateParam = {
  collaborateur: collaborateur,
  validation: 'Refusé',
  dateDemande: convertDate(date),
  reply_to: '',
  from_name: 'ACAPS',

};

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}


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
    function Demandevalider(){
      axios.get("http://localhost:3001/demandevalider/",configuration )
          .then(res =>{
              setRows(res.data)
          });    
  }; 
  useEffect(()=>{
    Demandevalider()
  },[ref])




    const columns = [
        
        {
          field: 'collaborateur',
          headerName: 'Collaborateur',
          headerAlign: 'center',
          headerClassName: 'colorm',
          width: 180,
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
          field: "actions",
          headerName: "Validation",
          headerAlign: 'center',
          headerClassName: 'colorm',
          sortable: false,
          width: 510,
          disableClickEventBubbling: true,
          renderCell: (params) => {
            return (
                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                    {/* <PersonIcon /> */}
                    <button className="buttloopi" onClick={()=>{

                      
                      
                      


                      setIdDemandeSelected(params.id)

                      axios.post("http://localhost:3001/detaildemande",{idDemande:params.id}).then((rsp=>{
                      
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
        { field: 'codeArticle', headerName: 'Code Article',headerAlign: 'center',headerClassName: 'colorm', width: 160 },
        { field: 'nom', headerName: 'Nom article',headerAlign: 'center',headerClassName: 'colorm', width: 150 },
        { field: 'fourniture', headerName: 'Fourniture',headerAlign: 'center',headerClassName: 'colorm', width: 148 },
        { field: 'qte', headerName: 'Quantité demandée',headerAlign: 'center', headerClassName: 'colorm',width: 202 , editable: true},
        
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
                  checkboxSelection
                  onSelectionModelChange={(items) => 
                    {
                      setSelecteditems(items)
                    }
              }
                  onCellValueChange={(item)=>{
                    var idEle = item.id;
                    var attr = item.field;
                    var newValue= item.value;
                    console.log(idEle+" - "+attr +" - "+newValue)
                    setid(item.id)
                    setqte(item.value)
                    axios.post("http://localhost:3001/editqte/",{
                        configuration:configuration,
                        id:item.id,
                        qte:item.value,
                        
              })
              .then(res =>{


                
                
                
              }); 
                  }}
                  />
            <div className="annulervali">
            <button className="buttannulervali" onClick={()=>{
              
              setshowmdal(false)
              setstateForm("displayNone")
              

              
            }}> Annuler</button>
            </div>

            <div className="validerval">
            <button className="buttvaliderval" onClick={()=>{
              
              setmodelconf(true)
              setstateForm("displayFlex")
              

            }}>Valider</button></div>

            <div className="refuserref">
            <button className="buttrefuserref" onClick={()=>{
              setmodelref(true)
              setstateForm("displayFlex")



              
            }}>Refuser</button></div>


          </Modal>

          <Modal visible={modelconf} width="800" height="300" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
            <div className="iconclose">
            <CloseIcon onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}/>
            </div>


            <h1 className="title">Vous voulez valider cette demande ?</h1>
            <div className="butanuller">
            <button onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}> Annuler </button></div>
                                    <div className="butval">
            <button onClick={()=>{
             
           
             emailjs.send('service_4vwlxod', 'template_swfb8rj', templateParams)
             .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
             }, function(error) {
               console.log('FAILED...', error);
             });


            axios.post("http://localhost:3001/detaildemande",{idDemande:iddemandev}).then((rsp=>{
              
              axios.post("http://localhost:3001/validerdemande/",{
                configuration:configuration,
                idDemande:idDemandeSelected,
                listArticles:selecteditems,
                qte:qte
              })
              .then(res =>{
                console.log(res.data)
                
                
              }); 
              
              })) 
           
            
             
           
              
            setmodelconf(false)
            setstateForm("displayNone")
            setshowmdal(false)
            setstateForm("displayNone") 
            axios.get("http://localhost:3001/demandevalider/",configuration )
          .then(res =>{
              setRows(res.data)
            setref(!ref)
          });   
            
            }}>Valider</button></div>
          </Modal>
          <Modal visible={modelref} width="800" height="400" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
           



            <div className="iconclose">
            <CloseIcon onClick={()=>{
                              setmodelref(false)
                              setstateForm("displayNone")
                                    }}/>
            </div>


            <h1 className="title">Vous voulez refuser cette demande ?</h1>
            <h1 className="comm" id="idCommentaire">motif de refus  : </h1>
            <div className="comment">
            <textarea cols="50" rows="2" id="idmotif" onChange={(e)=>{
              setobservation(e.target.value)
            }}></textarea></div>
            <div className="butanuller">
            <button onClick={()=>{
                              setmodelref(false)
                              setstateForm("displayNone")
                                    }}> Annuler </button></div>
                                    <div className="butval">
                                    <button onClick={()=>{

                                  emailjs.send('service_4vwlxod', 'template_swfb8rj', templateParam)
                                  .then(function(response) {
                                    console.log('SUCCESS!', response.status, response.text);
                                  }, function(error) {
                                    console.log('FAILED...', error);
                                  });

                                       if(document.getElementById("idmotif").value.length === 0){
                                        alert("Remplire la motif de refus")
                                    } else{
                                      axios.post("http://localhost:3001/refuserdemande/",{
                                        configuration:configuration,
                                        idDemande:idDemandeSelected,
                                        observation:observation
                                      })
                                      .then(res =>{

                                        
                                      });
                                      Demandevalider()
                                      setmodelref(false)
                                      setstateForm("displayNone")
                                      setshowmdal(false)
                                      setstateForm("displayNone") 
                                    }
            
            }}>Refuser</button></div>
            
          </Modal>
         
          <div className="titrev"> <h2>Valider Demandes </h2></div>

       
       <br/>
       <div style={{ height: 600, width: '57.1%', marginLeft: '22.2%' , marginTop:'3%'}}>
              <DataGrid
              getRowClassName={(params) =>`backddd`}
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  
                  />
            </div>
      </div>
      


       
        
    )


}
