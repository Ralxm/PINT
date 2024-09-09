import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import * as lang from '../Universal/lang.json';
import authHeader from '../views/auth-header';

export default function Denuncia(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];
    let cidade = JSON.parse(localStorage.getItem("cidade"))

    const url = "https://pint-backend-8vxk.onrender.com/denuncia/listByCidade/";

    const [Denuncia, setDenuncia] = useState([]);

    const [IDDENUNCIA, setIDDENUNCIA] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Denuncias';
        loadTables();
    }, []);

    function loadTables(){
        axios.get(url + cidade, authHeader())
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setDenuncia(data);
            }
            else{
                alert("Erro Web Service!");
            }
        })
        .catch(error => {
            alert("Erro " + error);
        }); 
    }

    return(
        <div className='col-10' style={{display: 'flex'}}>
            <div className='side-bar col-4' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option'>
                    Listagem Denuncias
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
        </div>
    )

    function ListTables(){
        if(Denuncia.length == 0){
            return(
                <div className='col-12 showTable'>
                    <span>Sem denúncias para mostrar</span>           
                </div>
            )
        }
        return Denuncia.map((denuncia, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>{data.texto1denuncia}: {denuncia.IDDENUNCIA}</a>
                        <br></br>
                        <a>{data.texto2cargo}: {denuncia.colaborador.NOME}</a>
                        <br></br>
                        <a>{data.texto3cargo}: {denuncia.DATADENUNCIA}</a>
                        <br></br>
                        <a>{data.texto4cargo}: {denuncia.MOTIVO}</a>
                        <br></br>
                        <a>{data.texto5cargo}: {denuncia.comentario.TEXTO}</a>
                    </div>
                    <div className='showTableButtons'>
                        <button className='btn btn-danger' onClick={() => ApagarColuna(denuncia)}>Apagar</button>
                    </div>                
                </div>
            )
        })
    }

    function ApagarColuna(data){
        setIDDENUNCIA(data.IDDENUNCIA);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/denuncia/delete/' + data.IDDENUNCIA;
        axios.put(urlApagar, authHeader())
        .then(res =>{
            if(res.data.success){
                alert('Audit log com ID: ' + {IDDENUNCIA} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }
}

