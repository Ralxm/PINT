import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Cidade(){

    const url = "https://pint-backend-8vxk.onrender.com/cidade/list";

    const [Cidade, setCidade] = useState([]);
    
    const [IDCIDADE, setIDCIDADE] = useState("");
    const [NOME, setNOME] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Cidades';
        loadTables();
    }, []);

    function loadTables(){
        axios.get(url)
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setCidade(data);
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
                    Listagem Cidades
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Cidade
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>Nome</label>
                            <input id='contaid' onChange={(value)=> setNOME(value.target.value)}></input>
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
                        Editar Cidade
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>Nome</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
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
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/cidade/create'
        const datapost = {
            NOME: NOME
        }
        axios.post(urlCriar, datapost)
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
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/cidade/update/' + IDCIDADE;
        const datapost = {
            NOME : NOME
        }
        axios.put(urlEditar, datapost)
        .then(res =>{
            if(res.data.success === true){
                alert('Cidade editada com sucesso');
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
        return Cidade.map((data, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>ID Cidade: {data.IDCIDADE}</a>
                        <br></br>
                        <a>Nome: {data.NOME}</a>
                    </div>
                    <div className='showTableButtons'>
                        <button className='btn btn-info' onClick={() => inserirEditarColuna(data)}>Editar</button>
                        <Popup trigger={<button className='btn btn-danger'>Apagar</button>}>
                            <a>Confirmar apagar?</a>
                            <button onClick={() => ApagarColuna(data)} className='btn btn-outline-danger' style={{marginLeft: "5px"}}>Sim</button>
                        </Popup>
                        
                    </div>
                </div>
            )
        })
    }

    function ApagarColuna(data){
        setIDCIDADE(data.IDCIDADE);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/cidade/delete/' + data.IDCIDADE;
        axios.put(urlApagar)
        .then(res =>{
            if(res.data.success){
                alert('Audit log com ID: ' + {IDCIDADE} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }

    function inserirEditarColuna(data){
        setIDCIDADE(data.IDCIDADE);
        setNOME(data.NOME);

        document.getElementById('editColumn').style.display = 'block';
        document.getElementById('insertColumn').style.display = 'none';
    }

    function FecharEditar(){ 
        document.getElementById('editColumn').style.display = 'none';
        document.getElementById('insertColumn').style.display = 'block';
    }
}

