import React, {useState, useEffect, useRef} from 'react';
import { Calendar, Badge, Tooltip, Whisper } from 'rsuite';
import '../Universal/index.css'
import axios from 'axios';
import Profile from './Profile'
import "rsuite/dist/rsuite-no-reset.min.css"
import * as lang from '../Universal/lang.json';
import authHeader from '../views/auth-header';
import ptBR from 'rsuite/locales/pt_BR';
import enGB from 'rsuite/locales/en_GB';
import eES from 'rsuite/locales/es_ES';
import { esES } from 'rsuite/esm/locales';
import emailjs from 'emailjs-com' 

export default function Main(){
    let stolang = localStorage.getItem("lang");
    if (!stolang) {
        stolang = "pt";
        localStorage.setItem("lang", JSON.stringify(stolang));
    } else {
        stolang = JSON.parse(stolang);
    }
    
    let data = JSON.parse(JSON.stringify(lang));
    data = data[stolang];

    const urlCategoria = "https://pint-backend-8vxk.onrender.com/categoria/";
    const urlSubCategoria = "https://pint-backend-8vxk.onrender.com/subcategoria/";
    const urlPost = "https://pint-backend-8vxk.onrender.com/post/";
    const urlAprovacao = "https://pint-backend-8vxk.onrender.com/aprovacao/";
    const urlEspaco = "https://pint-backend-8vxk.onrender.com/post/";
    const urlEvento = "https://pint-backend-8vxk.onrender.com/aprovacao/";
    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";
    const urlComentario = "https://pint-backend-8vxk.onrender.com/comentario/";

    const urlMix = "https://pint-backend-8vxk.onrender.com/mix/mainpage/";
    let checked = 0;

    const [Categoria, setCategoria] = useState([]);
    const [Subcategoria, setSubcategoria] = useState([]);
    const [Publicacao, setPublicacao] = useState([]);
    const [Espaco, setEspaco] = useState([]);
    const [Evento, setEvento] = useState([]);
    const [Colaborador, setColaborador] = useState([]);
    const [Comentario, setComentario] = useState([]);

    const [Utilizador, setUtilizador] = useState([]);

    const [EMAIL, setEMAIL] = useState("");

    const [Filtros, setFiltros] = useState([])

    const [FiltroPub, setFiltroPub] = useState("");

    function changeTheme(props){
        let theme = localStorage.getItem("theme");
        const isDarkMode = document.documentElement.classList.contains("darkmode");
        if(!theme && props == 1){
            if(!isDarkMode){
                localStorage.setItem("theme", JSON.stringify("light"));
            }
            else if(isDarkMode){
                localStorage.setItem("theme", JSON.stringify("dark"));
            }
        }
        theme = localStorage.getItem("theme");
        if(theme){
            theme = JSON.parse(theme);
            if(props === 2){
                if(theme == "light" && !isDarkMode){
                    localStorage.setItem("theme", JSON.stringify("dark"));
                }
                else if(theme == "dark" && isDarkMode){
                    localStorage.setItem("theme", JSON.stringify("light"));
                }
                document.documentElement.classList.toggle("darkmode");
            }
            else if(props == 1){
                if(theme === "dark" && !isDarkMode){
                    document.documentElement.classList.toggle("darkmode");
                }
                else if(theme == "light" && isDarkMode){
                    document.documentElement.classList.toggle("darkmode");
                }
            }
        }
    }

    useEffect(() =>{
        document.title = 'Página Principal';
        loadTables();
        const handleLoad = () => {
            changeTheme(1);
        };

        window.addEventListener('load', handleLoad);

        return () => {
            window.removeEventListener('load', handleLoad);
            setTimeout(()=>{
                changeTheme(1)
            }, 600)
        };
    }, [])

    function loadTables(){
        let id = JSON.parse(localStorage.getItem('id'));
        let cidade = JSON.parse(localStorage.getItem("cidade"));
        
        axios.get(urlMix + cidade, authHeader())
        .then(res => {
            if (res.data.success === true){
                const data = res.data;
                setPublicacao(data.post);
                setCategoria(data.categoria);
                setSubcategoria(data.subcategoria);
                setColaborador(data.colaborador);
                setEspaco(data.espaco);
                setEvento(data.evento);
                setComentario(data.comentario);
                setFiltros(data.subcategoria);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(error => {
            alert("Erro: " + error)
        })

        axios.get(urlColaborador + 'get/' + id, authHeader())
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
                <div className='container-fluid filtro-box' style={{paddingBottom:"15px"}}>
                    <div className='col-lg-1 filtro-text filtro-title'>
                        &nbsp;
                    </div>
                    <div className='col-lg-8 filtro-text filtro-title'>
                        <span>{data.texto1main}</span>
                    </div>
                    <div className='col-lg-2 filtro-text filtro-submit'>
                        <input type='submit' value={data.texto2main} onClick={HandleFiltros}></input>
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
                    <button className='filtro-button' id='dropdown-saude' onClick={() => toggle_filtro('filtro-' + (index + 1), 'arrow-' + (index + 1))}>
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
        let locale;
        if(stolang == "pt"){
            locale = ptBR.Calendar;
        }
        else if(stolang == "es"){
            locale = esES.Calendar;
        }
        else if(stolang == "en"){
            locale = enGB.Calendar;
        }
        return(
            <div className='calendario-box'>
                <Calendar compact bordered renderCell={renderCell} locale={locale}/>
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
                <div className='col-12' style={{display: "none"}}>
                    <nav className="navbar d-flex" style={{justifyContent: "center"}}>
                        <form className="d-flex">
                            <input onChange={(value) => setFiltroPub(value.target.value)} class="form-control mr-sm-2" type="search" placeholder="Publicação" aria-label="Search" id='filtrarPublicacao'/>
                        </form>
                    </nav>
                </div>
                <Post Filtros={Filtros}></Post>
            </div>
        )
    }

    function Post({ Filtros }) {
        useEffect(() => {

        }, [Filtros]);
        return Publicacao.map((data, index) => {
                if (data.aprovacao.APROVADA === 1) {
                    if (Filtros.some(data2 => data2.IDSUBCATEGORIA === data.SUBCATEGORIA)){
                        const { categorium, espaco, evento, subcategorium } = data;
                        if (evento.IDEVENTO === 1 || espaco.IDESPACO === 1) { // RETURN DE UM ESPAÇO POIS O EVENTO É O DEFAULT
                            let base64Image;
                            if (data.IMAGEM) {
                                base64Image = 'data:image/jpeg;base64,' + data.IMAGEM;
                            }
                            
                            return (
                                <div className='card mb-3 post' style={{ cursor: 'pointer' }} onClick={() => window.location = "#/post/" + data.IDPUBLICACAO}>
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
                                            {data.EVENTO == 1 && <a className="card-text post-website position-absolute bottom-0" style={{ marginLeft: '10px', marginTop: '10px' }} href={espaco.WEBSITE} target='_blank'>{espaco.WEBSITE}</a>} 
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                }
            }
        )
    }

    function Aprovar(props){
        const { pub, em, titulo } = props;
        const { aprovacao } = pub;
        let id = JSON.parse(localStorage.getItem('id'));
        const datapost = {
            IDCOLABORADOR : id,
            DATAAPROVACAO : aprovacao.DATAAPROVACAO,
            APROVADA : 1          
        }
        axios.put(urlAprovacao + 'update/' + aprovacao.IDAPROVACAO, datapost, authHeader())
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
        if(em){
            const template = {
                titulo: titulo,
                nome: pub.colaborador.NOME,
                email: em
            }
            emailjs.send("service_0il108d", "template_sy7kq5a", template, "GFAId4ybD4lKabI4m")
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
        }
        /*let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "pintsoftshares24@gmail.com",
                pass: "atmf bhjb cels kcgp"
            }
        });
        let mailOptions = {
            from: "pintsoftshares24@gmail.com",
            to: props.colaborador.EMAIL,
            subject: "Comentário criado numa publicação",
            text: "Foi criado um comentario na sua publicação com o titulo: " + props.TITULO + " por " + props.colaborador.NOME + "."
        }
        console.log(transporter)
        console.log(mailOptions)
        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.log("Erro a enviar o email")
            }
            console.log("Email enviado com sucesso")
        })*/
        loadTables();
    }

    function RejeitarApagar(props){
        const { pub } = props;
        const { aprovacao } = pub;

        if(pub.IDPUBLICACAO){
            axios.put(urlPost + 'delete/' + pub.IDPUBLICACAO, authHeader())
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
            axios.put(urlComentario + 'delete/' + pub.IDCOMENTARIO, authHeader())
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
        
        axios.put(urlAprovacao + 'delete/' + aprovacao.IDAPROVACAO, authHeader())
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
            let titulo;
            let email;
            let nome;
            Publicacao.map((post) =>{
                if(post.IDPUBLICACAO == comment.IDPOST){
                    titulo = post.TITULO
                    email = post.colaborador.EMAIL
                }
            })
            Colaborador.map((colaborador) => {
                if(colaborador.IDCOLABORADOR == comment.IDCOLABORADOR){
                    nome = colaborador.NOME;
                }
            })
            
            if (comment.aprovacao.APROVADA == 0) {
                return (
                    <div className='container-fluid col-lg-12 notification'>
                        <a href={window.location.pathname + '#/post/' + comment.IDPOST} target='_blank' style={{cursor: 'pointer', textDecoration: 'none', color: 'inherit'}}>
                            <div className='col-lg-12 notification-title'>
                                <h4>{titulo}</h4>
                            </div>
                            <div className='col-lg-12 notification-text'>
                                <a>Colaborador: {nome}</a><br></br>
                                <a>Rating: {comment.AVALIACAO}</a>
                                <p>{comment.TEXTO}</p>
                            </div>
                        </a>
                        <div className='col-lg-12 notification-buttons'>
                            <Aceitar pub={comment} em={email} titulo={titulo}></Aceitar>
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
                    <div className='col-6 d-flex notficiation-button-change' >
                        <button className='btn btn-success' id="btnpubs" onClick={showPubs}>{data.texto5main}</button>
                    </div>
                    <div className='col-6 d-flex notficiation-button-change'>
                        <button className='btn btn-outline-primary' id="btncoms" onClick={showComs}>{data.texto6main}</button>
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
        document.querySelector("#btnpubs").classList.add('btn-success');
        document.querySelector("#btnpubs").classList.remove('btn-outline-primary');
        document.querySelector("#btncoms").classList.remove('btn-success');
        document.querySelector("#btncoms").classList.add('btn-outline-primary');
    }

    function showComs(){
        document.getElementById("pubs").style.display = "none";
        document.getElementById("coms").style.display = "block";
        document.querySelector("#btnpubs").classList.remove('btn-success');
        document.querySelector("#btnpubs").classList.add('btn-outline-primary');
        document.querySelector("#btncoms").classList.remove('btn-outline-primary');
        document.querySelector("#btncoms").classList.add('btn-success');
    }

    return(
        <div className='d-flex container-fluid mainpage'>
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

