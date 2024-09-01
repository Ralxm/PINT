import React, {useState, useEffect} from 'react';
import '../Universal/index.css';
import axios from 'axios';
import Categoria from './Categoria';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Subcategoria(){

    const url = "https://pint-backend-8vxk.onrender.com/subcategoria/list";

    const [Subcategoria, setSubcategoria] = useState([]);
    
    const [IDSUBCATEGORIA, setIDSUBCATEGORIA] = useState("");
    const [NOME, setNOME] = useState("");
    const [DESCRICAO, setDESCRICAO] = useState("");
    const [IDCATEGORIA, setIDCATEGORIA] = useState("");
    

    const [CATEGORIA, setCATEGORIA] = useState([]);
    
    useEffect(() => {
        document.title = 'Mostrar Subcategorias';
        loadTables();

        axios.get('https://pint-backend-8vxk.onrender.com/categoria/list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setCATEGORIA(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })
    }, []);

    function loadTables(){
        axios.get(url)
        .then(res => {
            if(res.data.success === true){
                const data = res.data.data;
                setSubcategoria(data);
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
                    Listagem Subcategorias
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Subcategoria
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
                        <div className='input-group'>
                            <label>Categoria</label>
                            <select id="inputState" className="input-group-select" value = {IDCATEGORIA} onChange={(value) => setIDCATEGORIA(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCategorias></ListCategorias>
                            </select>
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
                        Editar Subcategoria
                        <button onClick={FecharEditar} className='btn btn-secondary fechar-button'>Fechar</button>
                    </div>
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                    <div className='input-group'>
                            <label>Nome</label>
                            <input id='contaid' value={NOME} onChange={(value)=> setNOME(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Descrição</label>
                            <input id='contaid' value={DESCRICAO}  onChange={(value)=> setDESCRICAO(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Categoria</label>
                            <select id="inputState" className="input-group-select" value = {IDCATEGORIA} onChange={(value) => setIDCATEGORIA(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCategorias></ListCategorias>
                            </select>
                        </div>
                        <div>
                            <button onClick={() => editarColuna()} className='btn btn-info'>Editar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    function criarColuna(){
        const urlCriar = 'https://pint-backend-8vxk.onrender.com/subcategoria/create'
        const datapost = {
            NOME: NOME,
            DESCRICAO: DESCRICAO,
            IDCATEGORIA: IDCATEGORIA,
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
        const urlEditar = 'https://pint-backend-8vxk.onrender.com/subcategoria/update/' + IDSUBCATEGORIA;
        const datapost = {
            NOME: NOME,
            DESCRICAO: DESCRICAO,
            IDCATEGORIA: IDCATEGORIA,
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
        return Subcategoria.map((data, index) => {
            return(
                <div className='col-12 showTable'>
                    <div className='showTableText'>
                        <a>Nome: {data.NOME}</a>
                        <br></br>
                        <a>Descrição: {data.DESCRICAO}</a>
                        <br></br>
                        <a>Categoria: {data.IDCATEGORIA}</a>
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

    function ListCategorias(){
        return CATEGORIA.map((data, index) =>{
            return <option key={index} value ={data.IDCATEGORIA}>{data.NOME}</option>
        })
    }

    function ApagarColuna(data){
        setIDSUBCATEGORIA(data.IDSUBCATEGORIA);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/subcategoria/delete/' + data.IDSUBCATEGORIA;
        axios.put(urlApagar)
        .then(res =>{
            if(res.data.success){
                alert('Subcategoria com ID: ' + {IDSUBCATEGORIA} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro " + error)
        });
    }

    function inserirEditarColuna(data){
        setIDSUBCATEGORIA(data.IDSUBCATEGORIA)
        setNOME(data.NOME)
        setDESCRICAO(data.DESCRICAO)
        setIDCATEGORIA(data.IDCATEGORIA)

        document.getElementById('editColumn').style.display = 'block';
        document.getElementById('insertColumn').style.display = 'none';
    }

    function FecharEditar(){ 
        document.getElementById('editColumn').style.display = 'none';
        document.getElementById('insertColumn').style.display = 'block';
    }
}

