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
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-graph-up icon" viewBox="0 0 16 16" onClick={() => window.location = "#/backoffice"}>
                    <path fill-rule="evenodd" d="M0 0h1v15h15v1H0zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-gear icon" viewBox="0 0 16 16">
                    <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                    <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
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