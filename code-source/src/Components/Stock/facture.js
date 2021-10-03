import { colors } from '@material-ui/core'
import React, {useEffect, useState} from 'react'
import logo from "../../Images/logo.png"
import axios from 'axios';



export default function ArticleEndommage(props) {





const [data, setData] = useState([])

const [codeArticle, setcodeArticle] = useState([])
const [nomArticle, setnomArticle] = useState([])
const [fournitureArticle, setfournitureArticle] = useState([])
const [somme, setsomme] = useState([])

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat)
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}
 
const configuration = {
  headers : {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"        
  }
}



    
    const [idarticle,setIdArticle] = useState(document.location.href.split('facture/')[1]);
    


useEffect(()=>{
  
  axios.post("http://localhost:3001/farticle/",{
    idarticle:idarticle
  },configuration )
  .then(res =>{
    console.log(res.data)
    setcodeArticle(res.data[0].codeArticle)
    setnomArticle(res.data[0].nom)
    setfournitureArticle(res.data[0].fourniture)
    setsomme(res.data[0].total)

  });    


  axios.post("http://localhost:3001/facturearticle/",{
    idarticle:idarticle
  },configuration )
  .then(res =>{
      console.log(res.data)
      setData(res.data)
      window.print()
      document.location.href="/inventaire/"
  });    
},[])




    return (
       <div className="page">

            <div style={{
                
                textAlign:"center",
        margin: '0.5em',
        paddingLeft: 0,
       
      }}> <img style={{
          width:'50%'
      }} src={logo} alt=""/> </div>
            <h2 style={{
              
                textAlign:"center",
        margin: '0.5em',
        marginTop:"100px",
        paddingLeft: 0,
        textDecoration:'underline'
       
      }}>Facture article</h2>
            <h5  style={{
                marginTop:'5%',
                marginRight:'20%',
                margin: '0.5em',
                textAlign:"center",
                paddingLeft: 0,
                marginTop:"50px",
       
      }}><span style={{
        marginRight:'20%',

textAlign:"center",
margin: '0.5em',
paddingLeft: 0,
textDecoration:'underline'

}}> Code article : </span> {codeArticle}</h5><br/>
            <h5  style={{
                             marginRight:'20%',

                textAlign:"center",
        margin: '0.5em',
        paddingLeft: 0,
       
      }}><span style={{
        marginRight:'20%',

textAlign:"center",
margin: '0.5em',
paddingLeft: 0,
textDecoration:'underline'

}}> Nom article : </span> {nomArticle}</h5> <br/>
            <h5  style={{
    marginRight:'20%',

                textAlign:"center",
        margin: '0.5em',
        paddingLeft: 0,
       
      }}><span style={{
        marginRight:'20%',

textAlign:"center",
margin: '0.5em',
paddingLeft: 0,
textDecoration:'underline'

}}> Fourniture : </span> {fournitureArticle} </h5><br/>
            <table style={{
         borderCollapse: 'collapse',
         marginLeft:"15%",
         width:'70%',
         marginBottom:'10%'
        

       
      }}>
    
    
    <tr style={{
         border: '1px solid black',
         height: '10%',}}>

       <td style={{
         border: '1px solid black',
         textAlign:"center",
         background:"#04acec",
         fontWeight:"bold"}}>Prix</td>

       <td style={{
         border: '1px solid black',
         textAlign:"center",
         background:"#04acec",
         fontWeight:"bold"}}>Fournisseur</td>

       <td style={{
         border: '1px solid black',
         textAlign:"center",
         height:"50px",
         background:"#04acec",
         fontWeight:"bold"}}>Quantite</td>

<td style={{
         border: '1px solid black',
         textAlign:"center",
         height:"50px",
         background:"#04acec",
         fontWeight:"bold"}}>Date d'ajout</td>

<td style={{
         border: '1px solid black',
         textAlign:"center",
         height:"50px",
         background:"#04acec",
         fontWeight:"bold"}}>Date de péremption</td>
   </tr>


   {data.map((ele,index)=>{
       return (<tr key={index} style={{
        border: '1px solid black',
        height: '10%',}}>

      <td style={{
        border: '1px solid black',
        textAlign:"center",
        height:"50px"}}> {ele.prix}</td>
      
      <td style={{
        border: '1px solid black',
        textAlign:"center",
        height:"50px"}}> {ele.fournisseur} </td>

       <td style={{
        border: '1px solid black',
        textAlign:"center",
        height:"50px"}}> {ele.quantite} </td>

         <td style={{
        border: '1px solid black',
        textAlign:"center",
        height:"50px"}}> {convertDate(ele.dateajout)} </td>

         <td style={{
        border: '1px solid black',
        textAlign:"center",
        height:"50px"}}> {convertDate(ele.dateexp)} </td>
  </tr>)
   })}

   

            </table>
            <h5  style={{
    marginRight:'20%',

                textAlign:"center",
        margin: '0.5em',
        paddingLeft: 0,
       
      }}><span style={{
        marginRight:'20%',

textAlign:"center",
margin: '0.5em',
paddingLeft: 0,
textDecoration:'underline'

}}> Somme article: </span> {somme} DH </h5><br/>
            <div className="ajouter">
             
            </div>
            <br/>
           
            
       </div>
      


       
        
    )


}
