import React, {useEffect, useState} from 'react'
import '../Style/ajouterdemande.css'
import {DataGrid} from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import Cookies from 'js-cookie';


export default function AjouterDemande() {
    const columns = [

       {
          field: 'codeArticle',
          headerName: 'Code Article',
          
          headerClassName: 'colorm',
          headerAlign: 'center',
          editable: true,
          width: 200,
        },
        {
            field: 'nom',
            headerName: 'Nom article',
            headerClassName: 'colorm',
            headerAlign: 'center',
            width: 200,
            editable: true,
          },
          {
            field: 'quantite',
            headerName: 'Quantité',
            headerClassName: 'colorm',
            headerAlign: 'center',
            width: 150,
            editable: true,
          },
          {
            field: 'fourniture',
            headerName: 'Fourniture',
            headerClassName: 'colorm',
            headerAlign: 'center',
            width: 200,
            editable: true,
          },
          
      ];

    const [showmdal, setshowmdal] = useState(false)
    const [username, setusername] = useState("")
    const [direction, setdirection] = useState("")
    const [qtestock, setqtestock] = useState("")
    const [codeArticle, setcodeArticle] = useState()
    const [nom, setnom] = useState("nom")
    const [article, setarticle] = useState([])
    const [quantite, setquantite] = useState()
    const [beneficier, setbeneficier] = useState([])
    const [fourniture, setfourniture] = useState([])
    const [typeValidation, settypeValidation] = useState()
    const [seuilleMin, setseuilleMin] = useState(0)
    const [fusername, setfusername] = useState([])
    const [stateForm, setstateForm] = useState(" displayNone")
    var [listDataInserted,setListDataInserted] = useState([])
    
    const [rows, setRows] = useState([])
    var d = new Date();
    var date = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
    
   
    function affichermodal(){
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

        
        function Premier(){
          setusername(Cookies.get('username'))
          setdirection(Cookies.get("direction"))
        }; 
       function ListArticle(){
            axios.post("http://localhost:3001/listarticle/",configuration )
                .then(res =>{
                    setarticle(res.data);
                    
                });    
        };
        function AutreArticle(){
          axios.get("http://localhost:3001/autrearticle/",configuration )
              .then(res =>{
                  
                  setfusername(res.data);
              });    
      };
      function Fourniture(){
        axios.get("http://localhost:3001/fourniture/",configuration )
            .then(res =>{
                
                setfourniture(res.data);
            });    
    };
    function Quantite(){
      axios.post("http://localhost:3001/quantite/",configuration )
          .then(res =>{
              console.log(res.data)
              setarticle(res.data);
          });    
  };
  function Beneficier(){
    axios.post("http://localhost:3001/beneficier/",configuration )
        .then(res =>{
            console.log(res.data)
            setbeneficier(res.data);
        });    
};

        useEffect(() => {
                AutreArticle()
                ListArticle()
                Premier()
                Fourniture()
                Quantite()
                Beneficier()
          },[])
        
    return (
       <div className="page">
         
            <div className="titre2"  > <h2>Ajouter une nouvelle demande</h2></div>
                <form className="form">
                   <div className="label">
                        <label className="Nom" ><strong>Nom :</strong> </label>
                        <input className="username" type="text" id="idCollaborateur" value={username} onChange={(e) => setusername(e.target.value)} disabled={true}/>

                        <label className="Direction"> <strong>Direction :</strong> </label>
                        <input className="direction" type="text" value={direction} onChange={(e) => setdirection(e.target.value)} disabled={true} />

                        <label className="Date"> <strong>Date :</strong> </label>
                        <input className="dateDemande" type="text" value={date} disabled={true} />

                  </div>
                  

                 


                </form>

                <div className="fieldset">
                <div className="titre1"  > <h2>Articles </h2></div>
                <div className="ajouter"><button className="baj" onClick={()=>{
                  affichermodal()
                  setstateForm(" displayFlex")
                }}>Ajouter articles</button></div>

<Modal visible={showmdal} width="800" height="500" effect="fadeInUp"  className="modal" onClickAway={() =>closemodal()}>

                <form className={"arti"+stateForm} onSubmit={(e)=>{e.preventDefault();
                      var beneficier =document.getElementById("idbeneficier");
                      var codeArticle=document.getElementById("IdArticle");
                      var nomArticle=document.getElementById("IdArticle").options[document.getElementById("IdArticle").selectedIndex].text;
                      var qte=document.getElementById("idQte");
                      var fourniture=document.getElementById("idfourniture");
                      var seuilMax = document.getElementById('idSeuilMin');
                      var collaborateur = document.getElementById('idCollaborateur');
                      var qtestock = document.getElementById('idQtestock');
                      
                      if(parseInt(seuilMax.value)<parseInt(qte.value)){
                        alert("la quantité doit etre inférieur au seuille maximum : "+seuilMax.value);
                      }
                      else {
                          if(parseInt(qtestock.value)<parseInt(qte.value)){ 
                            alert("La quantité demandé doit etre inférieur a la quantié du stock \n Quantité stocks : "+qtestock.value);
                          }

                      else{
                              if(
                                codeArticle.value ==="Nom Article" ||
                                fourniture.value=== "Fourniture" ||
                                nomArticle === "Nom Article" ||
                                qte.value === "0" ||
                                beneficier.value === "Beneficier"
                              ){
                                alert("Remplire tous les champs")
                              

                              }
                              else{
                                setListDataInserted([...listDataInserted,{
                                  id:listDataInserted.length+1,
                                  
                                  codeArticle:codeArticle.value,
                                  fourniture:fourniture.value,
                                  quantite:qte.value,
                                  nom:nomArticle,
                                  collaborateur:collaborateur.value,
                                  beneficier:beneficier.value
                            
                                }])
        
                              
                                codeArticle.selectedIndex=0
                                qte.value=0
                                fourniture.selectedIndex=0
                                seuilMax.value=0
                                beneficier.selectedIndex=0
                              }
                        }}
                        
                      }}>
                
                              <div className="modl">
                              <label className="beneficier"> <strong>Bénéficier :</strong> </label>
                                  <select className="selectf" name="beneficier" id="idbeneficier"  onChange={(e)=>{
                                  axios.post("http://localhost:3001/beneficier/",{
                                    configuration:configuration,
                                    keyword:e.target.value
                                  })
                                  .then(res =>{
                                      setbeneficier(res.data);
                                      
                                     
                                  });  
                                }} >
                                          <option  selected hidden disabled >Beneficier</option>
                                          {beneficier.map((ar,index)=>{
                                          return(
                                                  <option key={index} value={ar.username}> {ar.username}</option>
                                          );
                                          })}
                                </select><br/>



                                  <label className="TypeDeFourniture"> <strong>Type de fourniture :</strong> </label>
                                  <select className="selectf" name="fourniture" id="idfourniture"  onChange={(e)=>{
                                  axios.post("http://localhost:3001/listarticle/",{
                                    configuration:configuration,
                                    keyword:e.target.value
                                  })
                                  .then(res =>{
                                      setarticle(res.data);
                                      setseuilleMin(0)
                                      settypeValidation(0)
                                      
                                      document.getElementById("IdArticle").selectedIndex=0
                                  });  
                                }} >
                                          <option  selected hidden disabled >Fourniture</option>
                                          {fourniture.map((ar,index)=>{
                                          return(
                                                  <option key={index} value={ar.nomFourniture}> {ar.nomFourniture}</option>
                                          );
                                          })}
                                </select><br/>

                                  <label className="NomDArticle"> <strong>Nom d'article :</strong> </label>
                                  <select className="selectn" name="code article" id="IdArticle" onChange={(e)=>{
                                  axios.post("http://localhost:3001/quantite/",{
                                    configuration:configuration,
                                    keyword:e.target.value
                                  })
                                  .then(res =>{
                                    console.log(res.data)
                                    setseuilleMin(res.data[0].seuilleMin);
                                    setqtestock(res.data[0].quantite)
                                    settypeValidation(res.data[0].typeValidation);
                                  });  
                                }}   >
                                          <option  selected hidden disabled >Nom article</option>
                                          {article.map((ar,index)=>{
                                          return(
                                                  <option key={index} value={ar.codeArticle}> {ar.nom}</option>
                                          );
                                          })}
                                </select><br/>
                                  <label className="Quantité"> <strong>Quantité max :</strong> </label>
                                  <input className="inputqm" name="seuilleMin" id="idSeuilMin" type="text" value={seuilleMin} disabled={true}/><br/>
                                  
                                 

                                  <label className="Quantitém"> <strong>Quantité :</strong> </label>
                                  <input className="inputq quantitev" name="nom" type="number" id="idQte" /><br/>

                                  <input className="inputv" name="l" id="idQtestock" type="text" hidden value={qtestock} disabled={true}/><br/>
                              </div>
                              
                                  <div className="ajoute"><button className="buttaj" onClick={()=>{
                                     
                                  }}>Ajouter </button></div>
                            </form><div className="annuler"><button className="buttan" onClick={()=>{
                                      closemodal()
                                      setstateForm("displayNone")
                                    }}>Annuler</button></div>

                      </Modal>
                        





                      <div style={{ height: 300, width: '75.5%', marginLeft: '10%', marginTop: '0%' }}>
                            <DataGrid
                            getRowClassName={(params) =>`backddd`}
                                rows={listDataInserted}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick/>
                        </div>  
                        <div className="valider">
                        <button className="ajouterdem" onClick={()=>{
                          axios.post("http://localhost:3001/creedemande",{
                            list:listDataInserted
                          }).then(resp=>{
                            console.log(resp.data)
                            setusername(resp.data[0].username)

                          })
                        }}><a href="./mesDemandes">Envoyer demande</a></button>
                        
                        </div>
                        
                        
                  </div>
                  
            </div>
            


       
    
    )


}
