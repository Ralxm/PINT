import React, {useState, useEffect} from 'react';
import { Calendar, Badge, Tooltip, Whisper } from 'rsuite';
import '../Universal/index.css'
import axios from 'axios';
import Profile from './Profile'
import {Buffer} from 'buffer'
import authService from '../views/auth-service';
import "rsuite/dist/rsuite-no-reset.min.css"

export default function Main(){
    const urlCategoria = "https://pint-backend-8vxk.onrender.com/categoria/";
    const urlSubCategoria = "https://pint-backend-8vxk.onrender.com/subcategoria/";
    const urlPost = "https://pint-backend-8vxk.onrender.com/post/";
    const urlAprovacao = "https://pint-backend-8vxk.onrender.com/aprovacao/";
    const urlEspaco = "https://pint-backend-8vxk.onrender.com/post/";
    const urlEvento = "https://pint-backend-8vxk.onrender.com/aprovacao/";
    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";
    const urlComentario = "https://pint-backend-8vxk.onrender.com/comentario/";
    let checked = 0;

    const [Categoria, setCategoria] = useState([]);
    const [Subcategoria, setSubcategoria] = useState([]);
    const [Publicacao, setPublicacao] = useState([]);
    const [Espaco, setEspaco] = useState([]);
    const [Evento, setEvento] = useState([]);
    const [Colaborador, setColaborador] = useState([]);
    const [Comentario, setComentario] = useState([]);

    const [Utilizador, setUtilizador] = useState([]);

    const [Filtros, setFiltros] = useState([])

    useEffect(() =>{
        document.title = 'Página Principal';
        loadTables();
    }, [])

    function loadTables(){
        let id = JSON.parse(localStorage.getItem('id'));
        let token;
        try{
            let user = localStorage.getItem('user');
            let userData = JSON.parse(user);
            token = userData.token;
        }
        catch{
            console.log("Erro a ir buscar o token");
        }
        axios.get(urlColaborador + 'list', {headers: { 'Authorization' : 'Bearer ' + token } })
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setColaborador(data);
            }
            else {
                alert("Erro Web Service");
                authService.logout();
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlColaborador + 'get/' + id, {headers: { 'Authorization' : 'Bearer ' + token } })
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
            alert("Erro: " + error)
        })

        axios.get(urlCategoria + 'list')
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
            alert("Erro: " + error)
        })

        axios.get(urlSubCategoria + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setSubcategoria(data);
                setFiltros(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlPost + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setPublicacao(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlEspaco + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setEspaco(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlEvento + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setEvento(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlComentario + 'list')
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setComentario(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })
    }

    function HandleFiltros(){
        let arr = []
        let count = 0;
        Subcategoria.map((data, index) => {
            if(document.getElementById('subfiltro-' + data.NOME + '-' + (index + 1)).checked == true){
                count++;
                arr.push(data);
            }
        })
        if(count == 0){
            setFiltros(Subcategoria);
        }
        else{
            setFiltros(arr);
        }
    }

    function Filtro(){
            return (
                <div className='d-md-none d-sm-none d-lg-block d-md-block d-none d-sm-block filtro-box'>
                    <div className='col-lg-1 filtro-text filtro-title'>
                        &nbsp;
                    </div>
                    <div className='col-lg-8 filtro-text filtro-title'>
                        <span>Filtros</span>
                    </div>
                    <div className='col-lg-2 filtro-text filtro-submit'>
                        <input type='submit' value='Filtrar' onClick={HandleFiltros}></input>
                    </div>
                    <div className='col-lg-1 filtro-text filtro-title'>
                        &nbsp;
                    </div>

                    <SubFiltro></SubFiltro>
                </div>
            )
    }

    function SubFiltro(){
        return Categoria.map((data, index) => {
            return (
                <div className='col-12 filtro-saude filtro pe-0'>
                    <input type='checkbox' id={'input-' + (index + 1)} onClick={() => toggle_all_checkboxes(data, Subcategoria)}></input>
                    <button className='' id='dropdown-saude' onClick={() => toggle_filtro('filtro-' + (index + 1), 'arrow-' + (index + 1))}>
                        {data.NOME}
                        <a style={{ float: 'right' }} id={'arrow-' + (index + 1)}>&#9661;</a>
                    </button>
                    <div style={{ display: 'none' }} id={'filtro-' + (index + 1)}>
                        <ul style={{ listStyleType: 'none' }}>
                            {Subcategoria.map((data2, index2) =>{
                                if(data2.IDCATEGORIA == data.IDCATEGORIA){
                                    return (
                                        <li>
                                            <input type='checkbox' id={'subfiltro-' + data2.NOME + '-' + (index2 + 1)} onClick={() => check_all(data, Subcategoria, index + 1)}></input>
                                            <button className='sub-filtro'>{data2.NOME}</button>
                                        </li>
                                    );
                                }
                            })}
                        </ul>
                    </div>
                </div>
            )
        })

        function toggle_filtro(id, idarrow) {
            let mostrar = document.getElementById(id);
            if (mostrar.style.display == 'block') {
                mostrar.style.display = 'none';
                document.getElementById(idarrow).innerHTML = '&#9661;';
            }
            else {
                mostrar.style.display = 'block';
                document.getElementById(idarrow).innerHTML = '&#9651;';
            }
        }

        function toggle_all_checkboxes(categoria, subcategorias){
            let ids = [];
            subcategorias.map((data2, index) => {
                if(categoria.IDCATEGORIA == data2.IDCATEGORIA){
                    ids.push('subfiltro-' + data2.NOME + '-' + (index + 1))
                }
            })
            if(checked == 0){
                checked = 1;
            }
            else{
                checked = 0;
            }
            ids.map((arr) => {
                if(checked == 0){
                    if(document.getElementById(arr).checked == true){
                        document.getElementById(arr).checked = false;
                    }
                }
                else{
                    if(document.getElementById(arr).checked == false){
                        document.getElementById(arr).checked = true;
                    }
                }
            })    
        }
        
        function check_all(categoria, subcategorias, ind) {
            let ids = [];
            subcategorias.forEach((data2, index) => {
                if (categoria.IDCATEGORIA === data2.IDCATEGORIA) {
                    ids.push('subfiltro-' + data2.NOME + '-' + (index + 1))
                }
            });

            let allChecked = ids.every(id => document.getElementById(id).checked);
            let anyChecked = ids.some(id => document.getElementById(id).checked);

            if (!anyChecked) {
                document.getElementById('input-' + (ind)).checked = false;
            } else if (allChecked) {
                document.getElementById('input-' + (ind)).checked = true;
            } else {
                document.getElementById('input-' + (ind)).checked = false;
            }
        }
    }

    function CalendarioBox(){
        return(
            <div className='calendario-box'>
                <Calendar compact bordered renderCell={renderCell} />
            </div>
        )
    }

    function getTodoList(date) {
        const eventsOnDate  = [];
        Publicacao.map((post) =>{
            if(post.CIDADE == Utilizador.CIDADE && post.aprovacao.APROVADA == 1){
                if(post.IDEVENTO != 1){
                    const eventDate = new Date(post.evento.DATAEVENTO);
                    if (eventDate.getFullYear() === date.getFullYear() && eventDate.getMonth() === date.getMonth() && eventDate.getDate() === date.getDate()) {
                        eventsOnDate.push({ time: eventDate.toLocaleTimeString(), title: post.TITULO, idpost: post.IDPUBLICACAO});
                    }
                }
            }
        })

        return eventsOnDate;
      }

      function renderCell(date) {
        const list = getTodoList(date);
      
        if (list.length > 0) {
          const tooltip = (
            <Tooltip>
              {list.map((item, index) => (
                <div key={index}>
                {item.title}
                </div>
              ))}
            </Tooltip>
          );
      
          return (
            <Whisper placement="top" trigger="hover" speaker={tooltip}>
              <Badge className="calendar-todo-item-badge" onClick={() => window.location.href = "#/post/" + list[0].idpost} style={{ cursor: 'pointer' }}
              />
            </Whisper>
          );
        }
      
        return null;
      }

    function PostBox({ Filtros }) {
        return(
            <div className='col-6 posts-box'>
                <Post Filtros={Filtros}></Post>
            </div>
        )
    }

    function Post({ Filtros }) {
        useEffect(() => {
            // Quando o filtro é alterado, o component Post da re-render
        }, [Filtros]);
    
        return Publicacao.map((data, index) => {
            if(Publicacao && data.CIDADE == data.colaborador.CIDADE && data.CIDADE == Utilizador.CIDADE){
                if(data.aprovacao.APROVADA == 1){
                    if(Filtros.some(data2 => data2.IDSUBCATEGORIA == data.SUBCATEGORIA)){
                        const { categorium, espaco, evento, subcategorium } = data;
                        if(evento.IDEVENTO == 1 || espaco.IDESPACO == 1){ //RETURN DE UM ESPAÇO POIS O EVENTO É O DEFAULT
                            let base64Image;
                            if(data.IMAGEM){
                                const base64 = Buffer.from(data.IMAGEM.data, "binary" ).toString("base64");
                                base64Image = 'data:image/jpeg;base64,' + base64;
                            }
                            return(
                                <div className='card mb-3 post' style={{cursor: 'pointer'}} onClick={() => window.location = "#/post/" + data.IDPUBLICACAO}>
                                    <div className="row g-0">
                                        <div className="col-md-4 post-img-box">
                                            {data.IMAGEM && <img className="img-fluid rounded-start post-img" src={base64Image}></img>}
                                        </div>
                                        <div className="col-md-8 post-info-box position-relative">
                                            <div className="card-body">
                                                <h5 className="card-title">{data.TITULO}</h5>
                                                <p className="card-text">{categorium.NOME + ' - ' + subcategorium.NOME}</p>
                                                <p className="card-text">{data.TEXTO}</p>
                                            </div>
                                            <a className="card-text post-website position-absolute bottom-0" style={{marginLeft: '10px', marginTop: '10px'}} href={espaco.WEBSITE} target='_blank'>{espaco.WEBSITE}</a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        else{ //RETURN DE UM EVENTO POIS O ESPAÇO É O DEFAULT
        
                        }
                    }
            } 
            }
        })
    }

    function Aprovar(props){
        const { pub } = props;
        const { aprovacao } = pub;
        let id = JSON.parse(localStorage.getItem('id'));
        const datapost = {
            IDCOLABORADOR : id,
            DATAAPROVACAO : aprovacao.DATAAPROVACAO,
            APROVADA : 1          
        }
        axios.put(urlAprovacao + 'update/' + aprovacao.IDAPROVACAO, datapost)
        .then(function(data){
            if(data.data.success === true){
                console.log("fixe");
                const updatedPublicacao = Publicacao.filter(item => item.IDPOST !== pub.IDPOST);
                setPublicacao(updatedPublicacao);
                loadTables();
            }
            else{
                console.log("não fixe");
            }
        })
        .catch(err =>{
            console.log("Erro");
        })
        loadTables();
    }

    function RejeitarApagar(props){
        const { pub } = props;
        const { aprovacao } = pub;

        if(pub.IDPUBLICACAO){
            axios.put(urlPost + 'delete/' + pub.IDPUBLICACAO)
            .then(function(data){
                if(data.data.success === true){
                    console.log("fixe");
                    loadTables();
                }
                else{
                    console.log("não fixe");
                }
            })
            .catch(err =>{
                console.log("Erro");
            })
        }
        else if(pub.IDCOMENTARIO){
            axios.put(urlComentario + 'delete/' + pub.IDCOMENTARIO)
            .then(function(data){
                if(data.data.success === true){
                    console.log("fixe");
                    loadTables();
                }
                else{
                    console.log("não fixe");
                }
            })
            .catch(err =>{
                console.log("Erro");
            })
        }
        
        axios.put(urlAprovacao + 'delete/' + aprovacao.IDAPROVACAO)
        .then(function(data){
            if(data.data.success === true){
                console.log("fixe");
                loadTables();
            }
            else{
                console.log("não fixe");
            }
        })
        .catch(err =>{
            console.log("Erro");
        })
        
        loadTables();
    }
    
    function Aceitar(props){
        return(
            <button className='button-aceitar' onClick={() => Aprovar(props)}>
                Aceitar
            </button>
        )
    }
    
    function Rejeitar(props){
        return(
            <button className='button-rejeitar' onClick={() => RejeitarApagar(props)}>
                Rejeitar
            </button>
        )
    }
    
    function Notification() {
        return (
            <>
                {Publicacao.map((data, index) => {
                    if (data.aprovacao.APROVADA == 0 && data.CIDADE == Utilizador.CIDADE) {
                        return (
                            <div className='container-fluid col-lg-12 notification'>
                                <a href={window.location.pathname + '#/post/' + data.IDPUBLICACAO} target='_blank' style={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}>
                                    <div className='col-lg-12 notification-title'>
                                        <h4>{data.TITULO}</h4>
                                    </div>
                                    <div className='col-lg-12 notification-text'>
                                        <p>{data.TEXTO}</p>
                                    </div>
                                </a>
                                <div className='col-lg-12 notification-buttons'>
                                    <Aceitar pub={data}></Aceitar>
                                    <Rejeitar pub={data}></Rejeitar>
                                </div>
                            </div>
                        );
                    }
                    return null; // Ensure nothing is rendered if the condition is not met
                })}
                
                {Comentario.map((comment, index) => {
                    let id = JSON.parse(localStorage.getItem('id'))
                    let col;
                    Colaborador.map((data) =>{
                        if(data.IDCOLABORADOR == id){
                            col = data.CIDADE;
                        }
                    })
                    
                    if (comment.aprovacao.APROVADA == 0) {
                        return (
                            <div className='container-fluid col-lg-12 notification'>
                                <a href={window.location.pathname + '#/post/' + comment.IDPOST} target='_blank' style={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}>
                                    <div className='col-lg-12 notification-title'>
                                        <h4>{comment.IDCOMENTARIO}</h4>
                                    </div>
                                    <div className='col-lg-12 notification-text'>
                                        <p>{comment.TEXTO}</p>
                                    </div>
                                </a>
                                <div className='col-lg-12 notification-buttons'>
                                    <Aceitar pub={comment}></Aceitar>
                                    <Rejeitar pub={comment}></Rejeitar>
                                </div>
                            </div>
                        );
                    }
                    return null; // Ensure nothing is rendered if the condition is not met
                })}
            </>
        );
    }

    function Pubs(){
        return Publicacao.map((data, index) => {
                if (data.aprovacao.APROVADA == 0 && data.CIDADE == Utilizador.CIDADE) {
                    return (
                        <div className='container-fluid col-lg-12 notification'>
                            <a href={window.location.pathname + '#/post/' + data.IDPUBLICACAO} target='_blank' style={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}>
                                <div className='col-lg-12 notification-title'>
                                    <h4>{data.TITULO}</h4>
                                </div>
                                <div className='col-lg-12 notification-text'>
                                    <p>{data.TEXTO}</p>
                                </div>
                            </a>
                            <div className='col-lg-12 notification-buttons'>
                                <Aceitar pub={data}></Aceitar>
                                <Rejeitar pub={data}></Rejeitar>
                            </div>
                        </div>
                    );
                }
                return null;
            });
    }

    function Coms(){
        return Comentario.map((comment, index) => {
            let id = JSON.parse(localStorage.getItem('id'))
            let col;
            Colaborador.map((data) =>{
                if(data.IDCOLABORADOR == id){
                    col = data.CIDADE;
                }
            })
            
            if (comment.aprovacao.APROVADA == 0) {
                return (
                    <div className='container-fluid col-lg-12 notification'>
                        <a href={window.location.pathname + '#/post/' + comment.IDPOST} target='_blank' style={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}>
                            <div className='col-lg-12 notification-title'>
                                <h4>{comment.IDCOMENTARIO}</h4>
                            </div>
                            <div className='col-lg-12 notification-text'>
                                <p>{comment.TEXTO}</p>
                            </div>
                        </a>
                        <div className='col-lg-12 notification-buttons'>
                            <Aceitar pub={comment}></Aceitar>
                            <Rejeitar pub={comment}></Rejeitar>
                        </div>
                    </div>
                );
            }
        })
    }
    
    function Notifications(){
        return(
            <div className='container-fluid notifications-box'>
                <div className='d-flex'>
                    <div className='col-6 d-flex' style={{justifyContent: "center", maxHeight: "3vh", alignItems: "center", marginTop: "10px"}}>
                        <button className='btn btn-outline-primary' id="btnpubs" onClick={showPubs}>Publicações por aprovar</button>
                    </div>
                    <div className='col-6 d-flex' style={{justifyContent: "center", maxHeight: "3vh", alignItems: "center", marginTop: "10px"}}>
                        <button className='btn btn-outline-primary' id="btncoms" onClick={showComs}>Comentários por aprovar</button>
                    </div>
                </div>
                
                <div className='container-fluid col-lg-12' id="pubs">
                    <Pubs></Pubs>
                </div>
                <div className='container-fluid col-lg-12' style={{display: "none"}} id="coms">
                    <Coms></Coms>
                </div>
            </div>    
        )
    }

    function showPubs(){
        document.getElementById("pubs").style.display = "block";
        document.getElementById("coms").style.display = "none";
        document.querySelector("#btnpubs").classList.add('btn-outline-success');
        document.querySelector("#btncoms").classList.remove('btn-outline-success');
    }

    function showComs(){
        document.getElementById("pubs").style.display = "none";
        document.getElementById("coms").style.display = "block";
        document.querySelector("#btnpubs").classList.remove('btn-outline-success');
        document.querySelector("#btncoms").classList.add('btn-outline-success');
    }

    return(
        <div className='d-flex'>
            <div>
                <Filtro></Filtro>
                <CalendarioBox></CalendarioBox>
            </div>
            <PostBox Filtros={Filtros}></PostBox>
            <div className="col-lg-3 pe-0 g-0">
                <Profile></Profile>
                <Notifications></Notifications>
            </div>
        </div>
    )
}

