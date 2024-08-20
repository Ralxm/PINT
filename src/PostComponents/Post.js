import React, {useState, useEffect} from 'react';
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton} from 'react-share';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import '../Universal/index.css';
import axios from 'axios';
import Profile from '../MainPageComponents/Profile'
       
export default function Post() {
    const { id } = useParams();
    const urlPost = "https://pint-backend-8vxk.onrender.com/post/";
    const urlComentarios = "https://pint-backend-8vxk.onrender.com/comentario/";
    const urlCriarAprovacao = 'https://pint-backend-8vxk.onrender.com/aprovacao/create';
    const urlAprovacao = "https://pint-backend-8vxk.onrender.com/aprovacao/";
    const urlQuestionario = "https://pint-backend-8vxk.onrender.com/questionario/";
    const urlOpcoesEscolha = "https://pint-backend-8vxk.onrender.com/opcoes_escolha/";
    const urlVoto = "https://pint-backend-8vxk.onrender.com/voto/";
    const urlColaborador = "https://pint-backend-8vxk.onrender.com/colaborador/";

    const [Publicacao, setPublicacao] = useState("");
    const [Comentarios, setComentarios] = useState([]);
    const [Aprovacao, setAprovacao] = useState("")
    const [Questionario, setQuestionario] = useState([]);
    const [OpcoesEscolha, setOpcoesEscolha] = useState([]);
    const [Voto, setVoto] = useState([]);
    const [Colaborador, setColaborador] = useState([]);

    const [votosRelevantes, setVotosRelevantes] = useState([]);

    const [QuestionarioString, setQuestionarioString] = useState("")

    useEffect(()=>{
        loadPost();
        document.title = "asd";
    }, [])

    useEffect(() => {
        if (Publicacao) {
            loadComentarios();
            if (QuestionarioString) {
                loadQuestionario();
                if(Questionario){
                    loadOpcoesEscolha();
                    if(OpcoesEscolha){
                        loadVotos();
                    }
                }
            }
        }
    }, [Publicacao]);

    async function loadPost() {
        let url = `${urlPost}get/${id}`;
        try {
            const res = await axios.get(url);
            if (res.data.success === true) {
                const data = res.data.data;
                setPublicacao(data);
                setQuestionarioString(data[0].evento.IDQUESTIONARIO)
                
            } else {
                alert("Erro Web Service");
            }
        } catch (err) {
            alert("Erro a ir buscar o post");
            console.error(err);
        }
    }

    async function loadComentarios(){ 
        let url = urlComentarios + 'listByPost/' + id;
        await axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setComentarios(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(err =>{
            alert("Erro a carregar os comentários");
        })
    }

    async function loadQuestionario(){
        let url = urlQuestionario + 'get/' + QuestionarioString;
        await axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setQuestionario(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(err =>{
            alert("Erro a carregar os comentários");
        })
    }

    async function loadOpcoesEscolha(){
        let url = urlOpcoesEscolha + 'listByQuestionario/' + QuestionarioString;
        await axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setOpcoesEscolha(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(err =>{
            alert("Erro a carregar os comentários");
        })
    }

    async function loadVotos(){
        let url = urlVoto + 'list';
        await axios.get(url)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                setVoto(data);
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(err =>{
            alert("Erro a carregar os comentários");
        })
    }

    function Page(){
        useEffect(()=>{

        }, [Comentarios])
        if(Publicacao[0]){
            let base64Image;
            if(Publicacao[0].IMAGEM){
                const base64 = Buffer.from(Publicacao[0].IMAGEM.data, "binary" ).toString("base64");
                base64Image = 'data:image/jpeg;base64,' + base64;
            }
            

            let hoje = new Date();
            let ultimaatividade = new Date(Publicacao[0].ULTIMAATIVIDADE)
            const diffTime = Math.abs(ultimaatividade - hoje);
            let diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            let rating = 0;
            let count = 0;
            Comentarios.map((data) =>{
                if(data.IDPOST == Publicacao[0].IDPUBLICACAO){
                    count++;
                    rating += data.AVALIACAO;
                }
            })

            let ratingFinal;
            if(rating == 0){
                ratingFinal = 0;
            }
            else{
                ratingFinal = (rating / count).toFixed(1);
            }

            return(
                <div className='col-9 post-box' style={{maxHeight:"60vh", overflowY:'scroll'}}>
                    <div className='col-1'>
                        &nbsp;
                    </div>
        
                    <div className='col-10 main-post-box' style={{overflowY:'scroll'}}>
                        <div className='post-nav-bar'>
                            <div className='post-main-info col-10'>
                                <a>{Publicacao[0].TITULO}&nbsp;</a>
                                <a>&nbsp;- Avaliação: {ratingFinal}</a>

                                </div>
                                    <div style={{backgroundColor: 'red', marginLeft: '-20px', marginRight: '10px', color: 'white'}}>
                                        {Publicacao[0].EVENTO == 1 && diffDays >= 15 && <a>Espaço Inativo</a>}
                                        {Publicacao[0].aprovacao.APROVADA == 0 && <a>Publicação não aprovada</a>}
                                    </div>
                                    <div className='post-main-buttons col-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg>
                                        <div style={{ width: "25%" }}>
                                        </div>
                                        <FacebookShareButton url={window.location.href}>
                                        <FacebookIcon size='32'></FacebookIcon>
                                        </FacebookShareButton>
                                        <TwitterShareButton url={window.location.href}>
                                            <TwitterIcon size='32'></TwitterIcon>
                                        </TwitterShareButton>
                                        <WhatsappShareButton url={window.location.href}>
                                            <WhatsappIcon size='32'></WhatsappIcon>
                                        </WhatsappShareButton>
                                    </div>
                                </div>
        
                                <div className='post-subcategory-info col-12'>
                                    <a style={{ color: "rgba(0,0,0,0.5)" }}>{Publicacao[0].categorium.NOME} - {Publicacao[0].subcategorium.NOME}</a>
                                </div>
        
                                <div className='post-text-info col-12'>
                                    <a>{Publicacao[0].TEXTO}</a>
                                </div>
        
                                {Publicacao[0].evento.IDEVENTO === 1 ? (
                                    <div>
                                        <div className='post-subcategory-info col-12'>
                                            <a style={{ color: "rgba(0,0,0,0.5)" }}>{'Coordenadas: ' + Publicacao[0].espaco.COORDENADAS}</a>
                                        </div>
                                        <div className='post-subcategory-info col-12'>
                                            <a style={{ color: "rgba(0,0,0,0.5)" }}>Website:&nbsp;</a>
                                            <a style={{ color: "rgba(0,0,0,0.5)" }} href={Publicacao[0].espaco.WEBSITE} target='_blank'>{Publicacao[0].espaco.WEBSITE}</a>
                                            <div className='row col-12 imagem-post-info d-flex align-items-center justify-content-center'>
                                                {Publicacao[0].IMAGEM && <img src={base64Image} className='img-fluid rounded-start' alt="Não foi possível carregar a imagem" style={{ maxWidth: '100%', height: 'auto', width: '40%' }} />}
                                            </div>
                                        </div>
                                    </div>
                                    
                                ) : (
                                    <div>
                                    <div className='post-subcategory-info col-12'>
                                            <a style={{ color: "rgba(0,0,0,0.5)" }}>{"asd"}</a>
                                            <Survey></Survey>
                                            <div className='row col-12 imagem-post-info d-flex align-items-center justify-content-center'>
                                                {Publicacao[0].IMAGEM && <img src={base64Image} className='img-fluid rounded-start' alt="Não foi possível carregar a imagem" style={{ maxWidth: '100%', height: 'auto', width: '40%' }} />}
                                            </div>
                                        </div>
                                    </div>
                                )
                        }

                        <div className='comentario-box' style={{marginTop: "20px"}}>   
                            <div className="card p-3" style={{display: 'none'}} id='votosRelevantes'>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="user d-flex flex-row align-items-center">
                                        <span style={{marginLeft: "10px"}}>
                                        <button className='btn btn-outline-warning' onClick={VerVotos}>Fechar</button>
                                        { 
                                            votosRelevantes.map((data) =>{
                                                return(
                                                    <small style={{marginLeft: "5px"}} class="font-weight-bold">{"{ " + data.colaborador.NOME + ' ID: ' + data.colaborador.IDCOLABORADOR + " }"}</small>
                                                )
                                            })
                                        }
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <Comentario></Comentario>   
                        </div>
                    </div>


                    <div className='col-1'>
                        &nbsp;
                    </div>
                </div>
                )
        }
        
    }

    return(
        <div className='d-flex'>
            <Page></Page>
            <div className="col-3 pe-0 g-0">
                <Profile></Profile>
                <CriarComentario></CriarComentario>
            </div>
        </div>
    )

    function VerVotos(){
        if(document.getElementById('votosRelevantes').style.display == "block"){
            document.getElementById('votosRelevantes').style.display = 'none';
        }
        else{
            document.getElementById('votosRelevantes').style.display = 'block';
        }
        
    }

    function Survey(){
        let idcol = JSON.parse(localStorage.getItem("id"));
        let Votos = [];
        let pessoaJaVotou = 0;
        let emQualVotou;
        OpcoesEscolha.map((data, index) =>{
            Voto.map((voto) => {
                if(voto.IDOPCOESESCOLHA == data.IDOPCAO){
                    Votos.push(voto);
                }
            })
        })
        let votosTotais = Votos.length;
        
        
        return OpcoesEscolha.map((data, index) =>{
            let totalVotosOpcao = 0;
            let votosRelevantes = [];
            Votos.map((voto) => {
                if(voto.IDOPCOESESCOLHA == data.IDOPCAO){
                    totalVotosOpcao++;
                    votosRelevantes.push(voto);
                }
                if(pessoaJaVotou == 0 && voto.IDCOLABORADOR == idcol){
                    pessoaJaVotou = 1;
                    emQualVotou = voto.IDOPCOESESCOLHA;
                }
            })

            let res;
            if(votosTotais == 0){
                res = 0;
            }
            else{
                res = (totalVotosOpcao/votosTotais).toFixed(1) * 100;
            }
            if(pessoaJaVotou == 0){
                return(
                    <div className="progress" style={{ marginTop: "10px", height: "30px", cursor: "pointer", position: "relative" }} onClick={() => Votar(data)}>
                        <span style={{ position: "absolute", left: "10px", color: "black", zIndex: 1 , top: "20%"}}>
                            {data.NOME}
                        </span>
                        <div className="progress-bar" role="progressbar" style={{ width: res + "%" }} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                )
            }
            else{
                if(data.IDOPCAO == emQualVotou){
                    return(
                        <div className='d-flex' style={{alignItems: "center"}}>
                            <div style={{width: "80%"}}>
                                <div className="progress" style={{marginTop:"10px", height: "30px", cursor: "pointer"}}>
                                    <span style={{ position: "absolute", left: "10px", color: "black", zIndex: 1 , top: "20%"}}>
                                        {data.NOME}
                                    </span>
                                    <div className="progress-bar" role="progressbar" style={{width: res + "%", color: "black"}} aria-valuemin="0" aria-valuemax="100">
                                        {data.NOME}&nbsp;&#10003;
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button style={{marginTop:"10px", marginLeft: "10px"}} className='btn btn-outline-info' onClick={() => handleVerVotos(votosRelevantes)}>
                                    Ver votantes
                                </button>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div className='d-flex' style={{alignItems: "center"}}>
                            <div style={{width: "80%"}}>
                                <span style={{ position: "absolute", left: "10px", color: "black", zIndex: 1 , top: "20%"}}>
                                    {data.NOME}
                                </span>
                                <div className="progress" style={{marginTop:"10px", height: "30px", cursor: "pointer"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: res + "%", color: "black"}} aria-valuemin="0" aria-valuemax="100">{data.NOME}</div>
                                </div>
                            </div>
                            <div>
                                <button style={{marginTop:"10px", marginLeft: "10px"}} className='btn btn-outline-info' onClick={() => handleVerVotos(votosRelevantes)}>
                                    Ver votantes
                                </button>
                            </div>
                        </div>
                    )
                }
                
            }
        })
    }

    /*function Survey(){
        let idcol = JSON.parse(localStorage.getItem("id"));
        let votosTotais = 0;
        OpcoesEscolha.map((data, index) =>{
            Voto.map((voto) => {
                if(voto.IDOPCOESESCOLHA == data.IDOPCAO){
                    votosTotais++;
                }
            })
        })
        let pessoaJaVotou = 0;
        let emQualVotou;
        return OpcoesEscolha.map((data, index) =>{
            let totalVotosOpcao = 0;
            let votosRelevantes = [];
            Voto.map((voto) => {
                if(voto.IDOPCOESESCOLHA == data.IDOPCAO){
                    totalVotosOpcao++;
                    votosRelevantes.push(voto);
                    console.log(data)
                }
                if(voto.IDCOLABORADOR == idcol){
                    pessoaJaVotou = 1;
                    emQualVotou = voto.IDOPCOESESCOLHA;
                }
            })
            let res;
            if(votosTotais == 0){
                res = 0;
            }
            else{
                res = (totalVotosOpcao/votosTotais).toFixed(1) * 100;
            }
            if(pessoaJaVotou == 0){
                return(
                    <div className="progress" style={{marginTop:"10px", height: "30px", cursor: "pointer"}} onClick={() => Votar(data)}>
                        <div className="progress-bar" role="progressbar" style={{width: res + "%", color: "black"}} aria-valuemin="0" aria-valuemax="100">{data.NOME}</div>
                    </div>
                )
            }
            else{
                if(data.IDOPCAO == emQualVotou){
                    return(
                        <div className='d-flex' style={{alignItems: "center"}}>
                            <div style={{width: "80%"}}>
                                <div className="progress" style={{marginTop:"10px", height: "30px", cursor: "pointer"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: res + "%", color: "black"}} aria-valuemin="0" aria-valuemax="100">
                                        {data.NOME}&nbsp;&#10003;
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button style={{marginTop:"10px", marginLeft: "10px"}} className='btn btn-outline-info' onClick={() => handleVerVotos(votosRelevantes)}>
                                    Ver votantes
                                </button>
                            </div>
                        </div>
                    )
                }
                else{
                    return(
                        <div className='d-flex' style={{alignItems: "center"}}>
                            <div style={{width: "80%"}}>
                                <div className="progress" style={{marginTop:"10px", height: "30px", cursor: "pointer"}}>
                                    <div className="progress-bar" role="progressbar" style={{width: res + "%", color: "black"}} aria-valuemin="0" aria-valuemax="100">{data.NOME}</div>
                                </div>
                            </div>
                            <div>
                                <button style={{marginTop:"10px", marginLeft: "10px"}} className='btn btn-outline-info' onClick={() => handleVerVotos(votosRelevantes)}>
                                    Ver votantes
                                </button>
                            </div>
                        </div>
                    )
                }
                
            }
        })
    }*/

    async function handleVerVotos(props){
        let votos = votosRelevantes;
        await setVotosRelevantes(props);
        if(votos == votosRelevantes){
            setTimeout(()=>{

            }, 1000)
            setVotosRelevantes(props)
        }
        console.log(votosRelevantes)
        VerVotos();
    }

    async function Votar(props){
        let idcol = JSON.parse(localStorage.getItem('id'));
        let now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        let yyyy = now.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        let today = `${yyyy}-${mm}-${dd}`;

        let url = urlVoto + 'create';
        const datapost = {
            IDCOLABORADOR : idcol,
            DATAVOTO : today,
            IDOPCOESESCOLHA : props.IDOPCAO
        }
        await axios.post(urlVoto + 'create', datapost)
        .then(res => {
            if (res.data.success === true){
                const data = res.data.data;
                loadVotos()
            }
            else {
                alert("Erro Web Service");
            }
        })
        .catch(err =>{
            alert("Erro a carregar os comentários");
        })
    }

    async function Comentar() {
        let rating = 0;
        let idAprovacao;
        const st5 = document.getElementById("st5").checked;
        const st4 = document.getElementById("st4").checked;
        const st3 = document.getElementById("st3").checked;
        const st2 = document.getElementById("st2").checked;
        const st1 = document.getElementById("st1").checked;
    
        if (st5) {
            rating = 5;
        } else if (st4) {
            rating = 4;
        } else if (st3) {
            rating = 3;
        } else if (st2) {
            rating = 2;
        } else if (st1) {
            rating = 1;
        } else {
            rating = 0;
        }
    
        const mensagem = document.getElementById("msg").value;
    
        const now = new Date();
        let dd = now.getDate();
        let mm = now.getMonth() + 1;
        const yyyy = now.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        const today = `${yyyy}-${mm}-${dd}`;
    
        const datapostAprovacao = {
            IDCOLABORADOR: 0,
            DATAAPROVACAO: today,
            APROVADA: 0,
        };
    
        try {
            const resAprovacao = await axios.post(urlCriarAprovacao, datapostAprovacao);
    
            if (resAprovacao.data.success) {
                idAprovacao = resAprovacao.data.data.IDAPROVACAO;
            } else {
                alert(resAprovacao.data.message);
                return;
            }
            const datapost = {
                IDPOST: id,
                IDAPROVACAO: idAprovacao,
                IDCOLABORADOR: JSON.parse(localStorage.getItem("id")),
                DATACOMENTARIO: today,
                AVALIACAO: rating,
                TEXTO: mensagem
            };
    
            const resComentario = await axios.post(urlComentarios + 'create', datapost);
    
            if (resComentario.data.success) {
            } else {
                alert(resComentario.data.message);
                return;
            }
            alert("O seu comentário foi criado com sucesso. Este será mostrado após aprovação por parte da administração")
        } catch (error) {
            console.error("An error occurred: ", error);
            alert("An error occurred while processing your request. Please try again.");
        }
    }

    function CriarComentario(){
        return(
            <div className='container-fluid comentario-create-box' style={{height: '60vh'}}>
                <div>
                    <form id="algin-form d-flex">
                        <div className="form-group">
                            <h4>Comentar</h4>
                            <div className="container">
                                <div className="container__items">
                                    <input type="radio" name="stars" id="st5"/>
                                    <label for="st5">
                                    <div className="star-stroke">
                                        <div className="star-fill"></div>
                                    </div>
                                    <div className="label-description" data-content="Excellent"></div>
                                    </label>
                                    <input type="radio" name="stars" id="st4"/>
                                    <label for="st4">
                                    <div className="star-stroke">
                                        <div className="star-fill"></div>
                                    </div>
                                    <div className="label-description" data-content="Good"></div>
                                    </label>
                                    <input type="radio" name="stars" id="st3"/>
                                    <label for="st3">
                                    <div className="star-stroke">
                                        <div className="star-fill"></div>
                                    </div>
                                    <div className="label-description" data-content="OK"></div>
                                    </label>
                                    <input type="radio" name="stars" id="st2"/>
                                    <label for="st2">
                                    <div className="star-stroke">
                                        <div className="star-fill"></div>
                                    </div>
                                    <div className="label-description" data-content="Bad"></div>
                                    </label>
                                    <input type="radio" name="stars" id="st1"/>
                                    <label for="st1">
                                    <div className="star-stroke">
                                        <div className="star-fill"></div>
                                    </div>
                                    
                                    <div className="label-description" data-content="Terrible"></div>
                                    </label>
                                </div>
                            </div>
                            <label for="message">Mensagem</label>
                            <textarea name="msg" id="msg" cols="30" rows="5" className="form-control" style={{resize: "none"}}></textarea>
                        </div>
                        <div className="form-group d-flex" style={{justifyContent: "center", marginTop: "20px"}}>
                            <button type="button" id="post" className="btn btn-outline-info" onClick={Comentar}>Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

    function Comentario(){
        return Comentarios.map((data) =>{
            let date = new Date(data.DATACOMENTARIO);
            let formattedDate = date.getDate().toString().padStart(2, '0') + '/' +
                    (date.getMonth() + 1).toString().padStart(2, '0') + '/' +
                    date.getFullYear();
            return(
                <div class="card p-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="user d-flex flex-row align-items-center">
                            <img src="https://i.imgur.com/hczKIze.jpg" width="30" class="user-img rounded-circle mr-2"/>
                            <span style={{marginLeft: "10px"}}>
                                <small class="font-weight-bold text-primary">{data.colaborador.NOME}</small>
                                <small style={{marginLeft: "5px"}} class="font-weight-bold">{data.TEXTO}</small>
                            </span>
                        </div>
                        <div>
                            <small>Avaliação: {data.AVALIACAO}</small>
                            <small>&nbsp;&nbsp;&nbsp;&nbsp;</small>
                            <small>{formattedDate}</small>
                        </div>
                        
                    </div>
                    <div class="action d-flex justify-content-between mt-2 align-items-center">
                        <div class="reply px-4">
                            <button className='btn btn-outline' onClick={() => apagarComentario(data)}>Apagar</button>
                        </div>
                    </div>
                </div>
            )
        })
    }

    async function apagarComentario(props){
        await axios.put(urlComentarios + 'delete/' + props.IDCOMENTARIO)
            .then(function(data){
                if(data.data.success === true){
                    loadComentarios()
                }
                else{
                }
            })
            .catch(err =>{
                console.log("Erro");
            })

        await axios.put(urlAprovacao + 'delete/' + props.aprovacao.IDAPROVACAO)
        .then(function(data){
            if(data.data.success === true){
            }
            else{
            }
        })
        .catch(err =>{
            console.log("Erro");
        })
    }
}

