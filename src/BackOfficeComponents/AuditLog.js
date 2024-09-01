import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';

export default function AuditLog(){
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
                            <label>ID Conta</label>
                            <input id='contaid' onChange={(value)=> setIDCONTA(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Tipo Atividade</label>
                            <input id='tipoatividade' onChange={(value)=> setTIPOATIVIDADE(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Timestamp</label>
                            <input id='timestamp' onChange={(value)=> setDATA(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Descrição</label>
                            <input id='descricao' onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={criarAuditLog} className='btn btn-info'>Inserir</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px", display: 'none'}} id={'editColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    <div className='edit-header'>
                        Editar AuditLog
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>ID Conta</label>
                            <input id='contaid' value={IDCONTA} onChange={(value)=> setIDCONTA(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Tipo Atividade</label>
                            <input id='tipoatividade' value={TIPOATIVIDADE} onChange={(value)=> setTIPOATIVIDADE(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Timestamp</label>
                            <input id='timestamp' value={DATA} onChange={(value)=> setDATA(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Descrição</label>
                            <input id='descricao' value={DESCRICAO} onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={editarAuditLog} className='btn btn-info'>Editar</button>
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
        return AuditLog.map((data, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>Log ID: {data.LOGID}</a>
                        <br></br>
                        <a>ID Conta: {data.IDCONTA}</a>
                        <br></br>
                        <a>Tipo Atividade: {data.TIPOATIVIDADE}</a>
                        <br></br>
                        <a>Timestamp: {data.DATA}</a>
                        <br></br>
                        <a>Descrição: {data.DESCRICAO}</a>
                    </div>   
                </div>
            )
        })
    }
    /* 
    <div className='showTableButtons'>
                        <button className='btn btn-info' onClick={() => EditarColuna(data)}>Editar</button>
                        <button className='btn btn-danger' onClick={() => ApagarColuna(data)}>Apagar</button>
                    </div>
    */

    function ApagarColuna(data){
        setLOGID(data.LOGID);
        let idlog = data.LOGID;
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/auditlog/delete/' + data.LOGID;
        axios.put(urlApagar)
        .then(res =>{
            if(res.data.success){
                alert('Audit log com ID: ' + {idlog} + ' apagado com sucesso');
                loadAuditLog();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }

    function EditarColuna(data){
        setLOGID(data.LOGID);
        setIDCONTA(data.IDCONTA);
        setTIPOATIVIDADE(data.TIPOATIVIDADE);
        setDATA(data.DATA);
        setDESCRICAO(data.DESCRICAO);

        document.getElementById('editColumn').style.display = 'block';
        document.getElementById('insertColumn').style.display = 'none';
    }

    function FecharEditar(){ 
        document.getElementById('editColumn').style.display = 'none';
        document.getElementById('insertColumn').style.display = 'block';
    }
}

