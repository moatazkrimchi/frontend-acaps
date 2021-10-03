import React, {useEffect, useState} from 'react'
import '../../Style/stock/gestionfourniture.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';



export default function GestionFourniture() {

    
    const [rows, setRows] = useState([])
    const [showmdal, setshowmdal] = useState(false)
    const [fourniture, setfourniture] = useState([])
    const [stateForm,setstateForm] = useState(false)
    const [modelconf, setmodelconf] = useState(false)
    const [idfourniture, setidfourniture] = useState(false)
    const [modeledit, setmodeledit] = useState(false)
    const [nomFourniture, setnomFourniture] = useState("")

    const columns = [
       
        {
          field: 'nomFourniture',
          headerName: 'Fourniture',
          headerAlign: 'center',
          headerClassName: 'colorae',
          width: 500,
          editable: true,
        },
        {
          field: "action",
          headerName: " Actions",
          headerAlign: 'center',
          headerClassName: 'colorae',
          sortable: false,
          width: 505,
          disableClickEventBubbling: true,
          renderCell: (params) => {
            
            return (
                  <div className="ValidationBox" style={{ cursor: "pointer" }}>
                   
                     <EditIcon className="buttva" onClick={(e)=>{
                              setidfourniture(params.id)
                              axios.post("http://localhost:3001/nomfourniture/",
                                {idfourniture:params.id})
                                  .then(res =>{
                                      setnomFourniture(res.data[0].nomFourniture)
                                      
                                  });    
                          setmodeledit(true)
                          setstateForm("displayFlex")
                      }} />
                    <DeleteIcon className="buttre"  onClick={()=>{
                              setidfourniture(params.id)
                              setmodelconf(true)
                              setstateForm("displayFlex")
                          }} />
                   
                  </div>
              );
           }
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

      function Fourniture(){
        axios.get("http://localhost:3001/fourniture/",configuration )
            .then(res =>{
                console.log(res.data)
                setfourniture(res.data);
            });    
    };
   
    useEffect(() => {
  
      Fourniture()
      
      
  },[])
  
      
    return (
       <div className="page">
         <Modal visible={showmdal} width="500" height="250" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
         <form className={"arti"+stateForm} onSubmit={(e)=>{e.preventDefault();
                     
                      var fourniture=document.getElementById("idfourniture");
                  
                     

                    
                        if(
                               
                                fourniture === "" 
                              ){
                                alert("Remplire le champs")
                              

                              }
                              else{
                               
                           axios.post("http://localhost:3001/ajouterfourniture/",{ 
                            nomFourniture:nomFourniture})
                        
                                    .then(res =>{
                                        console.log(res.data)
                                        axios.get("http://localhost:3001/fourniture/")
                        
                                        .then(res =>{
                                            console.log(res.data)
                                            setfourniture(res.data)
                                        });
                                            closemodal()
                                            setstateForm("displayNone")
                              })
                         
        
                              
                                
                                fourniture.value=""
                                
                                
                              }
                        }
                        
                      }>

         <div className="divarticle">
                     <label className="lab">Nom fourniture :</label>
                      <input className="input2" name="nom" type="text" id="idfourniture"  onChange={(e) => {setnomFourniture(e.target.value)}} /><br/>

                      <div className="annuler">
                      <button className="butt" onClick={()=>{
                                       
                                        closemodal()
                                        setstateForm("displayNone")
                                      }}
                        >Ajouter</button></div>
                              <div className="annuler"><button className="butta" onClick={()=>{
                                        closemodal()
                                        setstateForm("displayNone")
                                      }}>Annuler</button></div>
        </div>
        </form>

         </Modal>
         <Modal visible={modelconf} width="800" height="300" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
            <div className="iconclose">
            <CloseIcon onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}/>
            </div>


            <h1 className="title">Vous voulez supprimer cette fourniture ?</h1>
            <div className="butanuller">
            <button onClick={()=>{
                              setmodelconf(false)
                              setstateForm("displayNone")
                                    }}> Annuler </button></div>
                                    <div className="butval">
            <button onClick={()=>{
            axios.post("http://localhost:3001/deletefourniture/",{
              configuration:configuration,
              idfourniture:idfourniture
            })
            .then(res =>{
              console.log(res.data)
              
              
            });
            axios.get("http://localhost:3001/fourniture/")
          
            .then(res =>{
                console.log(res.data)
                setfourniture(res.data);
            });
            setmodelconf(false)
            setstateForm("displayNone")
            }}>Valider</button></div>
          </Modal>




          <Modal visible={modeledit} width="800" height="300" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>
            <div className="iconclose">
            <CloseIcon onClick={()=>{
                              setmodeledit(false)
                              setstateForm("displayNone")
                                    }}/>
            </div>


            <label className="code">Fourniture :</label>
            <input className="input" name="nomFourniture" id="idfour" type="text" value={nomFourniture}  onChange={(e) => {setnomFourniture(e.target.value)}} /><br/>


            <div className="butanuller">
            <button onClick={()=>{
                              setmodeledit(false)
                              setstateForm("displayNone")
                                    }}> Annuler </button></div>
                                    <div className="butval">
            <button onClick={()=>{
              console.log(idfourniture)
              axios.post("http://localhost:3001/editfourniture/",{
                configuration:configuration,
                idfourniture:idfourniture,
                nomFourniture:nomFourniture
              })
              .then(res =>{
                console.log(res.data)
                
                
              });




            axios.get("http://localhost:3001/fourniture/")
          
            .then(res =>{
                console.log(res.data)
                setfourniture(res.data);
            });
            setmodeledit(false)
            setstateForm("displayNone")
            }}>Valider</button></div>
          </Modal>




          
            <div className="titre9"  > <h2>Type de fourniture</h2></div>
            <div className="ajouter">
              <button className="button" onClick={()=>{
                  affichermodal()
                  setstateForm(" displayFlex")
                }}>
               Ajouter fourniture
              </button>
              </div>
            <br/>
            <div style={{ height: 400, width: '71%' , marginLeft:'10.8%'}}>
              <DataGrid
                  rows={fourniture}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick/>
            </div>
            
       </div>
      


       
        
    )


}
