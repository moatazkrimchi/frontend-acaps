import React, {useEffect, useState} from 'react'
import Axios from "axios"
import logoo from '../Images/logoo.png'
import '../Style/login.css'
import axios from 'axios'
import Cookies from "js-cookie"



function Login(props) {
	const [username, setusername] = useState("")
	const [password, setpassword] = useState("")
	const [rol, setrol] = useState("")



   
    return (
        <div className="page">
  
<div className="container" id="container">
	
	<div className="form-container sign-in-container">
		<form onSubmit={(e)=>{
			e.preventDefault()
			axios.post("http://localhost:3001/auth/login/",{username:username,password:password})
			.then(resp=>{
				if(resp.data.length==1){
					Cookies.set("role",resp.data[0].role)
					Axios.get("http://localhost:3001/ajouterdemande",{
						params: {
							iduser:resp.data[0].idUser,
							role:resp.data[0].role,
						  }
					}).then((e)=>{
						Cookies.set("username",e.data[0].username)
						Cookies.set("direction",e.data[0].direction)
						
					})
					console.log(resp.data[0].role)
					

					
					 if (resp.data[0].role==="RS"){

						document.location.href="http://localhost:3000/inventaire"

					}
					else {

						document.location.href="http://localhost:3000/mesdemandes"
						
					}
				}
			})
		}}>
			
			<h1>S'identifier</h1>
			
			<br/>
			<span> Utiliser votre compte</span>
			<input type="username" placeholder="Username" onChange={(e)=>{
					setusername(e.target.value)

		}}/>
			<input type="password" placeholder="Password" onChange={(e)=>{
					setpassword(e.target.value)

		}}/>
			<a className="aa" href="#">Mot de passe oublié?</a>
			<button className="buttons">connecter</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<img src={logoo}></img>
				<h1>ACAPS</h1>
				<p>Autorité de contrôle des assurances et de la prévoyance Sociale</p>
				
			</div>
		</div>
	</div>
</div>


</div>

      
    );
  }
   
 
   
  export default Login;