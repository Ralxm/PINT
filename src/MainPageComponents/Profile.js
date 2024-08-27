import React, { useEffect, useState } from 'react'
import '../Universal/index.css'
import { useNavigate } from 'react-router-dom';
import authService from '../views/auth-service'
import axios from 'axios'
import * as lang from '../Universal/lang.json';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Profile(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    let theme = localStorage.getItem("theme");
    if(theme){
        if(JSON.parse(theme) == "dark"){
            changeTheme(1);
        }
    }

    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";

    const navigate = useNavigate();
    function logoutHandler(){
        let user = authService.getCurrentUser();
        if(user){
            authService.logout();
            navigate('/');
        }
    }
        
    const [Utilizador, setUtilizador] = useState("")
    const [Cidade, setCidade] = useState("")

    useEffect(() => {
        
        loadPerfil();
    }, [])

    useEffect(() => {
        setCidade(Utilizador.cidade)
    }, [Utilizador])

    function loadPerfil(){
        let id = JSON.parse(localStorage.getItem("id"));
        let token;
        try{
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            token = userData.token;
        }
        catch{
            console.log("Erro a ir buscar o token");
        }
        let url = urlColaborador + 'get/' + id
        axios.get(url, {headers: { 'Authorization' : 'Bearer ' + token } })
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setUtilizador(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })
    }

    function changeTheme(props){
        let theme = localStorage.getItem("theme");
        if(!theme){
            let whatTheme = "dark";
            localStorage.setItem("theme", JSON.stringify(whatTheme));
            document.documentElement.classList.toggle("darkmode");
        }
        else{
            theme = JSON.parse(theme);
            if(theme == "dark"){
                if(props == 2){
                    localStorage.removeItem("theme")
                }
                document.documentElement.classList.toggle("darkmode");
            }
        }
    }

    return (
        <div className='container-fluid profile-box'>
            <div className='col-12 profile-info'>
                <div className='col-9 profile-info-text'>
                    <div>
                        <h3>{data.texto4main}</h3>
                        {Utilizador && <span>{Utilizador.NOME}</span>}
                        {Cidade && <p>{Cidade.NOME}</p> }
                    </div>
                </div>
                <div className='col-3 profile-info-image'>
                    <img src='./imageminicial.png' className='img-fluid profile-image'></img>
                </div>
            </div>
            <div className='col-12 profile-buttons'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-sun" viewBox="0 0 16 16" onClick={() => changeTheme(2)} style={{cursor: "pointer"}}>
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-graph-up icon" viewBox="0 0 16 16" onClick={() => window.location = "#/backoffice"}>
                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                </svg>
                <Popup trigger={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-right icon" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                </svg>} position="bottom right">
                    <a>Confirmar saída</a>
                    <button onClick={() => logoutHandler()} className='btn btn-outline-danger' style={{marginLeft: "10px"}}>Sim</button>
                </Popup>
                
            </div>
        </div>
    )
}