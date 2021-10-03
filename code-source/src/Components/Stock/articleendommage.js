import React, { useEffect, useState } from 'react'
import '../../Style/stock/articleendommage.css'
import { DataGrid } from "@material-ui/data-grid";
import axios from 'axios';
import Modal from 'react-awesome-modal';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';


export default function ArticleEndommage() {


  const [rows, setRows] = useState([])
  const [showmdal, setshowmdal] = useState(false)
  const [modelconf, setmodelconf] = useState(false)
  const [stateForm, setstateForm] = useState(" displayNone")
  const [fourniture, setfourniture] = useState([])
  var [listDataInserted, setListDataInserted] = useState([])
  const [idArticle, setidArticle] = useState(false)
  const [files, setFiles] = useState({
    photo: "",
    doc: ""
  })
  const [photo, setphoto] = useState(false)
  const [fichier, setfichier] = useState(false)





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
      field: 'quantitestock',
      headerName: 'Quantite Stock',
      headerAlign: 'center',
      headerClassName: 'colorae',
      width: 170,
      editable: true,
    },

    {
      field: "seuilleMin",
      headerName: "Seuille Max",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 130,
      disableClickEventBubbling: true,
    },

    {
      field: "fourniture",
      headerName: "Fourniture",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
    },


    {
      field: "endommage",
      headerName: "Endommagé",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
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
      field: "photo",
      headerName: "Photo",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 170,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        return (
          <div className="ValidationBox" style={{ cursor: "pointer" }}>

            <GetAppIcon className="buttre" onClick={() => {

              document.location.href = "http://localhost:3001/assets/" + params.row.photo
            }} />

          </div>
        );
      }
    },
    {
      field: "fichier",
      headerName: "Procés-verbal",
      headerAlign: 'center',
      headerClassName: 'colorae',
      sortable: false,
      width: 170,
      disableClickEventBubbling: true,
      renderCell: (params) => {

        return (
          <div className="ValidationBox" style={{ cursor: "pointer" }}>

            <GetAppIcon className="buttre" onClick={() => {
              document.location.href = "http://localhost:3001/assets/" + params.row.fichier
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
    axios.get("http://localhost:3001/articleendommage/", configuration)
      .then(res => {
        setRows(res.data)

      });
  }, [])

  const submitFiles = (e, id) => {
    e.preventDefault()
    if (files.length === 0) {
      alert("Il faut selectioner des fichier")
    } else {
      const formData = new FormData();
      formData.append(files.photo.name, files.photo.data)
      formData.append(files.doc.name, files.doc.data)
      formData.append("id", id)
      axios.post("http://localhost:3001/upload", formData, {
        headers: {
          'Content-Type': "multipart/form-data"
        }
      })
        .then(resp => {
          if (resp.data.err === false) {
            alert("Bien enregistré")
          } else {
            alert("Un probleme y arrivé, merci de réessayer ultérieurement")
          }
        })
    }
  }
  return (
    <div className="page">

      <Modal visible={showmdal} width="1300" height="380" effect="fadeInUp" className="pad" onClickAway={() => closemodal()}>
        <form className={"padi" + stateForm} onSubmit={(e) => {
          e.preventDefault();

          var codeArticle = document.getElementById("IdArticle");
          var qteEndommage = document.getElementById("idqteEndommage");
          if (
            codeArticle.value === "" ||
            qteEndommage.value === ""
          ) {
            alert("Remplire tous les champs")
          }
          else {
            axios.post("http://localhost:3001/ajouterEndommage", {
              codeArticle: codeArticle.value,
              qteEndommage: qteEndommage.value,
              doc: files.doc.name,
              photo: files.photo.name,
            }).then(resp => {
              submitFiles(e, resp.data.id)
              axios.get("http://localhost:3001/articleendommage")
                .then(res => {
                  setRows(res.data)
                });
              closemodal()
              setstateForm("displayNone")
            })
            codeArticle.value = ""
            qteEndommage.value = ""
          }
        }

        }>
          <div className="divarticle">
            <label className="code">Code article :</label>
            <input className="inputq quantitev" name="nom" type="text" id="IdArticle" />

            <label className="code">quantite endommage:</label>
            <input className="inputq quantitev" name="nom" type="text" id="idqteEndommage" />


            <label className="code">Photo :</label>
            <input onChange={async () => {
              var file = document.getElementById("idInputPhoto").files
              if (file.length != 0) {
                setFiles({
                  photo: {
                    name: "photo",
                    size: file[0].size,
                    data: file[0]
                  },
                  doc: files.doc
                })
              }
            }} accept="application/image" id="idInputPhoto" type="file" multiple={false} />
            <label className="code">Proces-verbal :</label>
            <input accept="application/pdf" onChange={async () => {
              var file = document.getElementById("idInputDoc").files
              if (file.length != 0) {
                setFiles({
                  doc: {
                    name: "doc",
                    size: file[0].size,
                    data: file[0]
                  },
                  photo: files.photo
                })
              }
            }} id="idInputDoc" type="file" multiple={false} />

          </div>
          <button className="buttaj"
          >Ajouter</button>
          <div className="annuler"><button className="buttan" onClick={() => {
            closemodal()
            setstateForm("displayNone")
          }}>Annuler</button></div>
        </form>





      </Modal>

      <Modal visible={modelconf} width="800" height="300" effect="fadeInUp" className="modal" onClickAway={() => closemodal()}>
        <div className="iconclose">
          <CloseIcon onClick={() => {
            setmodelconf(false)
            setstateForm("displayNone")
          }} />
        </div>


        <h1 className="title">Vous voulez supprimer cette fourniture ?</h1>
        <div className="butanuller">
          <button onClick={() => {
            setmodelconf(false)
            setstateForm("displayNone")
          }}> Annuler </button></div>
        <div className="butval">
          <button onClick={() => {
            axios.post("http://localhost:3001/deleteendommage/", {
              configuration: configuration,
              idArticle: idArticle
            })
              .then(res => {
                console.log(res.data)


              });
            axios.post("http://localhost:3001/articleendommage/", configuration)
              .then(res => {
                console.log(res.data)
                setRows(res.data)
              });
            setmodelconf(false)
            setstateForm("displayNone")
          }}>Valider</button></div>
      </Modal>




      <div className="titreea"  > <h2>Article Endommagé</h2></div>
      <div className="ajouter">
        <button className="buttonn"
          onClick={() => {
            affichermodal()
            setstateForm(" displayFlex")
          }}>

          Ajouter Article Endommagé
        </button>
      </div>
      <br />
      <div style={{ height: 400, width: '423%', marginLeft: '-380%', marginTop: '3%' }}>
        <DataGrid
          getRowClassName={(params) => `backddd`}
          rows={rows}
          columns={columns}
          pageSize={5}
          disableSelectionOnClick />
      </div>

    </div>





  )


}
