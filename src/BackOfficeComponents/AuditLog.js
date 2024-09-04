import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import * as lang from '../Universal/lang.json';

export default function AuditLog(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    const url = "https://pint-backend-8vxk.onrender.com/auditlog/list";

    const [AuditLog, setAuditLog] = useState([]);
    
    const [LOGID, setLOGID] = useState("");
    const [IDCONTA, setIDCONTA] = useState("");
    const [TIPOATIVIDADE, setTIPOATIVIDADE] = useState("");
    const [DATA, setDATA] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Audit Log';
        loadAuditLog();
    }, []);

    function loadAuditLog(){
        axios.get(url)
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setAuditLog(data);
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
                    Listagem AuditLogs
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListAudit></ListAudit>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir AuditLog
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>{data.texto2auditlog}</label>
                            <input id='contaid' onChange={(value)=> setIDCONTA(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto3auditlog}</label>
                            <input id='tipoatividade' onChange={(value)=> setTIPOATIVIDADE(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto4auditlog}</label>
                            <input id='timestamp' onChange={(value)=> setDATA(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto5auditlog}</label>
                            <input id='descricao' onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={criarAuditLog} className='btn btn-info'>Inserir</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )


    function criarAuditLog(){
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/auditlog/create'
        const datapost = {
            IDCONTA: IDCONTA,
            TIPOATIVIDADE: TIPOATIVIDADE,
            DATA: DATA,
            DESCRICAO: DESCRICAO
        }
        axios.post(urlCriar, datapost)
        .then(res => {
            if(res.data.success === true){
                alert(res.data.message);
                loadAuditLog();
            }
            else{
                alert(res.data.message);
            }
        })
        .catch(error =>{
            alert('Erro: ' + error);
        })
    }

    function editarAuditLog(){
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/auditlog/update/' + LOGID;
        const datapost = {
            IDCONTA: IDCONTA,
            TIPOATIVIDADE: TIPOATIVIDADE,
            DATA: DATA,
            DESCRICAO: DESCRICAO
        }
        axios.put(urlEditar, datapost)
        .then(res =>{
            if(res.data.success === true){
                alert('AuditLog editado com sucesso');
                loadAuditLog();
            }
            else{
                alert('Erro');
            }
        })
        .catch(error => { 
            alert("Error: " + error);
        })
    }

    function ListAudit(){
        return AuditLog.map((audit, index) => {
            const now = new Date(audit.DATA);
            const today = now.toISOString().split('T')[0];
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>{data.texto1auditlog}: {audit.LOGID}</a>
                        <br></br>
                        <a>{data.texto2auditlog}: {audit.IDCONTA}</a>
                        <br></br>
                        <a>{data.texto3auditlog}: {audit.TIPOATIVIDADE}</a>
                        <br></br>
                        <a>{data.texto4auditlog}: {today}</a>
                        <br></br>
                        <a>{data.texto5auditlog}: {audit.DESCRICAO}</a>
                    </div>   
                </div>
            )
        })
    }
}

