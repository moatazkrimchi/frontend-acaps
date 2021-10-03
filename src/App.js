import './App.css';
import React from 'react'
import Navbar from './Components/navbar'
import Nav from './Components/Stock/navbar2'
import Sidbar from './Components/sidbar'
import MesDemandes from './Components/mesDemandes';
import Demandeencours from './Components/demandeencours'
import Demandetraite from './Components/demandetraite'
import Validerdemande from './Components/validerdemande'
import Historiquedemande from './Components/historiquedemande'
import {BrowserRouter as Router,Switch ,Route} from 'react-router-dom'
import Auth from "./Components/auth"
import AjouterDemande from './Components/ajouterDemande';
import Sidbar2 from './Components/Stock/sidbar2'
import Inventaire from './Components/Stock/inventaire';
import FournitureInformatique from './Components/Stock/fournitureinformatique';
import FournitureBureautique from './Components/Stock/fourniturebureautique';
import Generation from './Components/Stock/generation';
import GestionArticle from './Components/Stock/gestionarticle';
import GestionFourniture from './Components/Stock/gestionfourniture';
import ArticleEndommage from './Components/Stock/articleendommage';
import Facture from './Components/Stock/facture';

function App() {
  return (
     <Router>
          <Switch>
          <Route exact path="/">
                  <Auth/>
                </Route>
                <Route exact path="/auth">
                  <Auth/>
                </Route>
               
                <Route exact path="/mesDemandes">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <MesDemandes/>
                  </div>
                </Route> 
                <Route path="/ajouterDemande">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <AjouterDemande/>
                  </div>
                </Route> 
                <Route path="/demandeencours">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <Demandeencours/>
                  </div>
                </Route> 
                <Route path="/demandetraite">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <Demandetraite/>
                  </div>
                </Route> 
                <Route path="/validerdemande">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <Validerdemande/>
                  </div>
                </Route> 
                <Route path="/historiquedemande">
                  <Navbar/>
                  <div className="content">
                    <Sidbar/>
                    <Historiquedemande/>
                  </div>
                </Route>
           
                {/* Gestion stocks */}
                
                
                <Route path="/inventaire">
                  <Nav/>
                  <div className="content">
                    <Sidbar2/>
                    <Inventaire/>
                  </div>
                </Route> 
                <Route path="/fournitureinformatique">
                  <Nav/>
                  <div className="content">
                    <Sidbar2/>
                    <FournitureInformatique/>
                  </div>
                </Route> 
                 
               
                <Route path="/gestionarticle">
                  <Nav/>
                  <div className="content">
                    <Sidbar2/>
                    <GestionArticle/>
                  </div>
                </Route> 
                <Route path="/gestionfourniture">
                  <Nav/>
                  <div className="content">
                    <Sidbar2/>
                    <GestionFourniture/>
                  </div>
                </Route> 
                <Route path="/articleendommage">
                  <Nav/>
                  <div className="content">
                    <Sidbar2/>
                    <ArticleEndommage/>
                  </div>
                </Route> 
                <Route path="/facture/:idAticle">
                    
                    <Facture/>
                  
                </Route> 
                
          </Switch>
     </Router>
  );
}

export default App;
