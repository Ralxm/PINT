import React, {useState, useEffect} from 'react';
import { Buffer } from 'buffer';
import '../Universal/index.css';
import axios from 'axios';
import authHeader from '../views/auth-header';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Post(){
    const url = "https://pint-backend-8vxk.onrender.com/post/list";

    const [Post, setPost] = useState([]);
    const [Questionario, setQuestionario] = useState([]);
    const [Espaco, setEspaco] = useState([]);
    const [Evento, setEvento] = useState([]);
    const [Aprovacao, setAprovacao] = useState([]);
    
    const [IDPUBLICACAO, setIDPUBLICACAO] = useState("");
    const [CIDADE, setCIDADE] = useState("");
    const [APROVACAO, setAPROVACAO] = useState("");
    const [COLABORADOR, setCOLABORADOR] = useState("");
    const [CATEGORIA, setCATEGORIA] = useState("");
    const [SUBCATEGORIA, setSUBCATEGORIA] = useState("");
    const [ESPACO, setESPACO] = useState("");

    const [COORDENADAS, setCOORDENADAS] = useState("");
    const [WEBSITE, setWEBSITE] = useState("");

    const [NOME, setNOMEQUESTIONARIO] = useState("");
    const [options, setOptions] = useState([{ label: 'Opção 1', value: '' }, { label: 'Opção 2', value: '' }]);
    const [IDQUESTIONARIO, setIDQUESTIONARIO] = useState("");

    const [EVENTO, setEVENTO] = useState("");
    const [DATAEVENTO, setDATAEVENTO] = useState("");
    const [DATAPUBLICACAO, setDATAPUBLICACAO] = useState("");
    const [DATAULTIMAATIVIDADE, setDATAULTIMAATIVIDADE] = useState("");
    const [TITULO, setTITULO] = useState("");
    const [TEXTO, setTEXTO] = useState("");
    const [RATING, setRATING] = useState("");
    const [IMAGEM, setIMAGEM] = useState("");

    const [Cidade, setCidade] = useState([]);
    const [Colaborador, setColaborador] = useState([]);
    const [Categoria, setCategoria] = useState([]);
    const [Subcategoria, setSubcategoria] = useState([]);

    const [Utilizador, setUtilizador] = useState([]);

    const [ImageUrl, setImageUrl] = useState("");

    const [FiltroPublicacao, setFiltroPublicacao] = useState("");
    const [FiltroColaborador, setFiltroColaborador] = useState("");
    
    useEffect(() => {
        document.title = 'Mostrar Post';

        loadTables();

        axios.get('https://pint-backend-8vxk.onrender.com/cidade/list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setCidade(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: fase1" + error)
        })

        axios.get('https://pint-backend-8vxk.onrender.com/colaborador/list', authHeader())
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setColaborador(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: fase2 " + error)
        })

        axios.get('https://pint-backend-8vxk.onrender.com/categoria/list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setCategoria(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: fase3" + error)
        }) 

        axios.get('https://pint-backend-8vxk.onrender.com/aprovacao/list')
            .then(res => {
                if(res.data.success === true){
                    const data = res.data.data;
                    setAprovacao(data);
                }
                else{
                    alert("Erro Web Service!");
                }
            })
            .catch(error => {
                alert("Erro fase4" + error);
            }); 
    }, []);

    useEffect(()=>{
        let id;
        Categoria.map((data) =>{
            if(data.NOME == CATEGORIA){
                id = data.IDCATEGORIA;
            }
        })
        if (CATEGORIA) {
            axios.get(`https://pint-backend-8vxk.onrender.com/subcategoria/listbyid/${id}`)
                .then(res => {
                    if (res.data.success === true) {
                        const data = res.data.data;
                        setSubcategoria(data);
                    } else {
                        alert("Erro ao buscar subcategorias");
                    }
                })
                .catch(error => {
                    alert("Erro ao buscar subcategorias: " + error);
                });
        }
    }, [CATEGORIA]);

    useEffect(()=>{
        if(Utilizador){
            axios.get(url + 'ByCidade/' + Utilizador.CIDADE)
            .then(res => {
                if(res.data.success === true){
                    const data = res.data.data;
                    setPost(data);
                }
                else{
                    alert("Erro Web Service!");
                }
            })
            .catch(error => {
                console.log("Erro ou a carregar");
            }); 
        }
    }, [Utilizador])

    function loadTables(){
        let id = JSON.parse(localStorage.getItem('id'));

        axios.get('https://pint-backend-8vxk.onrender.com/colaborador/get/' + id, authHeader())
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
            alert("Erro:asdfasdfasdfasdf " + error)
        })
    }

    const addOption = () => {
        const newOptionNumber = options.length + 1;
        const newOption = { label: `Opção ${newOptionNumber}`, value: '' };
        setOptions([...options, newOption]);
    };

    const removeOption = () => {
        if (options.length > 2) {
            setOptions(options.slice(0, -1));
        }
    };

    const handleInputChange = (index, value) => {
        const newOptions = options.map((option, i) => {
            if (i === index) {
                return { ...option, value: value.target.value };
            }
            return option;
        });
        setOptions(newOptions);
    };

    return(
        <div className='col-10' style={{display: 'flex'}}>
            <div className='side-bar col-4' style={{marginLeft: "10px"}}>
                <div className='col-lg-12 backoffice-option'>
                    Listagem Publicações
                </div>
                <div className='col-lg-12 d-flex'>
                    <div className='col-6 d-flex' style={{justifyContent: "center"}}>
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline d-flex">
                                <input onChange={(value) => setFiltroColaborador(value.target.value)} class="form-control mr-sm-2" type="search" placeholder="Colaborador - ID ou Nome" aria-label="Search" id='filtrarColaboradores'/>
                            </form>
                        </nav>
                    </div>
                    <div className='col-6 d-flex' style={{justifyContent: "center"}}>
                        <nav className="navbar navbar-light bg-light">
                            <form className="form-inline d-flex">
                                <input onChange={(value) => setFiltroPublicacao(value.target.value)} class="form-control mr-sm-2" type="search" placeholder="Publicação - ID ou Título" aria-label="Search" id='filtrarColaboradores'/>
                            </form>
                        </nav>
                    </div>
                </div>
                <div className='col-lg-12 showTable-list'>
                    <ListTables></ListTables>
                </div>
            </div>
            <div className='side-bar col-4' style={{marginLeft: "10px"}} id={'insertColumn'}>
                <div className='col-lg-12 backoffice-option'>
                    Inserir Publicação
                </div>
                <div className='col-lg-12 input-create-thing-big-box'>
                    <div className='input-create-thing'>
                        <div className='input-group'>
                            <label>Cidade</label>
                            <select id="inputState" className="input-group-select" value = {CIDADE} onChange={(value) => setCIDADE(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListCidades></ListCidades>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Colaborador</label>
                            <select id="inputState" className="input-group-select" value = {COLABORADOR} onChange={(value) => setCOLABORADOR(value.target.value)}>
                                        <option defaultValue>Selecione</option>
                                        <ListColaboradores></ListColaboradores>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Categoria</label>
                            <select id="inputState" className="input-group-select" value={CATEGORIA} onChange={(value) => setCATEGORIA(value.target.value)}>
                                <option defaultValue>Selecione</option>
                                <ListCategorias></ListCategorias>
                            </select>
                        </div>
                        <div className='input-group'>
                            <label>Subcategoria</label>
                            <select id="inputState" className="input-group-select" value = {SUBCATEGORIA} onChange={(value) => setSUBCATEGORIA(value.target.value)}>
                                <option defaultValue>Selecione</option>
                                <ListSubcategorias></ListSubcategorias>
                            </select>
                        </div>
                        <div>
                            <input type={'checkbox'} className='form-check-input' id='checkEspaco' onClick={() => atualizarCheck('checkEspaco')}></input>
                            <label className='form-check-label' for='checkEspaco'>Espaço</label>
                            <input type={'checkbox'} className='form-check-input' id='checkEvento' onClick={()=> atualizarCheck('checkEvento')}></input>
                            <label className='form-check-label' for="checkEvento">Evento</label>
                        </div>
                        <div id='espacoChecked' className='input-group-special'>
                            <div className='input-group'>
                                <label>Coordenadas</label>
                                <input id='descricao' onChange={(value)=> setCOORDENADAS(value.target.value)}></input>
                            </div>
                            <div className='input-group'>
                                <label>Website</label>
                                <input id='descricao' onChange={(value)=> setWEBSITE(value.target.value)}></input>
                            </div>
                        </div>
                        <div id='eventoChecked' className='input-group-special' style={{diplay:'none'}}>
                            <div className='input-group'>
                                <label>Data do Evento</label>
                                <input id='descricao' type='date' onChange={(value)=> setDATAEVENTO(value.target.value)}></input>
                            </div>
                            {options.map((option, index) => (
                                <div className='input-group' key={index}>
                                    <label>{option.label}:</label>
                                    <input id='descricao' value={option.value} onChange={(value) => handleInputChange(index, value)}></input>
                                </div>
                            ))}
                            <div className='input-group'>
                                <button style={{width:'80%', marginLeft:'10%'}} className='btn btn-outline-info' onClick={addOption} disabled={options.length >= 4}>Adicionar opção</button>
                            </div>
                            {options.length > 2 && (
                                <div className='input-group'>
                                    <button style={{ width: '80%', marginLeft: '10%' }} className='btn btn-outline-danger' onClick={removeOption}>Remover última opção</button>
                                </div>
                            )}
                        </div>
                        <div className='input-group'>
                            <label>Data de publicação</label>
                            <input id='descricao' onChange={(value)=> setDATAPUBLICACAO(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Data da ultima atividade</label>
                            <input id='descricao' onChange={(value)=> setDATAULTIMAATIVIDADE(value.target.value)} type={'date'}></input>
                        </div>
                        <div className='input-group'>
                            <label>Título</label>
                            <input id='descricao' onChange={(value)=> setTITULO(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Texto</label>
                            <input id='descricao' onChange={(value)=> setTEXTO(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Rating</label>
                            <input id='descricao' onChange={(value)=> setRATING(value.target.value)}></input>
                        </div>
                        <div className='input-group'>
                            <label>Imagem</label>
                            <input id='descricao' type='file' onChange={(value)=> setIMAGEM(value.target.files[0])}></input>
                        </div>
                        <div>
                            <button onClick={criarColuna} className='btn btn-info'>Inserir</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

async function criarColuna() {
    const urlCriarPost = 'https://pint-backend-8vxk.onrender.com/post/create';
    const urlCriarAprovacao = 'https://pint-backend-8vxk.onrender.com/aprovacao/create';
    const urlCriarEspaco = 'https://pint-backend-8vxk.onrender.com/espaco/create';
    const urlCriarEvento = 'https://pint-backend-8vxk.onrender.com/evento/create';
    const urlCriarQuestionario = 'https://pint-backend-8vxk.onrender.com/questionario/create';
    const urlCriarOpcoesEscolha = 'https://pint-backend-8vxk.onrender.com/opcoes_escolha/create';

    let idEspaco = 1;
    let idEvento = 1;
    let idAprovacao = null;
    let idQuestionario = null;
    let options = []; // Ensure this is initialized

    try {
        if (document.getElementById('checkEspaco').checked) {
            idEspaco = await criarEspaco();
            if (!idEspaco) return; // Exit if failed
            setEVENTO(1);
        }

        if (document.getElementById('checkEvento').checked) {
            idQuestionario = await criarQuestionario();
            if (!idQuestionario) return; // Exit if failed
            

            idEvento = await criarEvento(idQuestionario);
            if (!idEvento) return; // Exit if failed

            setESPACO(1);
        }

        if (idQuestionario) {
            await criarOpcoesEscolha(idQuestionario);
        } else {
            console.error("IDQUESTIONARIO is not defined");
        }

        idAprovacao = await criarAprovacao();
        if (!idAprovacao) return; // Exit if failed

        await criarPost(idEspaco, idEvento, idAprovacao);
        loadTables();
    } catch (error) {
        alert('An error occurred');
        console.error(error);
    }
}

async function criarEspaco() {
    const urlCriarEspaco = 'https://pint-backend-8vxk.onrender.com/espaco/create';
    const datapostEspaco = { COORDENADAS, WEBSITE };
    try {
        const res = await axios.post(urlCriarEspaco, datapostEspaco);
        if (res.data.success) {
            const idEspaco = res.data.data.IDESPACO;
            setEspaco(idEspaco);
            return idEspaco;
        } else {
            alert(res.data.message);
            return null;
        }
    } catch (error) {
        console.error('Failed to create space', error);
        return null;
    }
}

async function criarQuestionario() {
    const urlCriarQuestionario = 'https://pint-backend-8vxk.onrender.com/questionario/create';
    const datapostQuestionario = { NOME };
    try {
        const res = await axios.post(urlCriarQuestionario, datapostQuestionario);
        if (res.data.success) {
            const idQuestionario = res.data.data.IDQUESTIONARIO;
            setIDQUESTIONARIO(idQuestionario);
            return idQuestionario;
        } else {
            alert(res.data.message);
            return null;
        }
    } catch (error) {
        console.error('Failed to create questionnaire', error);
        return null;
    }
}

async function criarOpcoesEscolha(idQuestionario) {
    console.log("idquestionario: " + idQuestionario)
    const urlCriarOpcoesEscolha = 'https://pint-backend-8vxk.onrender.com/opcoes_escolha/create';
    const requests = options.map(option => {
        const datapostOpcoesEscolha = {
            NOME: option.value,
            TIPOOPCAO: 1,
            IDQUESTIONARIO: idQuestionario
        };
        return axios.post(urlCriarOpcoesEscolha, datapostOpcoesEscolha);
    });

    try {
        const responses = await Promise.all(requests);
        console.log('All requests were successful:', responses);
    } catch (error) {
        console.error('One or more requests failed:', error);
    }
}

async function criarEvento(idQuestionario) {
    const urlCriarEvento = 'https://pint-backend-8vxk.onrender.com/evento/create';
    const datapostEvento = { IDQUESTIONARIO: idQuestionario, DATAEVENTO, ESTADO: 1 };
    try {
        const res = await axios.post(urlCriarEvento, datapostEvento);
        if (res.data.success) {
            const idEvento = res.data.data.IDEVENTO;
            setEVENTO(idEvento);
            setESPACO(1)
            return idEvento;
        } else {
            alert(res.data.message);
            return null;
        }
    } catch (error) {
        console.error('Failed to create event', error);
        return null;
    }
}

async function criarAprovacao() {
    const urlCriarAprovacao = 'https://pint-backend-8vxk.onrender.com/aprovacao/create';
    const now = new Date();
    const today = now.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    const datapostAprovacao = {
        IDCOLABORADOR: 0,
        DATAAPROVACAO: today,
        APROVADA: 0
    };

    try {
        const res = await axios.post(urlCriarAprovacao, datapostAprovacao);
        if (res.data.success) {
            const idAprovacao = res.data.data.IDAPROVACAO;
            setAprovacao(idAprovacao);
            return idAprovacao;
        } else {
            alert(res.data.message);
            return null;
        }
    } catch (error) {
        console.error('Failed to create approval', error);
        return null;
    }
}

async function criarPost(idEspaco, idEvento, idAprovacao) {
    const urlCriarPost = 'https://pint-backend-8vxk.onrender.com/post/create';
    const datapostPost = new FormData();
    datapostPost.append('CIDADE', Cidade.find(data => data.NOME === CIDADE)?.IDCIDADE);
    datapostPost.append('APROVACAO', idAprovacao);
    datapostPost.append('COLABORADOR', Colaborador.find(data => data.NOME === COLABORADOR)?.IDCOLABORADOR);
    datapostPost.append('CATEGORIA', Categoria.find(data => data.NOME === CATEGORIA)?.IDCATEGORIA);
    datapostPost.append('SUBCATEGORIA', Subcategoria.find(data => data.NOME === SUBCATEGORIA)?.IDSUBCATEGORIA);
    datapostPost.append('ESPACO', idEspaco);
    datapostPost.append('EVENTO', idEvento);
    datapostPost.append('DATAPUBLICACAO', DATAPUBLICACAO);
    datapostPost.append('DATAULTIMAATIVIDADE', DATAULTIMAATIVIDADE);
    datapostPost.append('TITULO', TITULO);
    datapostPost.append('TEXTO', TEXTO);
    datapostPost.append('RATING', RATING);
    if (IMAGEM) {
        datapostPost.append('IMAGEM', IMAGEM);
    }
    console.log(datapostPost)

    try {
        const res = await axios.post(urlCriarPost, datapostPost, { headers: { 'Content-Type': 'multipart/form-data' } });
        if (res.data.success) {
            console.log('Post created successfully');
        } else {
            alert('Error creating post');
        }
    } catch (error) {
        alert("Error creating post: " + (error.response ? error.response.data.message : error.message));
    }
}

    function ListTables(){
        const [filteredPosts, setFilteredPosts] = useState(Post);
        let lowercasedFiltroPublicacao;
        let lowercasedFiltroColaborador;

        useEffect(() => {
            if (FiltroColaborador === "" && FiltroPublicacao === "") {
                setFilteredPosts(Post);
            } else {
                // Convert inputs to lowercase if they are non-empty strings
                const lowercasedFiltroPublicacao = FiltroPublicacao ? FiltroPublicacao.toLowerCase() : '';
                const lowercasedFiltroColaborador = FiltroColaborador ? FiltroColaborador.toLowerCase() : '';
        
                const filtered = Post.filter(data => {
                    // Convert ID fields to string for comparison
                    const idPublicacaoStr = data.IDPUBLICACAO.toString();
                    const idColaboradorStr = data.COLABORADOR.toString();
                    const colaboradorNomeStr = data.colaborador.NOME.toLowerCase();
                    const tituloStr = data.TITULO.toLowerCase();
        
                    // Check if the current post matches the filters
                    const matchesPublicacao = (
                        (!FiltroPublicacao || 
                        idPublicacaoStr.includes(FiltroPublicacao) || 
                        tituloStr.includes(lowercasedFiltroPublicacao))
                    );
        
                    const matchesColaborador = (
                        (!FiltroColaborador || 
                        idColaboradorStr.includes(FiltroColaborador) || 
                        colaboradorNomeStr.includes(lowercasedFiltroColaborador))
                    );
        
                    // Return true if both conditions match or if one filter is empty
                    return matchesPublicacao && matchesColaborador;
                });
        
                setFilteredPosts(filtered);
            }
        }, [FiltroColaborador, FiltroPublicacao, Post]);

        return filteredPosts.map((data, index) => {
            let aprovada;
            if(data.aprovacao.APROVADA == 1){
                aprovada = 'Aprovada';
            }
            else{
                aprovada = 'Não Aprovada';
            }
            let base64Image;
            if(data.IMAGEM){
                //const base64 = Buffer.from(data.IMAGEM.data, "binary" ).toString("base64");
                base64Image = 'data:image/jpeg;base64,' + data.IMAGEM;
            }
                return(
                    <div className='col-12 showTable'>
                        <div className='showTableText'>
                            <a>ID Publicação: {data.IDPUBLICACAO}</a>
                            <a>Aprovação{' ID: ' + data.APROVACAO + ' - ' + aprovada}</a>
                            <a>Colaborador: {' ID: ' + data.COLABORADOR + ' - ' +  data.colaborador.NOME}</a>
                            <a>Categoria: {data.categorium.NOME}</a>
                            <a>Subcategoria: {data.subcategorium.NOME}</a>
                            {data.EVENTO === 1 && <a>Espaço: {data.espaco.IDESPACO}</a>}
                            {data.ESPACO === 1 && <a>Evento: {data.EVENTO}</a>}
                            <a>Data publicação: {data.DATAPUBLICACAO}</a>
                            <a>Data ultima atividade: {data.DATAULTIMAATIVIDADE}</a>
                            <a>Título: {data.TITULO}</a>
                            <a>Texto: {data.TEXTO}</a>
                            <a>Rating: {data.RATING}</a>
                            {data.IMAGEM && <img src={base64Image} style={{ maxWidth: '100%', height: 'auto', width: '40%' }}></img>}
                        </div>
                        <div className='showTableButtons'>
                            <Popup trigger={<button className='btn btn-danger'>Apagar</button>}>
                                <a>Confirmar apagar?</a>
                                <button onClick={() => ApagarColuna(data)} className='btn btn-outline-danger' style={{marginLeft: "5px"}}>Sim</button>
                            </Popup>
                            
                        </div>
                    </div>
                )
        })
    }

    function ListCidades(){
        return Cidade.map((data, index) =>{
            return <option key={index} value ={data.CIDADE}>{data.NOME}</option>
        })
    }

    function ListColaboradores(){
        return Colaborador.map((data, index) =>{
            let cidade;
            Cidade.map((data2) =>{
                if(data2.NOME == CIDADE){
                    cidade = data2.IDCIDADE
                }
            })
            if(CIDADE && data.CIDADE == cidade){
                return <option key={index} value ={data.COLABORADOR}>{data.NOME}</option>
            }
            return null;
        })
    }

    function ListCategorias(){
        return Categoria.map((data, index) =>{
            return <option key={index} value ={data.CATEGORIA}>{data.NOME}</option>
        })
    }

    function ListSubcategorias(valor){
        return Subcategoria.map((data, index) =>{
            return <option key={index} value ={data.SUBCATEGORIA}>{data.NOME}</option>
        })
    }

    function ApagarColuna(data){
        setIDPUBLICACAO(data.IDPUBLICACAO);
        const urlApagar = 'https://pint-backend-8vxk.onrender.com/post/delete/' + data.IDPUBLICACAO;
        axios.put(urlApagar)
        .then(res =>{
            if(res.data.success){
                alert('Publicação: ' + {IDPUBLICACAO} + ' apagado com sucesso');
                loadTables();
            }
        })
        .catch(error => {
            alert("Erro fase9" + error)
        });
    }

    function atualizarCheck(id){
        if(id == 'checkEspaco' && document.getElementById(id).checked == true){
            document.getElementById('checkEvento').checked = false;
            document.getElementById('espacoChecked').style.display = 'block';
            document.getElementById('eventoChecked').style.display = 'none';
        }
        else if(id == 'checkEvento' && document.getElementById(id).checked == true){
            document.getElementById('checkEspaco').checked = false;
            document.getElementById('eventoChecked').style.display = 'block';
            document.getElementById('espacoChecked').style.display = 'none';
            
        }
        else if(id == 'checkEspaco' && document.getElementById(id).checked == false){
            document.getElementById('espacoChecked').style.display = 'none';
        }
        else if(id == 'checkEvento' && document.getElementById(id).checked == false){
            document.getElementById('eventoChecked').style.display = 'none';
        }
    }
}