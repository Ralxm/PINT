import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import * as lang from '../Universal/lang.json';
import authHeader from '../views/auth-header';

export default function Cargo(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    const url = "https://pint-backend-8vxk.onrender.com/cargo/list";

    const [Cargo, setCargo] = useState([]);
    
    const [IDCARGO, setIDCARGO] = useState("");
    const [NOME, setNOME] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Cargos';
        loadTables();
    }, []);

    function loadTables(){
        axios.get(url, authHeader())
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setCargo(data);
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
                    Listagem Cargos
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Cargo
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>{data.texto2cargo}</label>
                            <input id='contaid' onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto3cargo}</label>
                            <input id='contaid' onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={criarColuna} className='btn btn-info'>Inserir</button>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px", display: 'none'}} id={'editColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    <div className='edit-header'>
                        Editar Colaborador
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                    <div className='input-group'>
                            <label>{data.texto2cargo}</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto3cargo}</label>
                            <input id='contaid' value={DESCRICAO} onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={editarColuna} className='btn btn-info'>Editar</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )

    function criarColuna(){
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/cargo/create'
        const datapost = {
            NOME: NOME,
            DESCRICAO: DESCRICAO,
        }
        axios.post(urlCriar, datapost, authHeader())
        .then(res => {
            if(res.data.success === true){
                alert(res.data.message);
                loadTables();
            }
            else{
                alert(res.data.message);
            }
        })
        .catch(error =>{
            alert('Erro: ' + error);
        })
    }

    function editarColuna(){
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/cargo/update/' + IDCARGO;
        const datapost = {
            NOME: NOME,
            DESCRICAO: DESCRICAO,
        }
        axios.put(urlEditar, datapost, authHeader())
        .then(res =>{
            if(res.data.success === true){
                alert('Cargo editada com sucesso');
                loadTables();
            }
            else{
                alert('Erro');
            }
        })
        .catch(error => { 
            alert("Error: " + error);
        })
    }

    function ListTables(){
        return Cargo.map((cargo, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>{data.texto1cargo}: {cargo.IDCARGO}</a>
                        <br></br>
                        <a>{data.texto2cargo}: {cargo.NOME}</a>
                        <br></br>
                        <a>{data.texto3cargo}: {cargo.DESCRICAO}</a>
                    </div>
                    {(index >= 2) &&
                        <div className='showTableButtons'>
                        <button className='btn btn-info' onClick={() => inserirEditarColuna(cargo)}>Editar</button>
                        <button className='btn btn-danger' onClick={() => ApagarColuna(cargo)}>Apagar</button>
                    </div>
                    }
                    
                </div>
            )
        })
    }

    function ApagarColuna(data){
        setIDCARGO(data.IDCARGO);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/cargo/delete/' + data.IDCARGO;
        axios.put(urlApagar, authHeader())
        .then(res =>{
            if(res.data.success){
                alert('Audit log com ID: ' + {IDCARGO} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }

    function inserirEditarColuna(data){
        setIDCARGO(data.IDCARGO)
        setNOME(data.NOME)
        setDESCRICAO(data.DESCRICAO)

        document.getElementById('editColumn').style.display = 'block';
        document.getElementById('insertColumn').style.display = 'none';
    }

    function FecharEditar(){ 
        document.getElementById('editColumn').style.display = 'none';
        document.getElementById('insertColumn').style.display = 'block';
    }
}

