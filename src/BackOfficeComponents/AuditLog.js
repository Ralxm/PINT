import React, {useState, useEffect} from 'react';
import authHeader from '../views/auth-header';
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
    let cidade = JSON.parse(localStorage.getItem("cidade"))

    const url = "https://pint-backend-8vxk.onrender.com/auditlog/list";

    const urlDenuncia = "https://pint-backend-8vxk.onrender.com/denuncia/listByCidade/";

    const [Denuncia, setDenuncia] = useState([]);

    const [IDDENUNCIA, setIDDENUNCIA] = useState("");

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
        axios.get(url, authHeader())
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

        axios.get(urlDenuncia + cidade, authHeader())
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
                    Listagem AuditLogs
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListAudit></ListAudit>
                </div>
            </div>
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

    function ListTables(){
        if(Denuncia.length == 0){
            return(
                <div className='col-12 showTable'>
                    <span>Sem denúncias para mostrar</span>           
                </div>
            )
        }
        return Denuncia.map((denuncia, index) => {
            console.log(denuncia);
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>{data.texto1denuncia}: {denuncia.IDDENUNCIA}</a>
                        <br></br>
                        <a>{data.texto2denuncia}: {denuncia.colaborador.NOME}</a>
                        <br></br>
                        <a>{data.texto3denuncia}: {denuncia.DATADENUNCIA}</a>
                        <br></br>
                        <a>{data.texto4denuncia}: {denuncia.MOTIVO}</a>
                        <br></br>
                        <a>{data.texto5denuncia}: {denuncia.comentario.TEXTO}</a>
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
                loadAuditLog();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }
}

