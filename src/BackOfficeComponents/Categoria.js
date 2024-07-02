import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';

export default function Categoria(){

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
        axios.get(url)
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
                            <label>Nome</label>
                            <input id='contaid' onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Descrição</label>
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
                            <label>Email</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Password</label>
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
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/categoria/update/' + IDCATEGORIA;
        const datapost = {
            NOME: NOME,
            DESCRICAO : DESCRICAO
        }
        axios.put(urlEditar, datapost)
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
        return Categoria.map((data, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>ID Categoria: {data.IDCATEGORIA}</a>
                        <br></br>
                        <a>Nome: {data.NOME}</a>
                        <br></br>
                        <a>Descrição: {data.DESCRICAO}</a>
                    </div>
                    <div className='showTableButtons'>
                        <button className='btn btn-info' onClick={() => inserirEditarColuna(data)}>Editar</button>
                        <button className='btn btn-danger' onClick={() => ApagarColuna(data)}>Apagar</button>
                    </div>
                </div>
            )
        })
    }

    function ApagarColuna(data){
        setIDCATEGORIA(data.IDCATEGORIA);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/categoria/delete/' + data.IDCATEGORIA;
        axios.put(urlApagar)
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

