import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import * as lang from '../Universal/lang.json';
import authHeader from '../views/auth-header';

export default function Categoria(){
    if(!JSON.parse(localStorage.getItem("lang"))){
        localStorage.setItem("lang", "pt");
    }
    let stolang = JSON.parse(localStorage.getItem("lang"));
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    const url = "https://pint-backend-8vxk.onrender.com/categoria/list";

    const [Categoria, setCategoria] = useState([]);
    
    const [IDCATEGORIA, setIDCATEGORIA] = useState("");
    const [NOME, setNOME] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Categorias';
        loadTables();
    }, []);

    function loadTables(){
        axios.get(url, authHeader())
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setCategoria(data);
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
                    Listagem Categorias
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Categoria
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>{data.texto2categoria}</label>
                            <input id='contaid' onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto3categoria}</label>
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
                        Editar Categoria
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                    <div className='input-group'>
                            <label>{data.texto2categoria}</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>{data.texto3categoria}</label>
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
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/categoria/create'
        const datapost = {
            NOME: NOME,
            DESCRICAO : DESCRICAO
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
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/categoria/update/' + IDCATEGORIA;
        const datapost = {
            NOME: NOME,
            DESCRICAO : DESCRICAO
        }
        axios.put(urlEditar, datapost, authHeader())
        .then(res =>{
            if(res.data.success === true){
                alert('Categoria editada com sucesso');
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
        return Categoria.map((categoria, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>{data.texto1categoria}: {categoria.IDCATEGORIA}</a>
                        <br></br>
                        <a>{data.texto2categoria}: {categoria.NOME}</a>
                        <br></br>
                        <a>{data.texto3categoria}: {categoria.DESCRICAO}</a>
                    </div>
                    <div className='showTableButtons'>
                        <button className='btn btn-info' onClick={() => inserirEditarColuna(categoria)}>Editar</button>
                        <Popup trigger={<button className='btn btn-danger'>Apagar</button>}>
                            <a>Confirmar apagar?</a>
                            <button onClick={() => ApagarColuna(categoria)} className='btn btn-outline-danger' style={{marginLeft: "5px"}}>Sim</button>
                        </Popup>
                        
                    </div>
                </div>
            )
        })
    }

    function ApagarColuna(data){
        setIDCATEGORIA(data.IDCATEGORIA);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/categoria/delete/' + data.IDCATEGORIA;
        axios.put(urlApagar, authHeader())
        .then(res =>{
            if(res.data.success){
                alert('Audit log com ID: ' + {IDCATEGORIA} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }

    function inserirEditarColuna(data){
        setIDCATEGORIA(data.IDCATEGORIA)
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

