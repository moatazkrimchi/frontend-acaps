import React, { useEffect, useState } from 'react'
import '../../Style/stock/gestionarticle.css'
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';



export default function GestionArticle() {


  const [rows, setRows] = useState([])
  const [showmdal, setshowmdal] = useState(false)
  const [stateForm, setstateForm] = useState(" displayNone")
  const [article, setarticle] = useState([])
  const [fourniture, setfourniture] = useState([])
  const [typevalidation, settypevalidation] = useState([])
  var [listDataInserted, setListDataInserted] = useState([])
  const [deletearticle, setdeletearticle] = useState([])
  const [modelconf, setmodelconf] = useState(false)
  const [modelajout, setmodelajout] = useState(false)
  const [idarticle, setidarticle] = useState(0)
  const [modelEditing, setModelEditing] = useState(false)
  const [selectedForEditing, setSelectedForEditing] = useState("")

  function Fourniture() {
    axios.get("http://localhost:3001/fourniture/", configuration)
      .then(res => {

        setfourniture(res.data);
      });
  };
  function Typevalidation() {
    axios.get("http://localhost:3001/typevalidation/", configuration)
      .then(res => {

        settypevalidation(res.data);
      });
  };




  const columns = [

    {
      field: 'codeArticle', headerName: 'Code Article', headerAlign: 'center',
      headerClassName: 'colorae', width: 155
    },
    {
      field: 'nom',
      headerName: 'Nom Article',
      headerAlign: 'center',
      headerClassName: 'colorae',

      width: 155,
      editable: true,
    },
    {
      field: 'quantite',
      headerName: 'Quantite Stock',
      headerAlign: 'center',
      headerClassName: 'colorae',
      width: 170,
      type: 'number',
      editable: true,
    },


    {
      field: "seuilleMin",
      headerName: "Seuil Max",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
      editable: true,
    },
    {
      field: "fourniture",
      headerName: "Fourniture",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      editable: true,
    },
    {
      field: "seuilleAlerte",
      headerName: "Seuil d'alerte",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      editable: true,
    },

    {
      field: "endommage",
      headerName: "Endommagé",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      editable: true,
      renderCell: (params) => {
        if (params.row.endommage === 0) {
          return "non"
        }
        else {
          return "oui"
        }
      }
    },
    {
      field: "actions",
      headerName: "Editer / Supprimer",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 170,
      disableClickEventBubbling: true,
      editable: true,
      renderCell: (params) => {

        return (
          <div className="ValidationBox" style={{ cursor: "pointer" }}>
            <EditIcon className="buttva" onClick={(e) => {
              setModelEditing(true)
              setSelectedForEditing(params.row)
              console.log(params.row);
            }} />
            <DeleteIcon className="buttre" onClick={() => {


              setidarticle(params.id)
              setmodelconf(true)
              setstateForm("displayFlex")
            }} />
            <AddIcon className="buttva" onClick={(e) => {
              axios.post("http://localhost:3001/facturearticle", { idarticle: params.id }).then((rsp => {
                setarticle(params.id);

              }))
              setidarticle(params.id)
              setmodelajout(true)
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
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
  }
  useEffect(() => {
    axios.get("http://localhost:3001/article/")

      .then(res => {
        console.log(res.data)
        setRows(res.data)
      });
  }, [])

  useEffect(() => {


    Fourniture()
    Typevalidation()

  }, [])


  return (
    <div className="page">
      <Modal visible={showmdal} width="1300" height="380" effect="fadeInUp" className="pad" onClickAway={() => closemodal()}>
        <form className={"padi" + stateForm} onSubmit={(e) => {
          e.preventDefault();
          var codeArticle = document.getElementById("IdArticle");
          var nomArticle = document.getElementById("Idnom");
          var fourniture = document.getElementById("idfourniture");
          var seuilMax = document.getElementById('idSeuilMin');
          var seuillealerte = document.getElementById('idseuillealerte');

          if (
            codeArticle.value === "" ||
            fourniture.value === "" ||
            nomArticle === "Nom Article" ||

            seuilMax === "" ||

            seuillealerte === ""

          ) {
            alert("Remplire tous les champs")


          }
          else {
            axios.post("http://localhost:3001/ajouterarticle", {
              id: listDataInserted.length + 1,

              codeArticle: codeArticle.value,
              nom: nomArticle.value,
              seuilleMin: seuilMax.value,
              seuilleAlerte: seuillealerte.value,

              fourniture: fourniture.value,
            }).then(resp => {

              console.log(resp.data)
              axios.get("http://localhost:3001/article/")

                .then(res => {
                  console.log(res.data)
                  setRows(res.data)
                });
              closemodal()
              setstateForm("displayNone")
            })




            codeArticle.value = ""
            nomArticle.value = ""
            seuilMax.value = 0
            seuillealerte.value = 0
            fourniture.selectedIndex = 0


          }
        }

        }>
          <div className="divarticle">
            <label className="code">Code article :</label>
            <input className="inputq quantitev" name="nom" type="text" id="IdArticle" />

            <label className="code">Nom article :</label>
            <input className="inputq quantitev" name="nom" type="text" id="Idnom" />



            <label className="code">Seuille max:</label>
            <input className="inputq quantitev" name="nom" type="number" id="idSeuilMin" />

            <label className="code">Seuille d'alerte :</label>
            <input className="inputq quantitev" name="nom" type="number" id="idseuillealerte" />



            <label className="code">Fourniture :</label>
            <select className="selectf" name="fourniture" id="idfourniture">
              <option selected hidden disabled >Fourniture</option>
              {fourniture.map((ar, index) => {
                return (

                  <option key={index} value={ar.nomFourniture}> {ar.nomFourniture}</option>
                );
              })}
            </select>




          </div>
          <button className="buttaj"
          >Ajouter</button>
          <div className="annuler"><button className="buttan" onClick={() => {
            closemodal()
            setstateForm("displayNone")
          }}>Annuler</button></div>
        </form>





      </Modal>
      <div className="titrea"  > <h2>Gestion Article</h2></div>
      <div className="ajouter">
        <button className="button" onClick={() => {
          affichermodal()
          setstateForm(" displayFlex")
        }}>
          Ajouter Article
        </button>
      </div>
      <br />

      <Modal visible={modelEditing} width="1300" height="420" effect="fadeInUp" className="pad" onClickAway={() => closemodal()}>
        <form className={"padi displayFlex"} onSubmit={(e) => {
          e.preventDefault();
          var nomArticle = document.getElementById("IdnomEditing");
          var fourniture = document.getElementById("idfournitureEditing");
          var seuilMax = document.getElementById('idSeuilMinEditing');
          var seuillealerte = document.getElementById('idseuillealerteEditing');
          var EndommageEditing = document.getElementById('idEndommageEditing');
          var tmp = {};
          if (nomArticle.value.length != 0) {
            tmp = {
              ...tmp,
              nom: nomArticle.value
            };
          }
          if (fourniture.value.length != 0) {
            tmp = {
              ...tmp,
              fourniture: fourniture.value
            };
          }
          if (seuillealerte.value.length != 0) {
            tmp = {
              ...tmp,
              seuilleAlerte: seuillealerte.value
            }
          }
          if (seuilMax.value.length != 0) {
            tmp = {
              ...tmp,
              seuilleMin: seuilMax.value
            };
          }
          if (EndommageEditing.value.length != 0) {
            tmp = {
              ...tmp,
              endommage: EndommageEditing.value
            }
          }

          axios.post("http://localhost:3001/articleEditing/", {
            "codeArticle": selectedForEditing.codeArticle,
            "data": tmp
          })
            .then(res => {
              setModelEditing(false)
              axios.get("http://localhost:3001/article/")

                .then(res => {
                  console.log(res.data)
                  setRows(res.data)
                });
            });

        }} >
          <div className="divarticle">
            <label className="code">Code article :</label>
            <input className="inputq quantitev" disabled onChange={(e) => { }} placeholder={selectedForEditing.codeArticle} name="nom" type="text" id="IdArticleEditing" />

            <label className="code">Nom article :</label>
            <input className="inputq quantitev" onChange={(e) => { }} placeholder={selectedForEditing.nom} name="nom" type="text" id="IdnomEditing" />



            <label className="code">Seuille max:</label>
            <input className="inputq quantitev" onChange={(e) => { }} placeholder={selectedForEditing.seuilleMin} name="nom" type="number" id="idSeuilMinEditing" />

            <label className="code">Seuille d'alerte :</label>
            <input className="inputq quantitev" onChange={(e) => { }} placeholder={selectedForEditing.seuilleAlerte} name="nom" type="number" id="idseuillealerteEditing" />



            <label className="code">Fourniture :</label>
            <select className="selectf" name="fourniture" id="idfournitureEditing">
              <option selected hidden disabled value={selectedForEditing.fourniture} >{selectedForEditing.fourniture}</option>
              {fourniture.map((ar, index) => {
                return (
                  <option key={index} value={ar.nomFourniture}> {ar.nomFourniture}</option>
                );
              })}
            </select>

            <label className="code">Endommage :</label>
            <select className="selectf" name="fourniture" id="idEndommageEditing">
              <option selected hidden disabled value={selectedForEditing.endommage} >{selectedForEditing.endommage == 1 ? "oui" : "non"}</option>
              <option value="1">oui</option>
              <option value="0">non</option>
            </select>




          </div>
          <div className="">
          <button className="buttaj"
          >Ajouter</button></div>
          <div className="butanuller" onClick={() => {
            setModelEditing(false)
          }}><button className="ann">Annuler</button></div>
        </form>
      </Modal>

      <Modal visible={modelconf} width="800" height="300" effect="fadeInUp" className="modal" onClickAway={() => closemodal()}>
        <div className="iconclose">
          <CloseIcon onClick={() => {
            setmodelconf(false)
            setstateForm("displayNone")
          }} />
        </div>


        <h1 className="title">Vous voulez supprimer ce article ?</h1>
        <div className="butanuller">
          <button onClick={() => {
            setmodelconf(false)
            setstateForm("displayNone")
          }}> Annuler </button></div>
        <div className="butval">
          <button onClick={() => {
            axios.post("http://localhost:3001/deletearticle/", {
              configuration: configuration,
              idArticle: idarticle
            })
              .then(res => {
                console.log(res.data)

              });
            axios.get("http://localhost:3001/article/")

              .then(res => {
                console.log(res.data)
                setRows(res.data)
              });
            setmodelconf(false)
            setstateForm("displayNone")
          }}>Valider</button></div>
      </Modal>

      <Modal visible={modelajout} width="900" height="600" effect="fadeInUp" className="modal" onClickAway={() => closemodal()}>
        <form className={"padi" + stateForm} onSubmit={(e) => {
          e.preventDefault();

          var quantite = document.getElementById("idquantite");
          var fournisseur = document.getElementById('idfour');
          console.log(fournisseur.value)
          var prix = document.getElementById('idprix');
          var dateexp = document.getElementById('iddate');





          axios.post("http://localhost:3001/ajoutquantite", {
            id: listDataInserted.length + 1,
            idArticle: idarticle,
            quantite: quantite.value,
            prix: prix.value,
            fournisseur: fournisseur.value,
            dateexp: dateexp.value
          }).then(resp => {



            closemodal()
            setstateForm("displayNone")
          })


          axios.get("http://localhost:3001/article/")

            .then(res => {
              console.log(res.data)
              setRows(res.data)
            });




          quantite.value = 0
          prix.value = 0
          fournisseur.value = ""
          dateexp.value = ""

        }


        }>
          <div className="iconclose">
            <CloseIcon onClick={() => {
              setmodelajout(false)
              setstateForm("displayNone")
            }} />
          </div>


          <h1 className="title">Vous voulez ajouter la quantité de ce article ?</h1>


          <label className="code"> quantite :</label>
          <input className="inq" name="nom" type="text" id="idquantite" />

          <label className="code"> prix :</label>
          <input className="inq" name="nom" type="text" id="idprix" />

          <label className="code"> fournisseur :</label>
          <input className="inq" name="nom" type="text" id="idfour" />

          <label className="code"> Dates de péremption :</label>
          <input className="inq" placeholder="Entre la forme <2021-08-22>" name="nom" type="text" id="iddate" />

          <div className="butanuller">
            <button className="anu" onClick={() => {
              setmodelajout(false)
              setstateForm("displayNone")
            }}> Annuler </button></div>
          <div className="butval">
            <button onClick={() => {

              axios.get("http://localhost:3001/article/")

                .then(res => {
                  console.log(res.data)
                  setRows(res.data)
                });
              setmodelajout(false)
              setstateForm("displayNone")
            }}>Valider</button></div>
        </form>
      </Modal>

      <div style={{ height: 400, width: '84.3%', marginLeft: '3%' }}>
        <DataGrid
          onEditCellChange={(e) => {
            console.log(e);
          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick />
      </div>

    </div>





  )


}
